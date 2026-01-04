"use client";

import { motion } from "framer-motion";
import { NeuralCore } from "@/components/hero/neural-core";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative h-screen w-full flex items-end justify-center overflow-hidden pb-24 md:pb-32 bg-black">
            {/* Background Eye - Full Screen Cover */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/logo.png"
                    alt="Background"
                    fill
                    className="object-cover object-center opacity-40 md:opacity-25 scale100 md:scale-195"
                    priority
                />
            </div>

            {/* Particles */}
            <NeuralCore />

            {/* Mobile Gradient Vignette for Text Readability */}
            <div className="absolute inset-0 z-5 bg-gradient-to-t from-black via-black/60 to-black/30 md:hidden pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-tech-grey mb-6"
                >
                    KÜNSTLICHE <span className="text-[var(--neon-blue)] inline-block">INTELLIGENZ.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl font-light tracking-tight text-tech-grey/80 max-w-2xl mx-auto"
                >
                    für dein Business. <br />
                    Wir Automatisieren euern Altag.
                </motion.p>
            </div>
        </section>
    );
}
