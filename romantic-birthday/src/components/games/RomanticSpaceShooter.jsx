// src/components/games/RomanticSpaceShooter.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';

const Player = ({ position, onShoot }) => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      // Smooth follow mouse/touch
      ref.current.position.x += (position.x - ref.current.position.x) * 0.1;
    }
  });
  
  return (
    <group ref={ref} position={[0, -3, 0]}>
      <mesh>
        <coneGeometry args={[0.5, 1, 8]} />
        <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.2, 0.2, 0.5]} />
        <meshStandardMaterial color="#ff3388" />
      </mesh>
    </group>
  );
};

const HeartBullet = ({ position, onHit }) => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.position.y += 0.1;
      if (ref.current.position.y > 5) {
        onHit(ref.current);
      }
    }
  });
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial color="#ff3366" emissive="#ff0066" />
    </mesh>
  );
};

const Enemy = ({ position, onHit }) => {
  const ref = useRef();
  const [hit, setHit] = useState(false);
  
  useFrame(() => {
    if (ref.current && !hit) {
      ref.current.position.y -= 0.02;
      ref.current.rotation.z += 0.05;
      if (ref.current.position.y < -4) {
        onHit(ref.current, false);
      }
    }
  });
  
  const handleHit = () => {
    if (!hit) {
      setHit(true);
      onHit(ref.current, true);
    }
  };
  
  return (
    <mesh ref={ref} position={position} onClick={handleHit}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color="#ff6699" />
    </mesh>
  );
};

const RomanticSpaceShooter = () => {
  const [playerX, setPlayerX] = useState(0);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showWin, setShowWin] = useState(false);
  
  const targetScore = 15;
  
  useEffect(() => {
    if (!gameActive) return;
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 8 - 4;
      setPlayerX(Math.max(-3.5, Math.min(3.5, x)));
    };
    
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth) * 8 - 4;
      setPlayerX(Math.max(-3.5, Math.min(3.5, x)));
    };
    
    const handleShoot = () => {
      if (!gameActive) return;
      setBullets(prev => [...prev, { id: Date.now(), x: playerX, y: -2.5 }]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('click', handleShoot);
    window.addEventListener('touchstart', handleShoot);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleShoot);
      window.removeEventListener('touchstart', handleShoot);
    };
  }, [playerX, gameActive]);
  
  useEffect(() => {
    if (!gameActive) return;
    
    const spawnEnemy = () => {
      const x = Math.random() * 6 - 3;
      setEnemies(prev => [...prev, { id: Date.now(), x, y: 4 }]);
    };
    
    const interval = setInterval(spawnEnemy, 1000);
    return () => clearInterval(interval);
  }, [gameActive]);
  
  const handleBulletHit = (bullet) => {
    setBullets(prev => prev.filter(b => b.id !== bullet.id));
    
    // Check collision with enemies
    setEnemies(prev => {
      const hitEnemy = prev.find(enemy => {
        return Math.abs(enemy.x - bullet.x) < 0.5 && Math.abs(enemy.y - bullet.y) < 0.5;
      });
      
      if (hitEnemy) {
        setScore(s => {
          const newScore = s + 1;
          if (newScore >= targetScore) {
            setGameActive(false);
            setShowWin(true);
          }
          return newScore;
        });
        return prev.filter(e => e.id !== hitEnemy.id);
      }
      return prev;
    });
  };
  
  const handleEnemyHit = (enemy, isHit) => {
    if (isHit) {
      setEnemies(prev => prev.filter(e => e.id !== enemy.id));
    } else {
      // Enemy reached bottom - game over
      setGameActive(false);
      setShowWin(false);
    }
  };
  
  const resetGame = () => {
    setBullets([]);
    setEnemies([]);
    setScore(0);
    setGameActive(true);
    setShowWin(false);
  };
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="text-2xl font-bold text-white">
          Score: {score}/{targetScore}
        </div>
        {!gameActive && (
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition"
          >
            Play Again 🔄
          </button>
        )}
      </div>
      
      <div className="w-full h-[500px] rounded-xl overflow-hidden relative bg-gradient-to-b from-purple-900 to-pink-900">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, -10, -10]} color="#ff69b4" />
          
          <Player position={{ x: playerX }} onShoot={() => {}} />
          
          {bullets.map(bullet => (
            <HeartBullet key={bullet.id} position={[bullet.x, bullet.y, 0]} onHit={handleBulletHit} />
          ))}
          
          {enemies.map(enemy => (
            <Enemy key={enemy.id} position={[enemy.x, enemy.y, 0]} onHit={handleEnemyHit} />
          ))}
          
          {/* Stars background */}
          {[...Array(100)].map((_, i) => (
            <Sphere key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -5]} scale={0.05}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
          ))}
        </Canvas>
        
        {showWin && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center glass-effect rounded-2xl p-8">
              <div className="text-6xl mb-4">🌟</div>
              <h2 className="text-3xl font-bold text-white mb-2">Victory in Space!</h2>
              <p className="text-pink-200 mb-4">Your love conquers all! 💖</p>
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {!gameActive && !showWin && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center glass-effect rounded-2xl p-8">
              <div className="text-6xl mb-4">💔</div>
              <h2 className="text-3xl font-bold text-white mb-2">Game Over</h2>
              <p className="text-pink-200 mb-4">Keep practicing your love!</p>
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center text-pink-200 text-sm mt-3">
        Move mouse/finger • Click/tap to shoot hearts 💕
      </div>
    </div>
  );
};

export default RomanticSpaceShooter;