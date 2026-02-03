'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Compass, TrendingUp, Zap, Triangle, Radar,
    Box, Workflow, Shield, Users, BrainCircuit, Activity,
    ChevronLeft, ChevronRight
} from 'lucide-react';

const agents = [
    {
        id: 'sentinel',
        name: "The Sentinel",
        title: "Chief of Strategy",
        icon: Compass,
        purpose: "To act as the \"Master Alignment Engine.\" It ensures every other agent is moving toward the same North Star.",
        specialization: "Vision-to-Task translation, OKR management, and ruthless prioritization of the founder’s time.",
        output: "The Daily Brief. A synthesized report that highlights only the decisions the CEO must make today, filtered from the noise of the other 10 agents.",
        color: "#00f0ff"
    },
    {
        id: 'treasurer',
        name: "The Treasurer",
        title: "Finance & Capital",
        icon: TrendingUp,
        purpose: "To maintain financial health and ensure the company never runs out of \"fuel.\"",
        specialization: "Runway modeling, tax optimization (UAE/Global), cash flow forecasting, and unit economics (LTV/CAC).",
        output: "The Vitality Dashboard. A real-time P&L and a \"Days of Runway\" counter that updates with every transaction.",
        color: "#34d399"
    },
    {
        id: 'rainmaker',
        name: "The Rainmaker",
        title: "Sales & Revenue",
        icon: Zap,
        purpose: "To drive top-line growth through automated and assisted sales.",
        specialization: "Lead scoring, outbound sequence optimization, and proposal generation.",
        output: "The Revenue Forecast. A weekly projection of closed-won deals and a hot-list of leads that require human (founder) touch.",
        color: "#fbbf24"
    },
    {
        id: 'architect',
        name: "The Architect",
        title: "Marketing & Brand",
        icon: Triangle,
        purpose: "To build authority and demand in the marketplace.",
        specialization: "Content lifecycle management, brand voice consistency, and multi-channel distribution logic.",
        output: "The Campaign Pulse. A 30-day rolling content calendar and a brand-sentiment analysis report.",
        color: "#f472b6"
    },
    {
        id: 'scout',
        name: "The Scout",
        title: "Intelligence & Research",
        icon: Radar,
        purpose: "To eliminate surprises and find hidden opportunities.",
        specialization: "Competitive intelligence, trend spotting, and monitoring \"technographic\" shifts (like new AI models).",
        output: "The Threat & Opportunity Map. Real-time alerts when a competitor shifts pricing or a new market niche opens up.",
        color: "#60a5fa"
    },
    {
        id: 'builder',
        name: "The Builder",
        title: "Product & Technology",
        icon: Box,
        purpose: "To ensure the product evolves faster than the market.",
        specialization: "Feature prioritization (ICE/RICE frameworks), technical debt monitoring, and bridging the gap between user feedback and code.",
        output: "The Product Roadmap. A live, sequencing chart showing what is being built, why, and the \"Estimated Impact\" on growth.",
        color: "#a78bfa"
    },
    {
        id: 'orchestrator',
        name: "The Orchestrator",
        title: "Operations & SOPs",
        icon: Workflow,
        purpose: "To turn the business into a repeatable, scalable machine.",
        specialization: "Workflow automation, vendor management, and creating \"Standard Operating Procedures\" (SOPs) for both humans and AI.",
        output: "The Efficiency Audit. A report identifying \"bottlenecks\" in the business where time or money is being wasted.",
        color: "#94a3b8"
    },
    {
        id: 'shield',
        name: "The Shield",
        title: "Legal, Risk & Compliance",
        icon: Shield,
        purpose: "To protect the entity from legal and regulatory friction.",
        specialization: "Contract drafting, IP (Intellectual Property) strategy, and multi-jurisdictional compliance (essential for your UAE free zone/global setups).",
        output: "The Compliance Scorecard. A \"Red/Yellow/Green\" status on all legal filings and pending contracts.",
        color: "#ef4444"
    },
    {
        id: 'talent',
        name: "The Talent Scout",
        title: "People & Culture",
        icon: Users,
        purpose: "To optimize the \"Human-AI Hybrid\" workforce.",
        specialization: "Fractional talent sourcing, contractor management, and organizational design for lean teams.",
        output: "The Talent Pipeline. Verified lists of vetted freelancers or AI tools ready to be \"plugged in\" to solve a specific problem.",
        color: "#f87171"
    },
    {
        id: 'analyst',
        name: "The Analyst",
        title: "Data & Insights",
        icon: BrainCircuit,
        purpose: "To turn raw data into actionable truth.",
        specialization: "Cross-agent data correlation (e.g., linking Marketing spend to Customer Success tickets) and predictive modeling.",
        output: "The Anomaly Report. Alerts that fire when data deviates from the norm—telling you why something is happening before you even notice it.",
        color: "#818cf8"
    },
    {
        id: 'pulse',
        name: "The Pulse",
        title: "Customer Success & Retention",
        icon: Activity,
        purpose: "To protect the \"Leaky Bucket\" and ensure long-term loyalty.",
        specialization: "Churn prediction, NPS (Net Promoter Score) tracking, and identifying \"Power Users\" for upselling.",
        output: "The Retention Memo. A list of at-risk clients and an automated \"Save Plan\" for each.",
        color: "#2dd4bf"
    }
];

