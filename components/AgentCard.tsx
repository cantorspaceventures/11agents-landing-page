'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Activity } from 'lucide-react';
import { useFounderMode } from '@/context/FounderModeContext';

interface AgentCardProps {
    id: string;
    name: string;
    role: string;
    icon: LucideIcon;
    verb: string;
    stats: string;
    color: string;
    colSpan?: string;
    isConnected?: boolean;
}

export default function AgentCard({ id, name, role, icon: Icon, verb, stats, color, colSpan = "col-span-1", isConnected = false }: AgentCardProps) {
    const { isFounderMode } = useFounderMode();
    const [hovered, setHovered] = useState(false);
    const [simulatedStat, setSimulatedStat] = useState(stats);

    // Simulate live data ticking
    useEffect(() => {
        if (!hovered) return;
        const interval = setInterval(() => {
            setSimulatedStat(prev => prev.split('').map(char => Math.random() > 0.95 ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) : char).join(''));
            setTimeout(() => setSimulatedStat(stats), 100);
        }, 2000);
        return () => clearInterval(interval);
    }, [hovered, stats]);

    // Dynamic color based on mode
    const accentColor = isFounderMode ? '#ef4444' : color;

    // Totem Animation Logic based on ID
    const getTotemAnimation = () => {
        if (id === 'sentinel' || id === 'pulse') return { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }; // Pulse
        if (id === 'rainmaker') return { filter: ["brightness(1)", "brightness(2)", "brightness(1)"], scale: [1, 1.05, 1] }; // Flash
        // For Treasurer, we use scaleY but need to ensure origin is set in style or transition
        if (id === 'treasurer') return { scaleY: [1, 1.4, 1] };
        if (id === 'scout') return { rotate: 360 }; // Radar Rotate
        if (id === 'shield') return { opacity: [0.5, 1, 0.5] }; // Flash Shield
        return {}; // Default static
    };

    // Transition Logic based on ID
    const getTransition = (): any => {
        if (id === 'scout') return { duration: 3, repeat: Infinity, ease: "linear" };
        if (id === 'rainmaker') return { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 };
        return { duration: 2, repeat: Infinity, ease: "easeInOut" };
    };

    return (
        <motion.div
            className={`relative h-full p-6 rounded-2xl border backdrop-blur-md bg-slate-900/40 overflow-hidden cursor-crosshair group transition-all duration-500`}
            style={{
                borderColor: hovered || isConnected
                    ? accentColor
                    : (isFounderMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(148, 163, 184, 0.2)'),
                boxShadow: isConnected ? `0 0 15px ${accentColor}40` : 'none',
                scale: hovered ? 1.02 : 1
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Glow Background */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)`
                }}
            />

            {/* Handshake Connection Line (Visual Only) */}
            {isConnected && (
                <div className="absolute inset-0 border-2 border-dashed opacity-50 animate-pulse" style={{ borderColor: accentColor }} />
            )}

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300" style={{ borderColor: hovered || isConnected ? accentColor : 'transparent' }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: hovered || isConnected ? accentColor : 'transparent' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300" style={{ borderColor: hovered || isConnected ? accentColor : 'transparent' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300" style={{ borderColor: hovered || isConnected ? accentColor : 'transparent' }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <div className="flex justify-between items-start">
                    <div
                        className={`p-3 rounded-lg bg-black/50 border transition-colors duration-300`}
                        style={{ borderColor: hovered ? accentColor : 'rgba(255,255,255,0.1)' }}
                    >
                        <motion.div
                            animate={hovered ? getTotemAnimation() : {}}
                            transition={getTransition()}
                            style={{ transformOrigin: id === 'treasurer' ? 'bottom' : 'center' }}
                        >
                            <Icon className="w-8 h-8" style={{ color: accentColor }} />
                        </motion.div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Activity className={`w-3 h-3 ${hovered ? 'animate-pulse' : 'opacity-30'}`} style={{ color: accentColor }} />
                        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Live</span>
                    </div>
                </div>

                <div>
                    <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isFounderMode ? 'text-red-100' : 'text-slate-100'}`}>
                        {name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-6">{role}</p>

                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-3 mt-auto">
                        <span className="text-sm font-bold tracking-widest" style={{ color: accentColor }}>
                            {verb}
                        </span>
                        <div className="overflow-hidden">
                            <span className={`text-[10px] font-mono text-[#888] font-medium tracking-tight block whitespace-nowrap ${hovered ? 'animate-marquee' : ''}`}>
                                {simulatedStat}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
