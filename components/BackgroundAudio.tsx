'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const oscillatorsRef = useRef<OscillatorNode[]>([]);

    const initializeAudio = () => {
        if (audioContextRef.current) return;

        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        // Master Gain for Volume Control
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime); // Start silent
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Create a deep "Drone"
        // Using two oscillators slightly detuned for a binaural beat / phasing effect
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz Low Drone

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(61, ctx.currentTime); // 61Hz (1Hz beat)

        // Filter to soften the sawtooth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, ctx.currentTime);

        // LFO to modulate the filter (adds "breathing" movement)
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // Slow breath (10 seconds)

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(50, ctx.currentTime); // Modulation depth

        // Connect LFO -> Filter Freq
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        // Patching: Osc -> Filter -> MasterGain
        osc1.connect(filter);
        osc2.connect(masterGain); // Sine wave bypasses filter for sub-bass
        filter.connect(masterGain);

        // Start everything
        osc1.start();
        osc2.start();
        lfo.start();

        oscillatorsRef.current = [osc1, osc2, lfo];
    };

    const toggleAudio = async () => {
        if (!audioContextRef.current) {
            initializeAudio();
        }

        const ctx = audioContextRef.current;
        if (!ctx || !gainNodeRef.current) return;

        // Resume context if suspended (browser policy)
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const now = ctx.currentTime;
        const fadeTime = 2; // 2 seconds fade

        if (isPlaying) {
            // Fade Out
            gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now);
            gainNodeRef.current.gain.linearRampToValueAtTime(0, now + fadeTime);
            setTimeout(() => setIsPlaying(false), fadeTime * 1000);
        } else {
            // Fade In
            setIsPlaying(true);
            gainNodeRef.current.gain.setValueAtTime(0, now);
            gainNodeRef.current.gain.linearRampToValueAtTime(0.15, now + fadeTime); // Max volume 0.15 (keep it subtle)
        }
    };

    return (
        <button
            onClick={toggleAudio}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2 
        font-mono text-xs tracking-widest uppercase transition-all duration-300
        border backdrop-blur-md
        ${isPlaying
                    ? 'border-cyan-500/50 text-cyan-400 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                    : 'border-white/10 text-white/40 bg-black/20 hover:border-white/30 hover:text-white/70'
                }
      `}
        >
            <span className="relative flex h-2 w-2">
                {isPlaying && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-cyan-500' : 'bg-white/20'}`}></span>
            </span>

            <span>
                [ AUDIO: {isPlaying ? 'ONLINE' : 'OFFLINE'} ]
            </span>
        </button>
    );
}