export default function SovereignAgentsCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 600;
            const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="relative py-24 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-4 mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="inline-block border border-cyan-500/30 rounded-full px-4 py-1 text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4 bg-black/50 backdrop-blur-sm">
                        The Sovereign 11
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
                        Meet the <span className="text-cyan-400">Agents</span>
                    </h2>
                    <p className="text-slate-400 max-w-md">
                        A complete autonomous C-Suite designed to run your empire.
                    </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-full border border-slate-700 bg-slate-900/50 text-white hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all active:scale-95"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-full border border-slate-700 bg-slate-900/50 text-white hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all active:scale-95"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory pb-12 px-4 md:px-8 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {/* Spacer for first item alignment */}
                <div className="w-0 md:w-4 flex-shrink-0" />

                {agents.map((agent) => {
                    const Icon = agent.icon;
                    return (
                        <div
                            key={agent.id}
                            className="snap-center flex-shrink-0 w-[85vw] md:w-[600px] group relative h-[500px] bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-cyan-500/30 transition-colors duration-500"
                        >
                            {/* Background Gradient */}
                            <div
                                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(circle at top right, ${agent.color}, transparent 70%)` }}
                            />

                            <div className="relative z-10 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="p-3 rounded-lg bg-black/50 border border-slate-700 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/50"
                                        style={{ color: agent.color }}
                                    >
                                        <Icon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-50 transition-colors">{agent.name}</h3>
                                        <p className="text-sm font-mono text-slate-500 uppercase tracking-wider">{agent.title}</p>
                                    </div>
                                </div>

                                <div className="space-y-6 flex-grow flex flex-col">
                                    <div>
                                        <h4 className="text-xs font-mono text-cyan-500/60 uppercase mb-2 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                                            Purpose
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed text-lg">
                                            {agent.purpose}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-mono text-cyan-500/60 uppercase mb-2 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full border border-cyan-500 box-border"></span>
                                            Specialization
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {agent.specialization}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-auto border-t border-slate-800/50">
                                        <h4 className="text-xs font-mono text-cyan-500/60 uppercase mb-1">Output</h4>
                                        <p className="text-white/90 font-medium text-sm">
                                            {agent.output}
                                        </p>
                                    </div>
                                </div>

                                {/* Tech decoration */}
                                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-600 opacity-30 select-none">
                                    ID: {agent.id.toUpperCase()}_v1.0
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Spacer for last item alignment */}
                <div className="w-4 md:w-16 flex-shrink-0" />
            </div>
        </section>
    );
}
