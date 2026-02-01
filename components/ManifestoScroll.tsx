'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useFounderMode } from '@/context/FounderModeContext';

const phrases = [
    "Management is a tax.",
    "Velocity is the only metric.",
    "The Cockpit is Yours."
];

function ScrollPhrase({ text, index }: { text: string; index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const { isFounderMode } = useFounderMode();

    const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.1, 1, 0.1]);
    const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.8, 1.1, 0.8]);
    const x = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [index % 2 === 0 ? -50 : 50, 0, index % 2 === 0 ? 50 : -50]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, x }}
            className={`text-5xl md:text-8xl font-bold tracking-tighter py-32 md:py-48 text-center transition-colors duration-500 ${isFounderMode ? 'text-red-500' : 'text-slate-200'
                }`}
        >
            {text}
        </motion.div>
    );
}

export default function ManifestoScroll() {
    return (
        <section className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Grid Pattern - subtle */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
                {phrases.map((phrase, i) => (
                    <ScrollPhrase key={i} text={phrase} index={i} />
                ))}
            </div>
        </section>
    );
}
