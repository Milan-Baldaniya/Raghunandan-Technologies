import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera, useCubeTexture, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function CyberEye({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const eyeGroup = useRef<THREE.Group>(null);
  const pupilRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!eyeGroup.current || !pupilRef.current) return;

    // Smooth tracking
    const targetX = (state.mouse.x * Math.PI) / 6;
    const targetY = (state.mouse.y * Math.PI) / 6;

    eyeGroup.current.rotation.y = THREE.MathUtils.lerp(eyeGroup.current.rotation.y, targetX, 0.1);
    eyeGroup.current.rotation.x = THREE.MathUtils.lerp(eyeGroup.current.rotation.x, -targetY, 0.1);
    
    // Pupil dilation breathing
    pupilRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1);
  });

  return (
    <group ref={eyeGroup}>
      {/* Outer Shell - Glassy/Metallic */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial 
            color="#111" 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Iris Ring (Glowing) */}
      <mesh position={[0, 0, 1.35]}>
        <ringGeometry args={[0.4, 0.8, 64]} />
        <meshBasicMaterial color="#00f0ff" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Iris Detail (Wireframe) */}
       <mesh position={[0, 0, 1.36]} rotation={[0, 0, Math.PI/4]}>
        <ringGeometry args={[0.45, 0.75, 16]} />
        <meshBasicMaterial color="#fff" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Pupil (Black Void) */}
      <mesh ref={pupilRef} position={[0, 0, 1.4]}>
        <circleGeometry args={[0.35, 64]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      
      {/* Mechanical Housing / Socket */}
      <group position={[0, 0, -0.5]}>
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[1.6, 1.6, 1, 32, 4, true]} />
            <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
          </mesh>
          
          {/* Wires/Details */}
          {Array.from({ length: 8 }).map((_, i) => (
              <mesh key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]} position={[1.7 * Math.cos((i/8)*Math.PI*2), 1.7 * Math.sin((i/8)*Math.PI*2), 0]}>
                  <boxGeometry args={[0.2, 0.5, 2]} />
                  <meshStandardMaterial color="#333" metalness={0.6} />
              </mesh>
          ))}
      </group>
    </group>
  );
}

function Particles() {
    const count = 200;
    const mesh = useRef<THREE.InstancedMesh>(null);
    
    useFrame((state) => {
        if(!mesh.current) return;
        const time = state.clock.getElapsedTime();
        const dummy = new THREE.Object3D();
        
        for(let i=0; i<count; i++) {
            const t = (i/count) * Math.PI * 2;
            const x = Math.cos(t + time * 0.1) * 4 + Math.sin(time * 0.5 + i) * 0.5;
            const y = Math.sin(t + time * 0.1) * 4 + Math.cos(time * 0.3 + i) * 0.5;
            const z = Math.sin(time * 0.2 + i * 0.1) * 2 - 2;
            
            dummy.position.set(x, y, z);
            dummy.scale.setScalar(0.02 + Math.sin(time + i) * 0.01);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
        </instancedMesh>
    )
}

export default function HeroScene() {
  const mouse = useRef(new THREE.Vector2());

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <Environment preset="city" />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#fff" />
      <pointLight position={[-5, -5, 5]} intensity={5} color="#00f0ff" distance={10} />

      <group position={[2, 0, 0]}>
         <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <CyberEye mouse={mouse} />
         </Float>
      </group>
      
      <Particles />
    </>
  );
}
