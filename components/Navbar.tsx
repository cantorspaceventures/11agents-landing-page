'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFounderMode } from '@/context/FounderModeContext';

export default function Navbar() {
    const { isFounderMode } = useFounderMode();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference pointer-events-none">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-3"
            >
                <span className={`font-mono text-sm tracking-widest font-bold ${isFounderMode ? 'text-red-500' : 'text-green-500 animate-blink'}`}>
                    11agents.xyz // SYSTEM_READY
                </span>
                <span className={`w-2 h-2 rounded-full ${isFounderMode ? 'bg-red-500 animate-ping' : 'bg-green-500 animate-pulse'}`} />
            </motion.div>
        </nav>
    );
}
