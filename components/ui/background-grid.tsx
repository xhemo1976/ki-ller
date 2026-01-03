"use client";

import { motion } from "framer-motion";

export function BackgroundGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute inset-0 bg-black" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #111 1px, transparent 1px),
            linear-gradient(to bottom, #111 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
                }}
            />
            {/* Perspective Grid Floor */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-[50vh] origin-bottom"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                }}
            >
                <motion.div
                    animate={{
                        backgroundPosition: ["0px 0px", "0px 100px"]
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10
                    }}
                    className="w-full h-[200%] absolute -top-full left-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(to right, #39ff14 1px, transparent 1px), linear-gradient(to bottom, #39ff14 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                        transform: "rotateX(60deg) scale(2)",
                        transformOrigin: "bottom center",
                        maskImage: "linear-gradient(to top, black 0%, transparent 50%)"
                    }}
                />
            </motion.div>
        </div>
    );
}
