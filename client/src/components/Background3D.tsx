import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

function ParticleField(props: any) {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#d4af37" 
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingShape() {
    const mesh = useRef<THREE.Mesh>(null!);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.x = Math.cos(t / 4) / 2;
        mesh.current.rotation.y = Math.sin(t / 4) / 2;
        mesh.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} position={[2, 0, -2]} scale={0.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial 
                    color="#bf953f" 
                    wireframe 
                    transparent 
                    opacity={0.1}
                    emissive="#bf953f"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}


export function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-background">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <fog attach="fog" args={['#0a0a0a', 0.5, 3]} />
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingShape />
      </Canvas>
      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/90" />
    </div>
  );
}
