/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Define R3F elements as any to avoid TS errors with JSX.IntrinsicElements
const Mesh = 'mesh' as any;
const CapsuleGeometry = 'capsuleGeometry' as any;
const MeshPhysicalMaterial = 'meshPhysicalMaterial' as any;
const Group = 'group' as any;
const AmbientLight = 'ambientLight' as any;
const DirectionalLight = 'directionalLight' as any;
const PointLight = 'pointLight' as any;
const Fog = 'fog' as any;

// Represents a healthy probiotic bacterium (Capsule shape)
// Using mesh with capsuleGeometry which is standard in recent Three.js versions
const Probiotic = ({ position, color, scale = 1, rotation = [0, 0, 0] }: { position: [number, number, number], color: string, scale?: number, rotation?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
        // Slow tumbling motion
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
        // Gentle floating
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <CapsuleGeometry args={[0.3, 1, 4, 8]} />
        <MeshPhysicalMaterial 
            color={color} 
            roughness={0.3}
            metalness={0.1}
            clearcoat={1}
            transparent
            opacity={0.9}
        />
      </Mesh>
    </Float>
  );
};

// Represents gas bubble or fluid particle
const FluidBubble = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
    return (
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
            <Sphere args={[0.5, 32, 32]} position={position} scale={scale}>
                <MeshPhysicalMaterial
                    color="#e0f2fe"
                    roughness={0}
                    metalness={0.1}
                    transmission={0.6}
                    thickness={0.5}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </Sphere>
        </Float>
    )
}

// Abstract Stomach Lining / Intestinal Wall
// Large organic shape moving in the background simulating peristalsis
const OrganicLining = () => {
    return (
        <Group position={[4, 0, -5]}>
            <Sphere args={[4.5, 64, 64]} scale={[1.5, 1.8, 1.5]}>
                <MeshDistortMaterial
                    color="#f1f5f9" // Very subtle cool grey/blue
                    distort={0.4}
                    speed={0.8} // Visible peristalsis-like movement
                    roughness={0.3}
                    metalness={0.2}
                />
            </Sphere>
        </Group>
    )
}

export const BioScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none w-full md:w-3/4 ml-auto h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <AmbientLight intensity={0.8} />
        <DirectionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <PointLight position={[-5, -5, 5]} intensity={0.5} color="#0ea5e9" />
        
        {/* Background Organic Mass */}
        <OrganicLining />
        
        {/* Probiotics (Bacilos - Healthy Gut Bacteria) */}
        <Probiotic position={[2.5, 1, 0]} color="#0ea5e9" scale={1.2} rotation={[0.4, 0.2, 0]} />
        <Probiotic position={[5, -2, 1]} color="#06b6d4" scale={0.9} rotation={[1, 1, 0]} />
        <Probiotic position={[0.5, -2, 2.5]} color="#7dd3fc" scale={0.7} rotation={[0, 0, 1]} />

        {/* Fluid/Air Bubbles */}
        <FluidBubble position={[1.5, 2.5, -1]} scale={0.6} />
        <FluidBubble position={[3.5, -0.5, 1.5]} scale={0.4} />
        <FluidBubble position={[6, -3, 0]} scale={0.8} />
        <FluidBubble position={[-0.5, 1, 2]} scale={0.3} />

        <Environment preset="city" />
        {/* Fog to seamlessly blend 3D scene with the website background */}
        <Fog attach="fog" args={['#f8fafc', 5, 20]} />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => null;