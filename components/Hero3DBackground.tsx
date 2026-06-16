import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

const DataGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate points on a sphere using Fibonacci lattice for even distribution
  const particlesCount = 1000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particlesCount);
      const theta = Math.sqrt(particlesCount * Math.PI) * phi;
      const radius = 2.0; // Globe radius
      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      // Gentle tilt
      groupRef.current.rotation.z = 0.2 + Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
      groupRef.current.rotation.x = 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particle Web Surface */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>

      {/* Inner Glowing Core */}
      <Sphere args={[1.9, 32, 32]}>
        <meshBasicMaterial 
          color="#1e3a8a" 
          transparent 
          opacity={0.08} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

    </group>
  );
};

export default function Hero3DBackground() {
  const [globeScale, setGlobeScale] = React.useState(0.9);

  React.useEffect(() => {
    const handleResize = () => {
      // If mobile (less than 768px), make it smaller
      if (window.innerWidth < 768) {
        setGlobeScale(0.65);
      } else {
        setGlobeScale(0.7); // Reduced from 0.9 to make it fit nicely behind the profile
      }
    };

    handleResize(); // Set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Abstract floating tech Data Globe */}
        <group position={[0, 0, 0]} scale={globeScale}>
          <DataGlobe />
        </group>

        {/* Sparkles removed as requested */}
        
      </Canvas>
    </div>
  );
}
