"use client";

import { motion } from "framer-motion";

const TECHNOLOGIES = [
    "OpenAI",
    "n8n",
    "Next.js",
    "TailwindCSS",
    "TypeScript",
    "Supabase",
    "Vercel",
    "Python",
    "React",
    "Framer Motion",
    "Stripe",
    "HubSpot",
];

export function TechMarquee() {
    return (
        <section className="py-24 bg-black overflow-hidden relative z-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <p className="text-white/50 uppercase tracking-widest text-sm font-light">
                    Powered by Modern Intelligence
                </p>
            </div>

            <div className="flex relative items-center">
                {/* Gradient Masks for smooth fade out */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                <motion.div
                    className="flex gap-16 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Speed control
                    }}
                >
                    {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-2 group cursor-default">
                            <span className="text-2xl md:text-4xl font-black text-white/20 group-hover:text-neon-blue transition-colors duration-300 uppercase italic">
                                {tech}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
