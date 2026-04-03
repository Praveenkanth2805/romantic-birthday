// src/components/three/SpaceScene.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const RotatingRing = () => {
  const ringRef = useRef();
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.005;
      ringRef.current.rotation.x += 0.003;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2, 0.1, 64, 200]} />
      <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.5} />
    </mesh>
  );
};

const FloatingHearts3D = () => {
  const heartsRef = useRef([]);
  
  const hearts = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 30; i++) {
      positions.push({
        position: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 8 - 2],
        scale: 0.1 + Math.random() * 0.15,
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    heartsRef.current.forEach((heart, idx) => {
      if (heart) {
        heart.rotation.y += 0.02;
        heart.rotation.x = Math.sin(state.clock.elapsedTime + idx) * 0.2;
      }
    });
  });

  return (
    <>
      {hearts.map((heart, i) => (
        <mesh
          key={i}
          ref={(el) => (heartsRef.current[i] = el)}
          position={heart.position}
          scale={heart.scale}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ff6b9d" emissive="#ff3388" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </>
  );
};

const SpaceScene = () => {
  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff69b4" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={10} size={0.5} speed={0.3} color="#ff69b4" />
        <RotatingRing />
        <FloatingHearts3D />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default SpaceScene;