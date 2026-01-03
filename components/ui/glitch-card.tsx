"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GlitchCardProps {
    title: string;
    description: string;
    index: number;
}

export function GlitchCard({ title, description, index }: GlitchCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-[var(--neon-green)] transition-colors duration-300"
        >
            <div className="absolute inset-0 bg-[var(--neon-blue)]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--neon-blue)] transition-colors font-chakra tracking-wide">
                    {/* Glitch text effect could be added here */}
                    {title}
                </h3>
                <p className="text-gray-400 group-hover:text-white transition-colors">
                    {description}
                </p>
            </div>

            {/* Decorative Glitch Lines */}
            <span className="absolute top-0 left-0 w-0 h-[2px] bg-[var(--electric-cyan)] group-hover:w-full transition-all duration-300 delay-100" />
            <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-[var(--electric-cyan)] group-hover:w-full transition-all duration-300" />
        </motion.div>
    );
}
