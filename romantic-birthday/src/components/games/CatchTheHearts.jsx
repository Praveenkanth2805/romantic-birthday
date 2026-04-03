// src/components/games/CatchTheHearts.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CatchTheHearts = () => {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const gameAreaRef = useRef(null);
  const animationRef = useRef();
  
  const targetScore = 10;
  
  useEffect(() => {
    if (!gameActive) return;
    
    const spawnHeart = () => {
      if (!gameAreaRef.current) return;
      const containerRect = gameAreaRef.current.getBoundingClientRect();
      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * (containerRect.width - 60) + 30,
        y: -30,
        speed: 2 + Math.random() * 3,
      };
      setHearts(prev => [...prev, newHeart]);
    };
    
    const interval = setInterval(spawnHeart, 800);
    return () => clearInterval(interval);
  }, [gameActive]);
  
  useEffect(() => {
    if (!gameActive) return;
    
    const updateHearts = () => {
      setHearts(prev => prev.map(heart => ({
        ...heart,
        y: heart.y + heart.speed
      })).filter(heart => {
        const containerRect = gameAreaRef.current?.getBoundingClientRect();
        return heart.y < (containerRect?.height || 400);
      }));
      
      animationRef.current = requestAnimationFrame(updateHearts);
    };
    
    animationRef.current = requestAnimationFrame(updateHearts);
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameActive]);
  
  const catchHeart = (id) => {
    if (!gameActive) return;
    setHearts(prev => prev.filter(heart => heart.id !== id));
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= targetScore) {
        setGameActive(false);
        setShowWin(true);
      }
      return newScore;
    });
  };
  
  const resetGame = () => {
    setHearts([]);
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
      
      <div
        ref={gameAreaRef}
        className="relative w-full h-[500px] bg-gradient-to-b from-purple-900/30 to-pink-900/30 rounded-xl overflow-hidden cursor-pointer"
        style={{ touchAction: 'none' }}
      >
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.button
              key={heart.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => catchHeart(heart.id)}
              className="absolute text-3xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: heart.x, top: heart.y }}
            >
              ❤️
            </motion.button>
          ))}
        </AnimatePresence>
        
        {showWin && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center glass-effect rounded-2xl p-8"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-white mb-2">You're a Heart Catcher!</h2>
              <p className="text-pink-200 mb-4">Your love caught all the hearts! 💖</p>
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white"
              >
                Play Again
              </button>
            </motion.div>
          </div>
        )}
        
        {gameActive && hearts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-pink-300">
            Catch falling hearts! Click/tap on them 💕
          </div>
        )}
      </div>
    </div>
  );
};

export default CatchTheHearts;