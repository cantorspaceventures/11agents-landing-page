'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ORBIT_RADIUS = 3.5;
const NUM_AGENTS = 11;

/**
 * The Central Sovereign Core - enhanced with Voronoi-like distortion
 */
function Core() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
            meshRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <group>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.4, 2]} />
                <MeshDistortMaterial
                    color="#000000"
                    emissive="#00f0ff"
                    emissiveIntensity={0.15}
                    roughness={0.1}
                    metalness={1}
                    wireframe
                    distort={0.4} // Distorts the mesh to create organic movement
                    speed={2}
                />
            </mesh>
            {/* Inner High-Energy Core */}
            <mesh scale={0.6}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} />
            </mesh>
        </group>
    );
}

/**
 * Individual Orbiting Agent Orb
 */
function AgentOrb({ index, total }: { index: number; total: number }) {
    const orbRef = useRef<THREE.Group>(null);
    // Calculate initial position on the circle
    const angle = (index / total) * Math.PI * 2;
    const position: [number, number, number] = [
        Math.cos(angle) * ORBIT_RADIUS,
        0,
        Math.sin(angle) * ORBIT_RADIUS,
    ];

    useFrame((state) => {
        if (orbRef.current) {
            // Orbit animation
            const time = state.clock.getElapsedTime();
            const speed = 0.2;
            const currentAngle = angle + time * speed;

            orbRef.current.position.x = Math.cos(currentAngle) * ORBIT_RADIUS;
            orbRef.current.position.z = Math.sin(currentAngle) * ORBIT_RADIUS;

            // Floating wave effect on Y axis
            orbRef.current.position.y = Math.sin(time * 0.5 + index) * 0.5;
        }
    });

    return (
        <group ref={orbRef} position={position}>
            <mesh>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial
                    color="#9d00ff"
                    emissive="#9d00ff"
                    emissiveIntensity={1.5}
                    toneMapped={false}
                    transparent
                    opacity={0.6}
                    roughness={0.7}
                />
            </mesh>
        </group>
    );
}

/**
 * The 3D Scene Composition
 */
function Scene() {
    const agents = useMemo(() => new Array(NUM_AGENTS).fill(0), []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#9d00ff" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Core />
            </Float>

            {agents.map((_, i) => (
                <AgentOrb key={i} index={i} total={NUM_AGENTS} />
            ))}

            <Sparkles
                count={2000}
                scale={[120, 120, 120]}
                size={1.2}
                speed={0.4}
                opacity={0.5}
                noise={1} // Adds random movement
                color="#ffffff"
            />

            <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
            </EffectComposer>
        </>
    );
}

export default function SovereignHero() {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                    <Scene />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <div className="py-20 px-8 md:px-12 min-h-[60vh] flex flex-col justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-purple-500 pb-2"
                    >
                        Scale Without the Humans.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-300 font-mono mb-10 max-w-2xl mx-auto"
                    >
                        The Sovereign Startup. Powered by Eleven. <br />
                        Deploy a synthetic C-Suite of 11 specialized AI agents. <br />
                        <span className="text-cyan-400 font-bold">This is Founder Mode, automated.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <button className="relative group px-8 py-4 bg-transparent border border-cyan-500/30 text-cyan-400 font-mono text-sm tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
                            [ DEPLOY YOUR TEAM ]
                            <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">Initialising System</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0" />
            </motion.div>
        </section>
    );
}
