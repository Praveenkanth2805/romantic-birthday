import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    // Use absolute path from public folder
    const audio = new Audio('/romantic-birthday/music/bg.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';

    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
      console.log('Audio ready');
    });

    audio.addEventListener('error', (e) => {
      console.warn('Music file missing. Add bg.mp3 to public/music/');
      setAudioLoaded(false);
    });

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const startPlaying = async () => {
    if (!audioRef.current || !audioLoaded) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.log('Autoplay blocked – waiting for user gesture');
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current || !audioLoaded) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await startPlaying();
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  // Auto-start on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying && audioLoaded) startPlaying();
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, audioLoaded]);

  if (!audioLoaded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-400/50 backdrop-blur-md flex items-center justify-center">
        <span className="text-xl">🎵</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center"
      >
        <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center"
      >
        <span className="text-2xl">{isMuted ? '🔇' : '🔊'}</span>
      </motion.button>
    </div>
  );
};

export default MusicPlayer;