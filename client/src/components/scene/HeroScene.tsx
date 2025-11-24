import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls, Html } from "@react-three/drei";
import * as THREE from "three";

function Laptop() {
  const group = useRef<THREE.Group>(null);

  // Open/Close animation could go here but let's keep it static open for now
  
  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.15, 2.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Screen Hinge Group */}
      <group position={[0, 0.05, -1.1]} rotation={[0.25, 0, 0]}>
        {/* Lid */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.2} />
        </mesh>
        
        {/* Screen (Emissive) */}
        <mesh position={[0, 1.1, 0.06]}>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial emissive="#000" color="#000" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* HTML Content on Screen */}
        <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={1.5}
            position={[0, 1.1, 0.07]}
            rotation={[0, 0, 0]}
        >
            <div className="w-[600px] h-[400px] bg-black p-8 flex flex-col items-center justify-center overflow-hidden border border-white/10">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="w-full font-mono text-xs text-green-400 leading-relaxed opacity-80">
                    {`> initializing_core_systems...\n> connecting_to_neural_net...\n> loading_modules [██████████] 100%\n> system_ready`}
                </div>
                 <div className="mt-8 text-4xl font-bold text-white font-display tracking-tighter">
                    NEXTECH OS
                </div>
                 <div className="mt-2 text-sm text-gray-500 font-mono">
                    v2.0.45-beta
                </div>
            </div>
        </Html>
      </group>

      {/* Keyboard Area (Texture or Geometry) */}
      <mesh position={[0, 0.08, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 1.2]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.08, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 0.6]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
    </group>
  );
}

function MobilePhone() {
    return (
        <group position={[2.5, -0.8, 0.5]} rotation={[-0.1, -0.2, 0.1]}>
             <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Body */}
                <mesh>
                    <boxGeometry args={[0.8, 1.6, 0.08]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Screen */}
                <mesh position={[0, 0, 0.05]}>
                    <planeGeometry args={[0.75, 1.55]} />
                     <meshStandardMaterial emissive="#111" color="#000" />
                </mesh>
                {/* Camera notch mockup */}
                <mesh position={[0, 0.7, 0.06]}>
                     <circleGeometry args={[0.03]} />
                     <meshBasicMaterial color="#000" />
                </mesh>
             </Float>
        </group>
    )
}

function Tablet() {
     return (
        <group position={[-2.5, -0.5, -0.5]} rotation={[0.1, 0.3, -0.1]}>
             <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
                {/* Body */}
                <mesh>
                    <boxGeometry args={[1.8, 1.2, 0.06]} />
                    <meshStandardMaterial color="#151515" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Screen */}
                <mesh position={[0, 0, 0.04]}>
                    <planeGeometry args={[1.7, 1.1]} />
                    <meshStandardMaterial emissive="#050505" color="#000" />
                </mesh>
             </Float>
        </group>
    )
}


export default function HeroScene() {
  return (
    <>
      <Environment preset="city" />
      
      <PresentationControls 
        global 
        snap={true}
        rotation={[0, 0, 0]} 
        polar={[-Math.PI / 6, Math.PI / 6]} 
        azimuth={[-Math.PI / 6, Math.PI / 6]}
      >
        <group position={[0, 0.5, 0]} scale={0.8}>
            <Float rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[-0.1, 0.1]}>
                <Laptop />
            </Float>
            <MobilePhone />
            <Tablet />
        </group>
      </PresentationControls>

      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </>
  );
}
