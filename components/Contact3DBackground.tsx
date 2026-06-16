import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ChevronArrow = ({ 
  position, 
  rotation, 
  direction,
  color = "#3b82f6",
  coreColor = "#1e3a8a"
}: { 
  position: [number, number, number], 
  rotation: [number, number, number], 
  direction: number,
  color?: string,
  coreColor?: string
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Create the 2D Chevron Shape
  const chevronGeo = useMemo(() => {
    const shape = new THREE.Shape();
    // A classic chevron '>' pointing right
    shape.moveTo(-0.5, 1.2);    // Top left tip
    shape.lineTo(1.2, 0);       // Far right tip
    shape.lineTo(-0.5, -1.2);   // Bottom left tip
    shape.lineTo(0.3, 0);       // Inner vertex
    shape.lineTo(-0.5, 1.2);    // Back to top

    const extrudeSettings = {
      depth: 1.5,
      steps: 10, // More steps = more points/density
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.2,
      bevelSegments: 6,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center the geometry
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const center = new THREE.Vector3();
    box.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);

    return geometry;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + direction) * 0.15;
      groupRef.current.position.x = position[0] + Math.cos(state.clock.getElapsedTime() * 1 + direction) * 0.05;
      
      // Slight rotation back and forth for a 3D floating feel
      groupRef.current.rotation.x = rotation[0] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
      groupRef.current.rotation.y = rotation[1] + Math.cos(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={groupRef} scale={1.8}>
      {/* Outer Point Shell (The "Data" look) */}
      <points geometry={chevronGeo}>
        <pointsMaterial
          transparent
          color={color}
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </points>

      {/* Inner Glowing Core - Increased opacity for chunkier feel */}
      <mesh geometry={chevronGeo}>
        <meshBasicMaterial 
          color={coreColor} 
          transparent 
          opacity={0.3} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Optional Wireframe for extra "tech" feel */}
      <mesh geometry={chevronGeo}>
        <meshBasicMaterial 
          color={color} 
          wireframe={true}
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default function Contact3DBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Left Arrow pointing right */}
        {/* The chevron shape inherently points RIGHT (+X) */}
        <group position={[-6, 0, -2]}>
          <ChevronArrow 
            position={[0, 0, 0]} 
            rotation={[0, Math.PI / 8, 0]} // Slight angle to show off 3D depth
            direction={1} 
          />
        </group>
        
        {/* Right Arrow pointing left */}
        {/* Rotate Y by 180deg (Math.PI) to point LEFT (-X) */}
        <group position={[6, 0, -2]}>
          <ChevronArrow 
            position={[0, 0, 0]} 
            rotation={[0, Math.PI - Math.PI / 8, 0]} // Slight angle mirroring the left
            direction={-1} 
          />
        </group>
        
      </Canvas>
    </div>
  );
}
