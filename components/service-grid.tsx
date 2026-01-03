"use client";

import { Bot, Zap, Code } from "lucide-react";

const SERVICES = [
    {
        title: "AI Agents",
        description: "Autonome Mitarbeiter für Support & Sales",
        icon: Bot,
    },
    {
        title: "Automation",
        description: "n8n Workflows, die Zeit sparen",
        icon: Zap,
    },
    {
        title: "SaaS Core",
        description: "Maßgeschneiderte Software-Lösungen",
        icon: Code,
    },
];

export function ServiceGrid() {
    return (
        <section className="relative z-20 bg-black pb-32 pt-12 px-4">
            {/* Soft Gradient Transition from Hero */}
            <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SERVICES.map((service, idx) => (
                        <div
                            key={idx}
                            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-[var(--neon-blue)] transition-all duration-300 hover:bg-white/10 cursor-pointer"
                        >
                            <div className="mb-6 text-[var(--neon-blue)] group-hover:scale-110 transition-transform duration-300">
                                <service.icon size={48} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-tech-grey mb-3">{service.title}</h3>
                            <p className="text-tech-grey/70 group-hover:text-tech-grey/90 transition-colors leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
