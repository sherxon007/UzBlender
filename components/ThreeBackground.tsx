
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const count = 300; // Reduced count for cleaner look
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 500; // Slower, calmer speed
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    
    mesh.current.rotation.y += 0.0002; // Very slow rotation
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} /> {/* Simple spheres instead of sharp dodecahedrons */}
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} /> {/* Soft Blue color */}
    </instancedMesh>
  );
};

export const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#0f172a]"> {/* Deep Slate Background */}
      <Canvas camera={{ position: [0, 0, 35], fov: 75 }}>
        <fog attach="fog" args={['#0f172a', 10, 90]} />
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-transparent to-[#1e293b]/50 pointer-events-none" />
    </div>
  );
};
