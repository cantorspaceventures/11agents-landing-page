'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const concepts = [
    {
        title: "Zero Latency",
        description: "Your CFO doesn't need \"until Monday\" to run the numbers.",
        color: "from-blue-400 to-indigo-500"
    },
    {
        title: "Zero Ego",
        description: "Your CMO doesn't get defensive when you pivot the brand.",
        color: "from-purple-400 to-pink-500"
    },
    {
        title: "Zero Information Loss",
        description: "Every agent knows what every other agent is doing, in real-time, 24/7.",
        color: "from-amber-400 to-orange-500"
    }
];

function ConceptCard({ title, description, color, index }: { title: string; description: string; color: string; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm overflow-hidden hover:border-slate-700 transition-colors"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-100">{title}</h3>
            <p className="text-lg text-slate-400 leading-relaxed font-mono">{description}</p>
        </motion.div>
    );
}

export default function SovereignConcept() {
    return (
        <section className="relative py-32 px-4 bg-[#050505]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-500"
                    >
                        The Sovereign 11
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-mono"
                    >
                        11agents is not a chatbot. It is not a tool. <br />
                        <span className="text-cyan-400">It is a Synthetic C-Suite.</span>
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {concepts.map((concept, i) => (
                        <ConceptCard key={i} {...concept} index={i} />
                    ))}
                </div>

                {/* Bottom Statement */}
                <div className="relative p-12 md:p-24 rounded-3xl bg-slate-900/30 border border-slate-800/50 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <p className="text-2xl md:text-4xl font-bold text-slate-200 mb-8 leading-tight">
                            We didn't build this to replace the Founder. <br />
                            We built it to <span className="text-cyan-400">liberate</span> the Founder.
                        </p>
                        <p className="text-lg md:text-xl text-slate-400 font-mono">
                            To return you to "Founder Mode"—where your only job is to dream, to decide, and to lead.
                            <br /><br />
                            <span className="text-slate-500">The machinery of business is now autonomous. The cockpit is yours.</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
