// src/pages/EntryPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TypingIntro from '../components/entry/TypingIntro';
import GiftBox from '../components/entry/GiftBox';
import { useLoveStore } from '../store/useLoveStore';

const EntryPage = () => {
  const navigate = useNavigate();
  const [showTyping, setShowTyping] = useState(true);
  const [showGift, setShowGift] = useState(false);
  const { collectHeart } = useLoveStore();

  const handleTypingComplete = () => {
    setShowTyping(false);
    setShowGift(true);
  };

  const handleGiftOpen = () => {
    // Collect first heart from the gift
    collectHeart('entry-gift-heart');
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full"
      >
        <AnimatePresence mode="wait">
          {showTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TypingIntro onComplete={handleTypingComplete} />
            </motion.div>
          )}
          
          {showGift && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <GiftBox onOpen={handleGiftOpen} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-white text-lg font-cursive"
              >
                A special surprise awaits you... 💝
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EntryPage;