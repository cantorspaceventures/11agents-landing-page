'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface CoreProps {
    scale?: number;
    emissiveIntensity?: number;
    distort?: number;
    speed?: number;
    color?: string;
    emissive?: string;
}

/**
 * The Central Sovereign Core - enhanced with Voronoi-like distortion
 */
export function Core({
    scale = 1,
    emissiveIntensity = 0.15,
    distort = 0.4,
    speed = 2,
    color = "#000000",
    emissive = "#00f0ff"
}: CoreProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
            meshRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <group scale={scale}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.4, 2]} />
                <MeshDistortMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={emissiveIntensity}
                    roughness={0.1}
                    metalness={1}
                    wireframe
                    distort={distort}
                    speed={speed}
                />
            </mesh>
            {/* Inner High-Energy Core */}
            <mesh scale={0.6}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color={emissive} transparent opacity={0.05} />
            </mesh>
        </group>
    );
}

const ORBIT_RADIUS = 3.5;

/**
 * Individual Orbiting Agent Orb
 */
export function AgentOrb({ index, total }: { index: number; total: number }) {
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
