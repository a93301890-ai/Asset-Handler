import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Stars, Cylinder, Box } from "@react-three/drei";
import * as THREE from "three";

function BeerBottle({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Bottle Body */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.5, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.1} metalness={0.5} transparent opacity={0.9} />
      </mesh>
      {/* Bottle Neck */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.1} metalness={0.5} />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0.8, 0.01]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.31, 0.41, 0.6, 32]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingMug({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.cos(state.clock.elapsedTime * 0.5 + position[0]) * 0.003;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Mug Body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0.1} />
      </mesh>
      {/* Beer Content */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.9, 32]} />
        <meshStandardMaterial color="#ffcc00" roughness={0.2} />
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
  const bottles = useMemo(() => [
    { pos: [-4, 2, -5] as [number, number, number], rot: [0.2, 0.5, 0] as [number, number, number] },
    { pos: [5, -1, -3] as [number, number, number], rot: [-0.3, -0.2, 0.1] as [number, number, number] },
    { pos: [-6, -3, -8] as [number, number, number], rot: [0.5, 0.1, -0.2] as [number, number, number] },
    { pos: [7, 4, -6] as [number, number, number], rot: [0.1, -0.5, 0.3] as [number, number, number] },
  ], []);

  const mugs = useMemo(() => [
    { pos: [-8, 0, -10] as [number, number, number] },
    { pos: [8, 2, -12] as [number, number, number] },
  ], []);

  return (
    <>
      {bottles.map((b, i) => <BeerBottle key={i} position={b.pos} rotation={b.rot} scale={0.8} />)}
      {mugs.map((m, i) => <FloatingMug key={i} position={m.pos} />)}
    </>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <BackgroundElements />
      
      {/* Central Abstract Element */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, -2]}>
          <MeshDistortMaterial
            color="#d4af37"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>
    </>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}
