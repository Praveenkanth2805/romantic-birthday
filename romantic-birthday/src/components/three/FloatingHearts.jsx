import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const FloatingHeart = ({ position, color }) => {
  const meshRef = useRef();
  const time = useRef(Math.random() * Math.PI * 2);

  useFrame(() => {
    if (meshRef.current) {
      time.current += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(time.current) * 0.3;
      meshRef.current.rotation.z = Math.sin(time.current * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
};

const HeartsField = () => {
  const hearts = useMemo(() => {
    const positions = [];
    const colors = ['#ff6b9d', '#ff3388', '#ff99cc', '#ff4d6d'];
    for (let i = 0; i < 60; i++) {
      positions.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 15 - 5],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return positions;
  }, []);

  return (
    <>
      {hearts.map((heart, i) => (
        <FloatingHeart key={i} position={heart.position} color={heart.color} />
      ))}
    </>
  );
};

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={50} depth={50} count={1000} factor={4} fade speed={0.5} />
        <Sparkles count={200} scale={8} size={0.3} speed={0.4} color="#ff69b4" />
        <HeartsField />
      </Canvas>
    </div>
  );
};

export default FloatingHearts;