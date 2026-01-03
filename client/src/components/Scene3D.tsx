import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

function BeerBottle({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Bottle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.5, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Bottle Neck */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.31, 0.41, 0.6, 32]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function FloatingMug({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.cos(state.clock.elapsedTime * 0.5 + position[0]) * 0.008;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Mug Body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.4} roughness={0.1} metalness={0.5} />
      </mesh>
      {/* Beer Content */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.9, 32]} />
        <meshStandardMaterial color="#ffcc00" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Foam */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.52, 0.45, 0.3, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
    </group>
  );
}

function BackgroundElements() {
  const elements = useMemo(() => [
    { type: 'bottle', pos: [-3, 1, 0] as [number, number, number], rot: [0.2, 0.5, 0] as [number, number, number] },
    { type: 'bottle', pos: [3, -2, 0] as [number, number, number], rot: [-0.3, -0.2, 0.1] as [number, number, number] },
    { type: 'mug', pos: [-4, -3, -2] as [number, number, number] },
    { type: 'mug', pos: [4, 3, -2] as [number, number, number] },
    { type: 'bottle', pos: [0, 4, -4] as [number, number, number], rot: [0, 0, 0.5] as [number, number, number] },
    { type: 'bottle', pos: [-6, 0, -3] as [number, number, number], rot: [0.5, 0, 0] as [number, number, number] },
  ], []);

  return (
    <>
      {elements.map((el, i) => (
        el.type === 'bottle' 
          ? <BeerBottle key={i} position={el.pos} rotation={el.rot || [0,0,0]} scale={1.2} />
          : <FloatingMug key={i} position={el.pos} />
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#d4af37" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#ffffff" />
      <spotLight position={[0, 10, 0]} intensity={1.5} angle={0.3} penumbra={1} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <BackgroundElements />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.2, 64, 64]} position={[0, 0, -5]}>
          <MeshDistortMaterial
            color="#d4af37"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={1}
          />
        </Sphere>
      </Float>
    </>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
