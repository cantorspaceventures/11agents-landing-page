'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Compass, TrendingUp, Zap, Triangle, Radar, Box,
    Workflow, Shield, Activity, Users, BrainCircuit
} from 'lucide-react';
import AgentCard from './AgentCard';
import { useFounderMode } from '@/context/FounderModeContext';

const agents = [
    // 1. Sentinel (Strategy) - The Hero
    { id: 'sentinel', name: "The Sentinel", role: "Strategy", icon: Compass, verb: "NAVIGATE", stats: "STRAT_SYNC: OK // PILLAR: AGENTIC_SERVICES // CONFIDENCE: 98.4%", color: "#00f0ff", colSpan: "md:col-span-2 lg:col-span-2 lg:row-span-2" },

    // Top Row
    { id: 'treasurer', name: "The Treasurer", role: "Finance", icon: TrendingUp, verb: "PRESERVE", stats: "BURN_RATE: $12.4K // RUNWAY: 18.2 MO // VAT_COMPLIANT: TRUE", color: "#34d399", colSpan: "md:col-span-1 lg:col-span-1" },
    { id: 'rainmaker', name: "The Rainmaker", role: "Sales", icon: Zap, verb: "ACQUIRE", stats: "PIPELINE_VAL: $240K // ACTIVE_SEQUENCES: 4 // LTV:CAC: 4.2x", color: "#fbbf24", colSpan: "md:col-span-1 lg:col-span-1" },

    // Middle Orbit
    { id: 'architect', name: "The Architect", role: "Marketing", icon: Triangle, verb: "AMPLIFY", stats: "REACH: +12% // IMPRESSIONS: 44.2K // VOICE: CONSISTENT", color: "#f472b6", colSpan: "md:col-span-1 lg:col-span-1" },
    { id: 'scout', name: "The Scout", role: "Intelligence", icon: Radar, verb: "WATCH", stats: "TRACKING: 12 COMPETITORS // MARKET_SHIFT: DETECTED (AI_SaaS)", color: "#60a5fa", colSpan: "md:col-span-1 lg:col-span-1" },

    // Bottom Orbit
    { id: 'builder', name: "The Builder", role: "Product", icon: Box, verb: "EVOLVE", stats: "V1.2_DEPLOYED // UPTIME: 99.99% // TECH_DEBT: MINIMAL", color: "#a78bfa", colSpan: "md:col-span-1 lg:col-span-1" },
    { id: 'orchestrator', name: "The Orchestrator", role: "Operations", icon: Workflow, verb: "STREAMLINE", stats: "SOP_LATENCY: 0ms // VENDOR_AUDIT: COMPLETE // BOTTLENECKS: 0", color: "#94a3b8", colSpan: "md:col-span-1 lg:col-span-1" },
    { id: 'shield', name: "The Shield", role: "Legal", icon: Shield, verb: "PROTECT", stats: "IP_STATUS: FILED // COMPLIANCE_CHECK: ALL_CLEAR // RISK: LOW", color: "#ef4444", colSpan: "md:col-span-1 lg:col-span-1" },

    // Outer/Side
    { id: 'pulse', name: "The Pulse", role: "Customer Success", icon: Activity, verb: "RETAIN", stats: "NPS: 74 // CHURN_PREDICTION: 1.2% // HEALTH_SCORE: OPTIMAL", color: "#2dd4bf", colSpan: "md:col-span-2 lg:col-span-1" },
    { id: 'talent', name: "The Talent Scout", role: "People", icon: Users, verb: "ASSEMBLE", stats: "CONTRACTOR_SYNC: 3 ACTIVE // TALENT_POOL: 140 // ROI/HEAD: 4.8x", color: "#f87171", colSpan: "md:col-span-1 lg:col-span-1" },
    { id: 'analyst', name: "The Analyst", role: "Data", icon: BrainCircuit, verb: "DECODE", stats: "CORRELATION: HIGH (MARKETING<>REVENUE) // ANOMALY: NONE", color: "#818cf8", colSpan: "md:col-span-1 lg:col-span-1" },
];

