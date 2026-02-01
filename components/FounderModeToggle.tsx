'use client';

import { useFounderMode } from '@/context/FounderModeContext';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap } from 'lucide-react';

export default function FounderModeToggle() {
    const { isFounderMode, toggleFounderMode } = useFounderMode();

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <motion.button
                onClick={toggleFounderMode}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-full border backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${isFounderMode
                        ? 'bg-red-950/80 border-red-500 text-red-100 shadow-red-900/20'
                        : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative">
                    {isFounderMode ? (
                        <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                    ) : (
                        <Zap className="w-5 h-5" />
                    )}
                </div>
                <span className={`text-sm font-mono tracking-wider font-bold ${isFounderMode ? 'text-red-500' : ''}`}>
                    {isFounderMode ? 'FOUNDER MODE: ON' : 'FOUNDER MODE'}
                </span>

                {/* Status Indicator */}
                <span className={`w-2 h-2 rounded-full ${isFounderMode ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`} />
            </motion.button>
        </div>
    );
}
