// src/components/entry/TypingIntro.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingIntro = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = `💖 For the most beautiful soul...\n\nEvery moment with you feels like a dream.\n\nToday, the stars align just for you... 💖`;
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Wait 2 seconds then complete
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText, onComplete]);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto text-center"
    >
      <div className="text-2xl md:text-3xl text-white font-cursive whitespace-pre-line">
        {displayText}
        {currentIndex < fullText.length && (
          <span className={`inline-block w-0.5 h-6 ml-1 bg-white ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
        )}
      </div>
    </motion.div>
  );
};

export default TypingIntro;