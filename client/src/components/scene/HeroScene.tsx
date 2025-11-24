import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars, Sparkles, TorusKnot, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="black"
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function MainObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#111"
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
        <lineSegments>
          <wireframeGeometry args={[new THREE.TorusKnotGeometry(1, 0.3, 128, 16)]} />
          <lineBasicMaterial color="white" opacity={0.1} transparent />
        </lineSegments>
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      <spotLight position={[-10, -10, 10]} angle={0.15} penumbra={1} intensity={1} color="#fff" />

      <MainObject />

      <FloatingShape position={[-4, 2, -2]} color="#333" />
      <FloatingShape position={[-3, -3, 0]} color="#444" />
      <FloatingShape position={[5, 3, -5]} color="#222" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#fff" />
      
      <fog attach="fog" args={['#000', 5, 20]} />
    </>
  );
}
