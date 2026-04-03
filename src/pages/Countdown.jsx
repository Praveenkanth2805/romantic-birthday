// src/pages/Countdown.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeartCollector from '../components/common/HeartCollector';
import { useLoveStore } from '../store/useLoveStore';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isBirthday, setIsBirthday] = useState(false);
  const { collectHeart, collectedHearts } = useLoveStore();
  
  const birthday = new Date(import.meta.env.VITE_BIRTHDAY || '2026-04-11');
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = birthday - now;
      
      if (difference <= 0) {
        setIsBirthday(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        
        // Trigger confetti
        if (typeof window.confetti === 'function') {
          window.confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
        } else {
          // Simple confetti simulation using setInterval
          let count = 0;
          const confettiInterval = setInterval(() => {
            if (count >= 5) clearInterval(confettiInterval);
            createConfetti();
            count++;
          }, 300);
        }
      } else {
        setIsBirthday(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (86400000)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (3600000)) / (1000 * 60)),
          seconds: Math.floor((difference % (60000)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [birthday]);
  
  const handleCollectHeart = () => {
    if (!collectedHearts.includes('countdown-heart')) {
      collectHeart('countdown-heart');
    }
  };
  
  const createConfetti = () => {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff3388'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      document.body.appendChild(confetti);
      
      const animation = confetti.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.2, 0.9, 0.4, 1)'
      });
      
      animation.onfinish = () => confetti.remove();
    }
  };
  
  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];
  
  return (
    <div className="min-h-screen p-4 pb-24">
      <HeartCollector />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <div className="text-center mb-8">
          {!isBirthday ? (
            <>
              <h1 className="text-4xl md:text-5xl font-cursive text-pink-800 mb-2">
                Countdown to Your Special Day 🎂
              </h1>
              <p className="text-pink-700 text-lg">Every second brings us closer to celebrating YOU!</p>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-cursive text-pink-800 mb-2 animate-bounce">
                🎉 HAPPY BIRTHDAY! 🎉
              </h1>
              <p className="text-2xl text-pink-700">Today is all about you, my love! 💖</p>
            </motion.div>
          )}
        </div>
        
        {!isBirthday ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl"
              >
                <div className="text-4xl md:text-6xl font-bold text-pink-800 mb-2">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-pink-700 text-sm md:text-base">{unit.label}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl"
          >
            <div className="text-8xl mb-4">🎂🎈🎁</div>
            <p className="text-2xl text-pink-800 font-cursive mb-4">
              The most wonderful day has arrived!
            </p>
            <p className="text-lg text-pink-700">
              You deserve all the happiness in the world. Let's celebrate! 💕
            </p>
            <button
              onClick={() => window.location.href = '/secret'}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition"
            >
              Open Your Surprise 🎁
            </button>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md"
        >
          <p className="text-pink-800 text-lg font-cursive">
            {!isBirthday 
              ? "The best things in life are worth waiting for... you, my love, are the best thing ever." 
              : "Today we celebrate the amazing person you are. I love you!"}
          </p>
        </motion.div>
        
        {/* Hidden Heart */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCollectHeart}
          className="fixed bottom-24 left-4 z-40 w-12 h-12 bg-white/40 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/60 transition-all shadow-lg"
        >
          <span className="text-2xl">💖</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Countdown;