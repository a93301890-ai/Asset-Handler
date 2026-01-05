import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Stars, Cylinder } from "@react-three/drei";
import * as THREE from "three";

function BeerPourAnimation() {
  const glassRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const streamRef = useRef<THREE.Mesh>(null);
  const tapRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cycle = (t % 8) / 8; // 8 second loop

    if (liquidRef.current) {
      // Filling logic
      if (cycle < 0.1) {
        liquidRef.current.scale.y = 0.01;
        liquidRef.current.position.y = -0.55;
      } else if (cycle < 0.7) {
        const progress = (cycle - 0.1) / 0.6;
        liquidRef.current.scale.y = progress;
        liquidRef.current.position.y = -0.6 + (progress * 0.6);
      } else {
        liquidRef.current.scale.y = 1;
        liquidRef.current.position.y = 0;
      }
    }

    if (streamRef.current) {
      // Stream logic
      if (cycle > 0.1 && cycle < 0.7) {
        streamRef.current.visible = true;
        streamRef.current.scale.y = 1;
      } else {
        streamRef.current.visible = false;
      }
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Beer Tap */}
      <group position={[0, 4, 0]} ref={tapRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.5, 0.4]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
          <meshStandardMaterial color="#555" metalness={1} roughness={0} />
        </mesh>
      </group>

      {/* Beer Stream */}
      <mesh ref={streamRef} position={[0, 1.5, 0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 5, 16]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.5} />
      </mesh>

      {/* Beer Glass */}
      <group ref={glassRef}>
        {/* Glass Body */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.5, 1.5, 32]} />
          <meshStandardMaterial color="#fff" transparent opacity={0.2} roughness={0} metalness={0.5} />
        </mesh>
        
        {/* Beer Liquid */}
        <mesh ref={liquidRef} position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.58, 0.48, 1.4, 32]} />
          <meshStandardMaterial color="#ffaa00" roughness={0.1} metalness={0.3} />
        </mesh>

        {/* Foam Top */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.62, 0.58, 0.2, 32]} />
          <meshStandardMaterial color="#fff" roughness={1} />
        </mesh>
      </group>
    </group>
  );
}

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
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 1.6, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.05} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.05} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.8, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.05} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 32]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={1} />
      </mesh>
      <mesh position={[0, -0.1, 0.05]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.41, 0.7, 32, 1, true, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function BackgroundElements() {
  const elements = useMemo(() => [
    { type: 'bottle', pos: [-7, 3, -5] as [number, number, number], rot: [0.2, 0.5, 0.1] as [number, number, number] },
    { type: 'bottle', pos: [7, -3, -4] as [number, number, number], rot: [-0.3, -0.2, -0.2] as [number, number, number] },
    { type: 'bottle', pos: [-8, -2, -6] as [number, number, number], rot: [0.5, 0.3, 0] as [number, number, number] },
    { type: 'bottle', pos: [8, 4, -5] as [number, number, number], rot: [-0.5, -0.3, 0] as [number, number, number] },
  ], []);

  return (
    <>
      {elements.map((el, i) => (
        <BeerBottle key={i} position={el.pos} rotation={el.rot || [0,0,0]} scale={1.2} />
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
      <BeerPourAnimation />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, -10]}>
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
