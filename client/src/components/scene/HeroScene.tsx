import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Reduced geometry complexity for better performance
function RobotHead({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const headRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!headRef.current) return;
    // Throttled interpolation for smoother performance
    const targetX = (state.mouse.x * Math.PI) / 8;
    const targetY = (state.mouse.y * Math.PI) / 8;
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.05);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={headRef}>
      {/* Simplified Geometry - Main Head */}
      <mesh>
        <boxGeometry args={[1.2, 1.4, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Visor - Single simple mesh */}
      <mesh position={[0, 0.1, 0.61]}>
        <planeGeometry args={[1.1, 0.4]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      
      {/* Eye Strip - Simple glowing plane */}
      <mesh position={[0, 0.1, 0.62]}>
        <planeGeometry args={[1.0, 0.1]} />
        <meshBasicMaterial color="#00f0ff" toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const mouse = useRef(new THREE.Vector2());

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      {/* Use lower resolution environment map */}
      <Environment preset="city" resolution={256} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, 5]} intensity={2} color="#00f0ff" distance={10} />

      <group position={[2, 0, 0]} rotation={[0, -0.2, 0]}>
         <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <RobotHead mouse={mouse} />
         </Float>
      </group>
    </>
  );
}
