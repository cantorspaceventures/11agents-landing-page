'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useFounderMode } from '@/context/FounderModeContext';

import { supabase } from '@/lib/supabaseClient';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isFounderMode } = useFounderMode();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('founder_signups')
                .insert([{ email }]);

            if (error) throw error;

            setSubmitted(true);
            setTimeout(() => {
                setEmail('');
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting email:', error);
            // Optional: Add error state/UI
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="relative py-20 px-6 border-t border-slate-900 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="border border-slate-800 bg-slate-950/80 p-8 rounded-lg max-w-2xl mx-auto backdrop-blur-sm">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            SYSTEM_INITIALIZATION
                        </h3>
                        <p className="text-slate-400 font-mono text-sm mb-8">
                            "Ready to hand over the keys to the machine? <br />
                            Join the waitlist for the first cohort of Sovereign Founders."
                        </p>

                        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Enter_Founder_Email_Address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={submitted}
                                className={`w-full bg-black border ${isFounderMode ? 'border-red-900 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500'} rounded-none px-4 py-3 outline-none transition-all duration-300 font-mono text-xs uppercase tracking-wider placeholder:text-slate-700`}
                            />
                            <button
                                type="submit"
                                disabled={submitted || loading}
                                className={`w-full px-4 py-3 rounded-none font-mono text-xs uppercase tracking-widest border transition-all duration-300 group ${submitted
                                        ? 'bg-green-900/20 border-green-500 text-green-500'
                                        : (isFounderMode
                                            ? 'bg-red-900/10 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white'
                                            : 'bg-cyan-900/10 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black')
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {loading ? '[ TRANSMITTING... ]' : (submitted ? '[ ACCESS_GRANTED ]' : '[ INITIALIZE_11AGENTS ]')}
                                </span>
                            </button>
                        </form>
                    </div>

                    <div className="mt-20 flex flex-col md:flex-row items-center justify-between text-xs text-slate-700 font-mono uppercase tracking-widest border-t border-slate-900 pt-8">
                        <span>11agents.xyz // SYSTEM_READY</span>
                        <span className="mt-2 md:mt-0 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            All Systems Nominal
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Footprint */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50" />
        </footer>
    );
}
