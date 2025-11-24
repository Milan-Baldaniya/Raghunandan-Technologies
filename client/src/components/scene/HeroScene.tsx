import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

function RobotHead({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const headRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!headRef.current || !eyesRef.current) return;

    // Smoothly interpolate mouse position
    const targetX = (state.mouse.x * Math.PI) / 4; // Limit rotation range
    const targetY = (state.mouse.y * Math.PI) / 4;

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
  });

  return (
    <group ref={headRef}>
      {/* Main Head Shape */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.4, 1.2]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Face Plate (Black Glass) */}
      <mesh position={[0, 0, 0.61]}>
        <planeGeometry args={[1, 1.2]} />
        <meshStandardMaterial color="#000" metalness={1} roughness={0} />
      </mesh>

      {/* Glowing Eyes */}
      <group ref={eyesRef} position={[0, 0.2, 0.62]}>
        {/* Left Eye */}
        <mesh position={[-0.25, 0, 0]}>
          <circleGeometry args={[0.15, 32]} />
          <meshBasicMaterial color="#00f0ff" toneMapped={false} />
        </mesh>
         <pointLight position={[-0.25, 0, 0.5]} color="#00f0ff" intensity={2} distance={2} />

        {/* Right Eye */}
        <mesh position={[0.25, 0, 0]}>
          <circleGeometry args={[0.15, 32]} />
          <meshBasicMaterial color="#00f0ff" toneMapped={false} />
        </mesh>
        <pointLight position={[0.25, 0, 0.5]} color="#00f0ff" intensity={2} distance={2} />
      </group>

      {/* Ear/Antenna Details */}
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.8]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.7, 0, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.8]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Top Detail */}
       <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function RobotBody() {
    return (
        <group position={[0, -2.2, 0]}>
             {/* Neck */}
            <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 0.8]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
            </mesh>

            {/* Torso */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.8, 0.6, 2.5, 6]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Chest Light */}
             <mesh position={[0, 0.5, 0.75]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.4, 0.4, 0.1]} />
                <meshBasicMaterial color="#00f0ff" toneMapped={false} />
            </mesh>
             <pointLight position={[0, 0.5, 1]} color="#00f0ff" intensity={2} distance={3} />
            
            {/* Shoulders */}
             <mesh position={[1.1, 0.8, 0]} rotation={[0, 0, -0.2]}>
                <sphereGeometry args={[0.6]} />
                <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
            </mesh>
             <mesh position={[-1.1, 0.8, 0]} rotation={[0, 0, 0.2]}>
                <sphereGeometry args={[0.6]} />
                <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
            </mesh>
        </group>
    )
}

function Robot() {
    const mouse = useRef(new THREE.Vector2());

    return (
        <group position={[0, 0, 0]}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <RobotHead mouse={mouse} />
                <RobotBody />
            </Float>
        </group>
    )
}

export default function HeroScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <Environment preset="warehouse" />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1000} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={500} color="#00f0ff" />

      <group position={[1.5, 0, 0]} rotation={[0, -0.3, 0]}>
         <Robot />
      </group>
    </>
  );
}
