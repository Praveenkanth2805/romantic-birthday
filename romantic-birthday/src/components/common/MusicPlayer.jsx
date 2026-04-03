// src/components/common/MusicPlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio('/music/bg.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
      console.log('Audio loaded successfully');
    });
    
    audio.addEventListener('error', (e) => {
      console.warn('Audio file not found. Please add music to public/music/bg.mp3');
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

  // Handle mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Function to start playing (called after user interaction)
  const startPlaying = async () => {
    if (!audioRef.current || !audioLoaded) return;
    
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setHasInteracted(true);
    } catch (err) {
      console.log('Autoplay prevented, waiting for user interaction');
    }
  };

  // Handle play/pause toggle
  const togglePlay = async () => {
    if (!audioRef.current || !audioLoaded) {
      console.warn('Audio not ready');
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Play failed:', err);
      }
    }
    setHasInteracted(true);
  };

  // Handle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setHasInteracted(true);
  };

  // Auto-start after first user interaction anywhere on page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioLoaded) {
        startPlaying();
      }
    };
    
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted, audioLoaded]);

  // Show button only when audio is ready
  if (!audioLoaded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-400/50 backdrop-blur-md flex items-center justify-center">
        <span className="text-xl">🎵</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2">
      {/* Play/Pause Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white/50 transition-all"
      >
        <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
      </motion.button>
      
      {/* Mute/Unmute Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white/50 transition-all"
      >
        <span className="text-2xl">{isMuted ? '🔇' : '🔊'}</span>
      </motion.button>
    </div>
  );
};

export default MusicPlayer;