"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import * as random from "maath/random";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";

function NeuralNetwork(props: any) {
    const ref = useRef<THREE.Points>(null!);
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }));

    // Custom definitions for the "Neural Core" logic
    // Implementing a custom shader material logic via standard PointsMaterial for simplicity first, 
    // but using frame loop to manipulate positions for the "Magnet" effect.

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Rotation
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Mouse Interaction (Magnet Field)
        const time = state.clock.getElapsedTime();
        // Simple pulse effect based on time
        const scale = 1 + Math.sin(time * 2) * 0.05;
        ref.current.scale.set(scale, scale, scale);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#39ff14" // Neon Green base
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function ConnectingLines() {
    // A secondary layer of lines/structure to simulate connections
    const count = 50;
    const lines = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 4;
            const y = (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 4;
            temp.push([x, y, z]);
        }
        return temp;
    }, []);

    return (
        <group>
            {/* Abstract representation, could be improved with 'Line' from drei but creating custom instanced mesh is better for perf. 
                 For now, keeping it subtle with just more points in a different color (Cyan) */}
            <Points positions={random.inSphere(new Float32Array(1000 * 3), { radius: 2 })} stride={3}>
                <PointMaterial
                    transparent
                    color="#00ffff" // Electric Cyan
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

function SceneEvents({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    useFrame((state) => {
        // Convert mouse screen coords to 3D world influence if needed
        const { viewport } = state;
        // Logic to distort particles would go here using a custom shader prop update
        // Since we are using standard materials for MVP stability, we handle rotation/group movement here.

        const x = (state.pointer.x * viewport.width) / 2;
        const y = (state.pointer.y * viewport.height) / 2;

        state.camera.lookAt(0, 0, 0);
        state.camera.position.x += (state.pointer.x - state.camera.position.x) * 0.05
        state.camera.position.y += (-state.pointer.y - state.camera.position.y) * 0.05
    })
    return null;
}

export function NeuralCore() {
    const mouse = useRef<[number, number]>([0, 0]);

    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }} onMouseMove={(e) => (mouse.current = [e.clientX, e.clientY])}>

                {/* Fog removed to see background image clearly */}
                {/* <fog attach="fog" args={['#000000', 1, 10]} /> */}

                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <NeuralNetwork />
                </Float>

                <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
                    <ConnectingLines />
                </Float>

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL} // blend mode
                        offset={[0.002, 0.002]} // color offset
                    />
                    <Noise opacity={0.05} />
                </EffectComposer>

                {/* Interactive Camera rig */}
                <SceneEvents mouse={mouse} />
            </Canvas>
        </div>
    );
}
