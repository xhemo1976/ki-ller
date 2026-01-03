"use client";

import React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

type Service = {
    id: string;
    label: string;
    color: string;
    radius: number;
};

const SERVICES: Service[] = [
    { id: "s1", label: "n8n Auto", color: "#39ff14", radius: 60 },
    { id: "s2", label: "AI Agents", color: "#00ffff", radius: 70 },
    { id: "s3", label: "SaaS Core", color: "#ffffff", radius: 65 },
    { id: "s4", label: "Web & Apps", color: "#39ff14", radius: 75 },
    { id: "s5", label: "Scale", color: "#00ffff", radius: 55 },
];

export function GravityOrbs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });

    // Physics state
    const bodies = useRef(
        SERVICES.map((s) => ({
            ...s,
            x: Math.random() * 500, // initial random pos
            y: Math.random() * 300,
            vx: (Math.random() - 0.5) * 1.5, // random velocity
            vy: (Math.random() - 0.5) * 1.5,
        }))
    );

    // We use standard React state to force renders for the positions, 
    // but for 60fps smooth physics without re-renders, we'd use useMotionValue.
    // However, mapping multiple motion values to elements is verbose. 
    // Let's try useMotionValue for each body for high performance.

    // Create motion values
    const motionValues = useRef(
        SERVICES.map(() => ({
            x: useMotionValue(0),
            y: useMotionValue(0),
        }))
    ).current;

    useEffect(() => {
        if (!containerRef.current) return;
        const updateSize = () => {
            if (containerRef.current) {
                setSize({
                    w: containerRef.current.offsetWidth,
                    h: containerRef.current.offsetHeight
                });
                // Re-distribute bodies if needed or just let them bounce
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useAnimationFrame(() => {
        if (size.w === 0) return;

        const currentBodies = bodies.current;

        // 1. Update positions
        for (let i = 0; i < currentBodies.length; i++) {
            const b = currentBodies[i];
            b.x += b.vx;
            b.y += b.vy;

            // Wall collisions
            if (b.x - b.radius < 0) {
                b.x = b.radius;
                b.vx *= -1;
            } else if (b.x + b.radius > size.w) {
                b.x = size.w - b.radius;
                b.vx *= -1;
            }

            if (b.y - b.radius < 0) {
                b.y = b.radius;
                b.vy *= -1;
            } else if (b.y + b.radius > size.h) {
                b.y = size.h - b.radius;
                b.vy *= -1;
            }
        }

        // 2. Orb vs Orb Collisions (Simple elastic)
        for (let i = 0; i < currentBodies.length; i++) {
            for (let j = i + 1; j < currentBodies.length; j++) {
                const b1 = currentBodies[i];
                const b2 = currentBodies[j];

                const dx = b2.x - b1.x;
                const dy = b2.y - b1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDist = b1.radius + b2.radius;

                if (distance < minDist) {
                    // Collision detected
                    // Calculate angle, sine, and cosine
                    const angle = Math.atan2(dy, dx);
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);

                    // Rotate body position
                    const pos1 = { x: 0, y: 0 }; // relative
                    const pos2 = { x: dx * cos + dy * sin, y: dy * cos - dx * sin };

                    // Rotate velocity
                    const vel1 = { x: b1.vx * cos + b1.vy * sin, y: b1.vy * cos - b1.vx * sin };
                    const vel2 = { x: b2.vx * cos + b2.vy * sin, y: b2.vy * cos - b2.vx * sin };

                    // Collision reaction (swap x velocities for equal mass temp)
                    // Assume mass proportional to radius? Let's just swap for simplicity or 1D elastic
                    const tempVx = vel1.x;
                    vel1.x = vel2.x;
                    vel2.x = tempVx;

                    // Update orbit positions (resolve overlap) to avoid sticking
                    const overlap = minDist - distance;
                    const separation = overlap / 2;
                    // We should separate them along the collision vector
                    // This naive separation is tricky inside the loop, 
                    // but just updating velocities usually works enough for visuals.
                    // Let's force separate.

                    b1.x -= overlap * Math.cos(angle) * 0.5;
                    b1.y -= overlap * Math.sin(angle) * 0.5;
                    b2.x += overlap * Math.cos(angle) * 0.5;
                    b2.y += overlap * Math.sin(angle) * 0.5;


                    // Rotate velocities back
                    b1.vx = vel1.x * cos - vel1.y * sin;
                    b1.vy = vel1.y * cos + vel1.x * sin;
                    b2.vx = vel2.x * cos - vel2.y * sin;
                    b2.vy = vel2.y * cos + vel2.x * sin;
                }
            }
        }

        // Update motion values
        currentBodies.forEach((b, i) => {
            motionValues[i].x.set(b.x - b.radius);
            motionValues[i].y.set(b.y - b.radius);
        });
    });

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {SERVICES.map((service, i) => (
                <motion.div
                    key={service.id}
                    className="absolute rounded-full flex items-center justify-center text-center border bg-black/50 backdrop-blur-sm cursor-pointer pointer-events-auto"
                    style={{
                        x: motionValues[i].x,
                        y: motionValues[i].y,
                        width: service.radius * 2,
                        height: service.radius * 2,
                        borderColor: service.color,
                        boxShadow: `0 0 15px ${service.color}33`,
                        color: service.color,
                    }}
                    whileHover={{ scale: 1.1, zIndex: 10, backgroundColor: "black" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-xs font-bold tracking-wider px-2 pointer-events-none select-none">
                        {service.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
