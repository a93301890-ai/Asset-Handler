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
        <cylinderGeometry args={[0.35, 0.4, 1.6, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.05} metalness={0.9} />
      </mesh>
      {/* Bottle Shoulder */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.05} metalness={0.9} />
      </mesh>
      {/* Bottle Neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.8, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.05} metalness={0.9} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 32]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={1} />
      </mesh>
      {/* Label */}
      <mesh position={[0, -0.1, 0.05]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.41, 0.7, 32, 1, true, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloatingMug({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.cos(state.clock.elapsedTime * 0.5 + position[0]) * 0.008;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Mug Body */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 1.4, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0.05} metalness={0.6} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.4, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0.05} metalness={0.6} />
      </mesh>
      {/* Beer Content */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.0, 32]} />
        <meshStandardMaterial color="#ffaa00" roughness={0.1} metalness={0.4} />
      </mesh>
      {/* Foam */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.62, 0.55, 0.4, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
    </group>
  );
}

function BackgroundElements() {
  const elements = useMemo(() => [
    { type: 'bottle', pos: [-5, 2, -2] as [number, number, number], rot: [0.2, 0.5, 0.1] as [number, number, number] },
    { type: 'bottle', pos: [5, -3, -1] as [number, number, number], rot: [-0.3, -0.2, -0.2] as [number, number, number] },
    { type: 'mug', pos: [-6, -4, -3] as [number, number, number] },
    { type: 'mug', pos: [6, 4, -3] as [number, number, number] },
    { type: 'bottle', pos: [0, 5, -5] as [number, number, number], rot: [0.1, 0, 0.5] as [number, number, number] },
    { type: 'bottle', pos: [-8, 0, -4] as [number, number, number], rot: [0.5, 0.3, 0] as [number, number, number] },
    { type: 'bottle', pos: [8, 0, -4] as [number, number, number], rot: [-0.5, -0.3, 0] as [number, number, number] },
    { type: 'mug', pos: [-2, 4, -6] as [number, number, number] },
    { type: 'mug', pos: [2, -4, -6] as [number, number, number] },
    { type: 'bottle', pos: [-3, -5, -2] as [number, number, number], rot: [0.1, 0.8, -0.4] as [number, number, number] },
    { type: 'bottle', pos: [3, 5, -2] as [number, number, number], rot: [-0.1, -0.8, 0.4] as [number, number, number] },
  ], []);

  return (
    <>
      {elements.map((el, i) => (
        el.type === 'bottle' 
          ? <BeerBottle key={i} position={el.pos} rotation={el.rot || [0,0,0]} scale={1.3} />
          : <FloatingMug key={i} position={el.pos} />
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#d4af37" />
      <pointLight position={[-10, -10, 10]} intensity={1.2} color="#ffffff" />
      <spotLight position={[0, 15, 5]} intensity={2} angle={0.4} penumbra={1} color="#d4af37" />
      <Stars radius={100} depth={50} count={4000} factor={5} saturation={0} fade speed={1.2} />
      <BackgroundElements />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, -8]}>
          <MeshDistortMaterial
            color="#d4af37"
            distort={0.4}
            speed={2}
            roughness={0.05}
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
      <Canvas dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}
