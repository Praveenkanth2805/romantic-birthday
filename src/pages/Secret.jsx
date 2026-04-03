// src/pages/Secret.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Temporarily remove HeartCollector to isolate issue
// import HeartCollector from '../components/common/HeartCollector';
import { useLoveStore } from '../store/useLoveStore';

const Secret = () => {
  const { collectHeart, collectedHearts } = useLoveStore();
  const [showSurprise, setShowSurprise] = useState(false);
  const herName = import.meta.env.VITE_HER_NAME || 'My Love';
  
  useEffect(() => {
    const timer = setTimeout(() => setShowSurprise(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleCollectHeart = () => {
    if (!collectedHearts.includes('secret-heart')) {
      collectHeart('secret-heart');
    }
  };
  
  return (
    <div className="min-h-screen p-4 pb-24 relative overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-purple-100">
      {/* Temporarily remove HeartCollector */}
      
      <div className="max-w-3xl mx-auto mt-8">
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">🎁✨</div>
          <h1 className="text-4xl md:text-6xl font-cursive text-pink-800 mb-2">
            You Found the Secret!
          </h1>
          <p className="text-pink-700 text-lg">Congratulations, my love! 💖</p>
        </div>
        
        {showSurprise && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center space-y-6 shadow-xl">
            <div className="text-6xl animate-bounce">💝</div>
            
            <h2 className="text-3xl font-bold text-pink-800">
              A Special Message for You, {herName}
            </h2>
            
            <div className="space-y-4 text-pink-800 text-lg font-cursive">
              <p>
                You did it! You collected all the hearts, and that proves how special you are.
              </p>
              <p>
                Every heartbeat, every smile, every moment with you is a treasure I'll cherish forever.
              </p>
              <p>
                You are my sunshine, my moon, and all my stars. Thank you for being the most amazing person in my life.
              </p>
              <p className="text-2xl text-pink-600">
                I love you more than all the stars in the universe! 🌟
              </p>
            </div>
            
            <div className="pt-6">
              <div className="text-4xl space-x-2">
                <span className="inline-block animate-float">❤️</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.2s' }}>🧡</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.4s' }}>💛</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.6s' }}>💚</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.8s' }}>💙</span>
              </div>
            </div>
          </div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCollectHeart}
          className="fixed bottom-24 left-4 z-40 w-12 h-12 bg-white/40 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/60 transition-all shadow-lg"
        >
          <span className="text-2xl">💖</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Secret;