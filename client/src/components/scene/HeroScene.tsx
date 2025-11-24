import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars, Trail, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

function NetworkNode({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Connection({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) {
  return (
    <Line points={[start, end]} color={color} transparent opacity={0.2} lineWidth={1} />
  );
}

function DataSphere() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random nodes on a sphere surface
  const count = 40;
  const radius = 2.5;
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  // Create connections between close nodes
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.5) {
          lines.push({ start: nodes[i], end: nodes[j] });
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NetworkNode key={i} position={[node.x, node.y, node.z]} color="#fff" />
      ))}
      {connections.map((conn, i) => (
        <Connection key={i} start={[conn.start.x, conn.start.y, conn.start.z]} end={[conn.end.x, conn.end.y, conn.end.z]} color="#444" />
      ))}
      
      {/* Core Sphere for depth */}
      <mesh scale={[2.4, 2.4, 2.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={0.9} />
      </mesh>
      
      <mesh scale={[2.45, 2.45, 2.45]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#111" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function FloatingIcon({ position, iconType }: { position: [number, number, number], iconType: 'code' | 'app' | 'ai' }) {
    const meshRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if(meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2) * 0.002;
        }
    });

    return (
        <group ref={meshRef} position={position}>
             <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                {iconType === 'code' && (
                    <mesh>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshNormalMaterial wireframe />
                    </mesh>
                )}
                {iconType === 'app' && (
                     <mesh>
                        <capsuleGeometry args={[0.2, 0.6, 4, 8]} />
                        <meshStandardMaterial color="#333" wireframe />
                    </mesh>
                )}
                 {iconType === 'ai' && (
                     <mesh>
                        <icosahedronGeometry args={[0.4, 0]} />
                        <meshStandardMaterial color="#fff" wireframe />
                    </mesh>
                )}
             </Float>
        </group>
    )
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      
      {/* Central Intelligence Node */}
      <DataSphere />

      {/* Floating Tech Symbols */}
      <FloatingIcon position={[-3, 1, 2]} iconType="code" />
      <FloatingIcon position={[3, -1, 1]} iconType="ai" />
      <FloatingIcon position={[-2, -2, 0]} iconType="app" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#000', 8, 25]} />
    </>
  );
}
