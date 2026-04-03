// src/components/common/HeartCollector.jsx
import React from 'react';
import { useLoveStore } from '../../store/useLoveStore';
import { motion } from 'framer-motion';

const HeartCollector = () => {
  const { hearts } = useLoveStore();
  const totalNeeded = 5;
  const progress = (hearts / totalNeeded) * 100;

  return (
    <div className="fixed top-4 right-4 z-40 glass-effect rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
      <div className="flex items-center gap-1">
        <span className="text-red-500 animate-heartbeat">❤️</span>
        <span className="font-bold text-white">{hearts}/{totalNeeded}</span>
      </div>
      <div className="w-24 h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-pink-400 to-red-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default HeartCollector;