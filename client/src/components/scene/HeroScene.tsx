import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera, useCubeTexture, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Preload robot model if we were using GLTF, but sticking to procedural for reliability
// useGLTF.preload('/robot-draco.glb') 

function RobotHead({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const headRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!headRef.current || !eyesRef.current) return;

    // Smooth tracking
    const targetX = (state.mouse.x * Math.PI) / 6;
    const targetY = (state.mouse.y * Math.PI) / 6;

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
  });

  return (
    <group ref={headRef}>
      {/* Robot Head Shape - More angular and menacing/modern */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1.8, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Face Visor */}
      <mesh position={[0, 0.2, 0.76]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshBasicMaterial color="#000" side={THREE.DoubleSide} />
      </mesh>
      
      {/* Glowing Eye Strip */}
      <mesh position={[0, 0.2, 0.77]}>
        <planeGeometry args={[1.1, 0.15]} />
        <meshBasicMaterial color="#00f0ff" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.2, 1]} color="#00f0ff" intensity={2} distance={3} />

      {/* Jaw / Chin */}
       <mesh position={[0, -0.6, 0.4]}>
        <boxGeometry args={[1.0, 0.6, 1.0]} />
         <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Antenna / Ear Sensors */}
       <mesh position={[0.8, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.6]} />
        <meshStandardMaterial color="#333" metalness={0.7} />
      </mesh>
       <mesh position={[-0.8, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.6]} />
        <meshStandardMaterial color="#333" metalness={0.7} />
      </mesh>
      
      {/* Neck Cables */}
      <group position={[0, -1.2, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.8]} />
            <meshStandardMaterial color="#111" metalness={0.5} />
          </mesh>
      </group>
    </group>
  );
}

export default function HeroScene() {
  const mouse = useRef(new THREE.Vector2());

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <Environment preset="city" />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} intensity={200} color="#fff" castShadow />
      <pointLight position={[-5, -5, 5]} intensity={100} color="#00f0ff" distance={10} />

      <group position={[2, 0, 0]} rotation={[0, -0.2, 0]}>
         <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <RobotHead mouse={mouse} />
         </Float>
      </group>
    </>
  );
}