export default function BentoGrid() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const { isFounderMode } = useFounderMode();

    // Handshake logic
    // Mapping who connects to whom
    const connections: Record<string, string[]> = {
        'rainmaker': ['treasurer', 'architect'],
        'sentinel': ['shield', 'orchestrator'], // Example
        'scout': ['sentinel', 'analyst'],
        'builder': ['orchestrator', 'architect'],
        'treasurer': ['rainmaker'],
        // ... others
    };

    const [activeAgent, setActiveAgent] = useState<string | null>(null);
    const [lines, setLines] = useState<{ start: { x: number, y: number }, end: { x: number, y: number }, targetId: string }[]>([]);
    const agentRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Calculate line positions when activeAgent changes
    React.useEffect(() => {
        if (!activeAgent || !containerRef.current) {
            setLines([]);
            return;
        }

        const connectedIds = connections[activeAgent] || [];
        const startNode = agentRefs.current[activeAgent];
        const containerRect = containerRef.current.getBoundingClientRect();

        if (!startNode) return;

        const startRect = startNode.getBoundingClientRect();
        // Center of start node relative to container
        const startX = startRect.left - containerRect.left + startRect.width / 2;
        const startY = startRect.top - containerRect.top + startRect.height / 2;

        const newLines = connectedIds.map(targetId => {
            const endNode = agentRefs.current[targetId];
            if (!endNode) return null;

            const endRect = endNode.getBoundingClientRect();
            const endX = endRect.left - containerRect.left + endRect.width / 2;
            const endY = endRect.top - containerRect.top + endRect.height / 2;

            return { start: { x: startX, y: startY }, end: { x: endX, y: endY }, targetId };
        }).filter(Boolean) as { start: { x: number, y: number }, end: { x: number, y: number }, targetId: string }[];

        setLines(newLines);
    }, [activeAgent]);

    return (
        <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto" ref={containerRef}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="mb-16 text-center"
            >
                <span className={`inline-block border rounded-full px-4 py-1 text-xs font-mono uppercase tracking-widest mb-4 transition-colors duration-300 ${isFounderMode ? 'border-red-500 text-red-500' : 'border-cyan-500 text-cyan-500'}`}>
                    The Constellation
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Your Automated <span className={isFounderMode ? "text-red-500" : "text-cyan-400"}>C-Suite</span>
                </h2>
            </motion.div>

            {/* SVG Overlay for Connections */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-visible">
                <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {lines.map((line, i) => (
                    <g key={i}>
                        <motion.path
                            d={`M${line.start.x},${line.start.y} L${line.end.x},${line.end.y}`}
                            stroke="url(#gradient-line)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        <motion.path
                            d={`M${line.start.x},${line.start.y} L${line.end.x},${line.end.y}`}
                            stroke={isFounderMode ? "#ef4444" : "#00f0ff"}
                            strokeWidth="1"
                            strokeOpacity="0.5"
                            fill="none"
                            strokeDasharray="5,5"
                        />
                        {/* Micro-text Label */}
                        <foreignObject
                            x={(line.start.x + line.end.x) / 2 - 60}
                            y={(line.start.y + line.end.y) / 2 - 10}
                            width="120"
                            height="20"
                        >
                            <div className="flex items-center justify-center">
                                <span className="bg-black/80 text-[8px] text-cyan-400 font-mono px-1 border border-cyan-500/30 rounded backdrop-blur-sm">
                                    {activeAgent === 'rainmaker' && line.targetId === 'treasurer' ? 'SYNCING_REVENUE...' :
                                        activeAgent === 'rainmaker' && line.targetId === 'architect' ? 'TRANSFERRING_LEAD_DATA' :
                                            'DATA_UPLINK_ESTABLISHED'}
                                </span>
                            </div>
                        </foreignObject>
                    </g>
                ))}
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {agents.map((agent, i) => {
                    // Check if this card should glow because of a handshake
                    const isConnected = activeAgent && connections[activeAgent]?.includes(agent.id);

                    return (
                        <motion.div
                            key={agent.id}
                            ref={el => { agentRefs.current[agent.id] = el }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={agent.colSpan}
                            onMouseEnter={() => setActiveAgent(agent.id)}
                            onMouseLeave={() => setActiveAgent(null)}
                        >
                            <AgentCard
                                {...agent}
                                isConnected={!!isConnected}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20">
                <div className="w-full h-full border-l border-r border-slate-800 absolute left-1/2 -translate-x-1/2" />
                <div className="w-full h-full border-l border-r border-slate-800 absolute left-1/4" />
                <div className="w-full h-full border-l border-r border-slate-800 absolute right-1/4" />
            </div>
        </section>
    );
}
