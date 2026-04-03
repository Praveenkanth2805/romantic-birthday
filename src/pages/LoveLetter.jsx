import React from 'react';
import { motion } from 'framer-motion';
import HeartCollector from '../components/common/HeartCollector';
import { useLoveStore } from '../store/useLoveStore';

const LoveLetter = () => {
  const { collectHeart, collectedHearts } = useLoveStore();
  const herName = import.meta.env.VITE_HER_NAME || 'My Love';

  const handleCollectHeart = () => {
    if (!collectedHearts.includes('love-heart')) {
      collectHeart('love-heart');
    }
  };

  return (
    <div className="min-h-screen p-4 pb-24 relative">
      <HeartCollector />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mt-8"
      >
        {/* Envelope outer */}
        <div className="relative bg-amber-50 rounded-lg shadow-2xl overflow-hidden border-4 border-amber-700/30">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-amber-200/50 pointer-events-none" />
          <div className="absolute inset-0 opacity-10 bg-repeat bg-[url('data:image/svg+xml,%3Csvg...')]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #8b5a2b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          {/* Letter content */}
          <div className="relative p-8 md:p-12 font-cursive text-amber-900">
            {/* Decorative line top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />

            {/* Vintage stamp / seal */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-red-700 rounded-full flex items-center justify-center shadow-md border-2 border-amber-300">
              <span className="text-white text-xs font-bold rotate-12">LOVE</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-2">
              My Dearest {herName},
            </h1>

            <div className="h-0.5 w-24 bg-amber-600 mx-auto my-4" />

            <div className="space-y-5 text-lg leading-relaxed indent-8">
              <p>
                On this quiet evening, as I dip my pen into the inkwell of my heart, I find myself lost in thoughts of you. The world outside fades, and all I see is your smile – a light that guides me through the darkest nights.
              </p>
              <p>
                Do you remember the first time our eyes met? Time stood still, and in that moment, I knew the universe had written our names among the stars. Every laugh we've shared, every whisper in the dark, every silent glance – they are the pages of our beautiful story.
              </p>
              <p>
                You are the poetry I never knew I could write, the melody that plays softly in my soul. Your strength amazes me, your kindness humbles me, and your love – oh, your love – it has rebuilt my world into a garden of endless springs.
              </p>
              <p>
                I promise to cherish you, to stand by you through storms and sunshine, to hold your hand when the road gets rough, and to dance with you when joy fills the air. You are not just my love; you are my home.
              </p>
              <p className="text-right not-italic">
                With every beat of my heart,<br />
                <span className="text-2xl font-bold">Your Forever,</span><br />
                <span className="text-xl text-amber-700">Praveen 💖</span>
              </p>
            </div>

            {/* Wax seal at bottom */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-800 rounded-full border-2 border-amber-400 shadow-lg flex items-center justify-center">
              <span className="text-white text-xs">❤️</span>
            </div>
          </div>

          {/* Decorative bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />
        </div>

        {/* Hidden Heart Button */}
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

export default LoveLetter;