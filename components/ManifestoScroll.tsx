'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useFounderMode } from '@/context/FounderModeContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Core } from './Core3D';
import * as THREE from 'three';

function BackgroundScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // We'll use a ref to control the group containing the Core to scale/animate it
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        const progress = scrollYProgress.get(); // 0 to 1

        // Grow from scale 1 to 2.5
        const targetScale = 1 + (progress * 1.5);
        // Lerp for smoothness
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Pulse effect (handled by props passed to Core, but we can also rotate the group)
        groupRef.current.rotation.z = progress * Math.PI * 0.5;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#9d00ff" />

            <group ref={groupRef}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    {/* 
                        We can control internal Core props here if we want more granular control.
                        For now, just scaling the whole group is effective.
                        We can also pass dynamic props if we refactor Core to useFrame for props too, 
                        but let's stick to group manipulation for performance/simplicity.
                    */}
                    <Core scale={1.5} distort={0.6} speed={3} />
                </Float>
            </group>

            <Sparkles
                count={100}
                scale={[20, 20, 20]}
                size={2}
                speed={0.4}
                opacity={0.2}
                color="#ffffff"
            />

            <EffectComposer>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.8} radius={0.5} />
            </EffectComposer>
        </>
    );
}

function ScrollPhrase({ text, index, className = "" }: { text: string; index: number; className?: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const { isFounderMode } = useFounderMode();

    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.8, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            className={`font-bold tracking-tighter py-16 md:py-24 transition-colors duration-500 ${className} ${!className.includes('text-red-500') ? (isFounderMode ? 'text-red-500' : 'text-slate-200') : ''}`}
        >
            {text}
        </motion.div>
    );
}

export default function ManifestoScroll() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative w-full min-h-[300vh] bg-[#050505]">
            {/* Sticky 3D Background */}
            <div className="sticky top-0 h-screen w-full overflow-hidden opacity-40 mix-blend-screen">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <BackgroundScene scrollYProgress={scrollYProgress} />
                </Canvas>
                {/* Dissolve Gradient at bottom of sticky container to blend with next section if needed */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>

            {/* Scrolling Content Overlay */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 -mt-[100vh] pt-[50vh] pb-[50vh]">
                <div className="flex flex-col gap-32 md:gap-48 w-full text-center">

                    {/* Intro */}
                    <div className="flex flex-col gap-6">
                        <ScrollPhrase text="The Era of the &quot;Management Tax&quot; is Over." index={0} className="text-5xl md:text-8xl" />
                    </div>

                    {/* The Problem */}
                    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl text-slate-400 font-mono text-left pl-4 md:pl-0 border-l-2 border-slate-800 md:border-none backdrop-blur-sm bg-black/20 p-4 rounded-r-lg">
                            For decades, the path to scaling a business followed a predictable, painful script:
                        </p>
                        <div className="flex flex-col gap-4 text-3xl md:text-5xl font-bold text-slate-200">
                            <ScrollPhrase text="You have a vision." index={1} />
                            <ScrollPhrase text="You hire people to execute that vision." index={2} />
                            <ScrollPhrase text="You spend 80% of your time managing those people." index={3} className="text-red-500" />
                        </div>
                    </div>

                    {/* The Consequence */}
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-lg">
                            Suddenly, you aren't a Founder anymore. You are a Chief People Officer, a Conflict Mediator, and a Professional Meeting Attender. Your <span className="text-white font-bold">"Velocity"</span> is strangled by the very team you built to accelerate it.
                        </p>
                        <ScrollPhrase text="We believe scale should not equal complexity." index={4} className="text-4xl md:text-7xl" />
                    </div>

                    {/* The Solution */}
                    <div className="max-w-5xl mx-auto flex flex-col gap-12 pb-32">
                        <p className="text-2xl md:text-4xl font-medium text-slate-200 leading-normal backdrop-blur-md bg-black/30 p-8 rounded-2xl border border-white/10">
                            We believe a single founder with a world-class agentic team should be able to out-maneuver a Series B startup with 100 employees. We believe that "Management" should be a background process—autonomous, data-driven, and relentlessly loyal to the North Star.
                        </p>
                    </div>
                </div>
            </div>

            {/* Dissolve Transition into Next Section */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-20" />
        </section>
    );
}
