import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, RoundedBox, Cylinder, Torus, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface RobotModelProps {
  showDots?: boolean;
  isAvatar?: boolean;
}

const RobotModel: React.FC<RobotModelProps> = ({ showDots = true, isAvatar = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const dot1Ref = useRef<THREE.Mesh>(null);
  const dot2Ref = useRef<THREE.Mesh>(null);
  const dot3Ref = useRef<THREE.Mesh>(null);
  
  // Subtle rotation animation and floating parts
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 1.2) * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.1;
      groupRef.current.position.y = Math.sin(t * 2) * 0.05 + 0.2; // Lifted up slightly
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 1.5;
      ringRef1.current.rotation.y = t * 2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = t * -1.2;
      ringRef2.current.rotation.y = t * -1.8;
    }
    
    // Bouncing dots
    const bounceSpeed = t * 4;
    if (dot1Ref.current) dot1Ref.current.position.y = Math.sin(bounceSpeed) * 0.08;
    if (dot2Ref.current) dot2Ref.current.position.y = Math.sin(bounceSpeed - 0.5) * 0.08;
    if (dot3Ref.current) dot3Ref.current.position.y = Math.sin(bounceSpeed - 1.0) * 0.08;
  });

  return (
    <group>
      <group ref={groupRef}>
        {/* Head - Premium Metallic Blue */}
        <RoundedBox args={[1.8, 1.4, 1.4]} radius={0.3} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#2563eb" 
            metalness={0.7} 
            roughness={0.15} 
          />
        </RoundedBox>

        {/* Face Plate - Glassy Cyan Visor */}
        <RoundedBox args={[1.6, 1.0, 0.4]} radius={0.2} smoothness={4} position={[0, 0, 0.6]}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            clearcoat={1}
            color="#06b6d4"
          />
        </RoundedBox>

        {/* Eyes - Glowing White/Cyan inside the visor */}
        <Sphere args={[0.15, 24, 24]} position={[-0.35, 0.1, 0.7]}>
          <meshStandardMaterial color="#ffffff" emissive="#cffafe" emissiveIntensity={3} toneMapped={false} />
        </Sphere>
        <Sphere args={[0.15, 24, 24]} position={[0.35, 0.1, 0.7]}>
          <meshStandardMaterial color="#ffffff" emissive="#cffafe" emissiveIntensity={3} toneMapped={false} />
        </Sphere>

        {/* Cute Blush cheeks */}
        <Sphere args={[0.1, 16, 16]} position={[-0.55, -0.15, 0.72]}>
          <meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={1.5} toneMapped={false} />
        </Sphere>
        <Sphere args={[0.1, 16, 16]} position={[0.55, -0.15, 0.72]}>
          <meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={1.5} toneMapped={false} />
        </Sphere>

        {/* Antenna base - Silver Chrome */}
        <Cylinder args={[0.08, 0.12, 0.5, 24]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.1} />
        </Cylinder>
        
        {/* Floating Magic Rings around antenna */}
        <Torus ref={ringRef1} args={[0.3, 0.02, 16, 32]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} toneMapped={false} />
        </Torus>
        <Torus ref={ringRef2} args={[0.4, 0.015, 16, 32]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={2} toneMapped={false} />
        </Torus>

        {/* Antenna glowing core */}
        <Sphere args={[0.12, 24, 24]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} toneMapped={false} />
        </Sphere>

        {/* Ears - Silver Chrome */}
        <Cylinder args={[0.25, 0.25, 0.2, 32]} position={[-0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.1} />
        </Cylinder>
        <Cylinder args={[0.25, 0.25, 0.2, 32]} position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.1} />
        </Cylinder>
        
        {/* Ear glowing rings */}
        <Torus args={[0.15, 0.02, 16, 32]} position={[-1.06, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={2} toneMapped={false} />
        </Torus>
        <Torus args={[0.15, 0.02, 16, 32]} position={[1.06, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={2} toneMapped={false} />
        </Torus>
      </group>

      {/* 3D Thinking Dots Below the Robot */}
      {showDots && (
        <group position={[0, -1.3, 0]}>
          {/* Solid Pill Background */}
          <RoundedBox args={[1.5, 0.55, 0.2]} radius={0.27} smoothness={4} position={[0, 0, -0.1]}>
            <meshStandardMaterial color="#1e3a8a" roughness={0.4} metalness={0.3} />
          </RoundedBox>
          {/* Bouncing Glowing Dots */}
          <Sphere ref={dot1Ref} args={[0.12, 16, 16]} position={[-0.4, 0, 0.05]}>
            <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={2} toneMapped={false} />
          </Sphere>
          <Sphere ref={dot2Ref} args={[0.12, 16, 16]} position={[0, 0, 0.05]}>
            <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={2} toneMapped={false} />
          </Sphere>
          <Sphere ref={dot3Ref} args={[0.12, 16, 16]} position={[0.4, 0, 0.05]}>
            <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={2} toneMapped={false} />
          </Sphere>
        </group>
      )}
    </group>
  );
};

export const Robot3D: React.FC<{ showDots?: boolean; isAvatar?: boolean }> = ({ showDots = true, isAvatar = false }) => {
  return (
    <div className={`pointer-events-none flex items-center justify-center ${isAvatar ? 'w-full h-full' : 'w-[120%] h-[120%] -ml-[10%] -mt-[10%]'}`}>
      <Canvas camera={{ position: [0, isAvatar ? 0.2 : 0, isAvatar ? 3.8 : 5], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#60a5fa" />
        <pointLight position={[0, -2, 2]} intensity={1} color="#c084fc" />
        
        <Float speed={isAvatar ? 1.5 : 3} rotationIntensity={isAvatar ? 0.05 : 0.2} floatIntensity={isAvatar ? 0.2 : 1.2}>
          <RobotModel showDots={showDots && !isAvatar} isAvatar={isAvatar} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Robot3D;
