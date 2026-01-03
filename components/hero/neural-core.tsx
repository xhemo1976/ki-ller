"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import * as random from "maath/random";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";

// Utility hook for mobile detection
function useMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    return isMobile;
}

function NeuralNetwork({ isMobile }: { isMobile: boolean }) {
    const ref = useRef<THREE.Points>(null!);

    // "Starry Sky" density on mobile (3500), dense core on desktop (5000)
    const count = isMobile ? 3500 : 5000;
    const radius = isMobile ? 9 : 1.5;

    // We use useMemo with key dependency on isMobile to recreate buffer only when needed
    const positions = useMemo(() => {
        return random.inSphere(new Float32Array(count * 3), { radius }) as Float32Array;
    }, [count, radius]);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Slower, majestic rotation on mobile
        const rotSpeedX = isMobile ? 20 : 10;
        const rotSpeedY = isMobile ? 30 : 15;

        ref.current.rotation.x -= delta / rotSpeedX;
        ref.current.rotation.y -= delta / rotSpeedY;

        const time = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(time * 2) * 0.05;
        ref.current.scale.set(scale, scale, scale);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00C2FF" // Neon Blue (Cyberpunk)
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function ConnectingLines({ isMobile }: { isMobile: boolean }) {
    // Reduce count on mobile (25 vs 50)
    const count = isMobile ? 20 : 50;
    const radius = isMobile ? 12 : 2;

    const points = useMemo(() => {
        const pCount = isMobile ? 500 : 1000;
        return random.inSphere(new Float32Array(pCount * 3), { radius }) as Float32Array;
    }, [isMobile, radius]);

    return (
        <group>
            <Points positions={points} stride={3}>
                <PointMaterial
                    transparent
                    color="#00ffff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

function SceneEvents({ mouse, isMobile }: { mouse: React.MutableRefObject<[number, number]>, isMobile: boolean }) {
    useFrame((state) => {
        const { viewport, camera } = state;

        // Deep Space Camera for Mobile ("Starry Sky" feeling)
        const targetZ = isMobile ? 28 : 3;

        // Smooth transition for Z
        camera.position.z += (targetZ - camera.position.z) * 0.05;

        // Mouse Parallax
        const parallaxAmp = isMobile ? 0.01 : 0.05;

        state.camera.lookAt(0, 0, 0);
        state.camera.position.x += (state.pointer.x - state.camera.position.x) * parallaxAmp;
        state.camera.position.y += (-state.pointer.y - state.camera.position.y) * parallaxAmp;
    })
    return null;
}

export function NeuralCore() {
    const mouse = useRef<[number, number]>([0, 0]);
    const isMobile = useMobile();

    return (
        <div className="absolute inset-0 w-full h-full z-0">
            {/* Initial camera pos can be neutral, SceneEvents will adjust it */}
            <Canvas camera={{ position: [0, 0, 10] }} gl={{ alpha: true }} onMouseMove={(e) => (mouse.current = [e.clientX, e.clientY])}>

                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <NeuralNetwork isMobile={isMobile} />
                </Float>

                <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
                    <ConnectingLines isMobile={isMobile} />
                </Float>

                {/* Fewer stars on mobile if needed, but negligible perf cost usually */}
                <Stars radius={100} depth={50} count={isMobile ? 2000 : 5000} factor={4} saturation={0} fade speed={1} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL} // blend mode
                        offset={[0.002, 0.002]} // color offset
                    />
                    <Noise opacity={0.05} />
                </EffectComposer>

                {/* Interactive Camera rig */}
                <SceneEvents mouse={mouse} isMobile={isMobile} />
            </Canvas>
        </div>
    );
}
