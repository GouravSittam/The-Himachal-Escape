import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Preparing your mountain adventure...",
  "Packing your virtual backpack...",
  "Summoning the Himalayan peaks...",
  "Warming up the valleys...",
  "Almost there!"
];

const mountainImage =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80";

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect for loading messages
  useEffect(() => {
    setTypedMessage("");
    let i = 0;
    function type() {
      setTypedMessage(loadingMessages[messageIndex].slice(0, i));
      if (i < loadingMessages[messageIndex].length) {
        typingTimeout.current = setTimeout(() => {
          i++;
          type();
        }, 30);
      }
    }
    type();
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [messageIndex]);

  // Progress and message cycling
  useEffect(() => {
    const timer = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });
    timer
      .to({}, {
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function() {
          const prog = Math.round(this.progress() * 100);
          setProgress(prog);
          if (prog > 0 && prog < 100 && prog % 25 === 0) {
            setMessageIndex((idx) => (idx + 1) % loadingMessages.length);
          }
        }
      })
      .to(".loading-screen", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    return () => {
      timer.kill();
    };
  }, [onComplete]);

  // Animated particles
  const particles = Array.from({ length: 18 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-blue-400/30"
      style={{
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -Math.random() * 80 - 40],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 8,
        repeat: Infinity,
        delay: Math.random() * 4,
        ease: "linear",
      }}
    />
  ));

  return (
    <motion.div 
      className="loading-screen fixed inset-0 z-50 flex items-center justify-center font-jakarta"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Mountain background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${mountainImage})`,
          filter: "brightness(0.7) saturate(1.1)",
        }}
      />
      {/* Gradient overlay for extra polish */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/80 via-[#312e81]/60 to-[#7c3aed]/70" />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {particles}
      </div>
      <div className="text-center relative z-10">
        {/* 3D Rotating Logo */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "backOut", delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow overflow-hidden">
            <img 
              src="/assets/logo.png" 
              alt="The Himachal Escape Logo" 
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 animate-ping" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
        >
          The Himachal Escape
        </motion.h1>

        {/* Typewriter loading message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-white/80 text-lg mb-8 min-h-[2.5rem] font-mono tracking-wide"
        >
          {typedMessage}
          <span className="animate-blink">|</span>
        </motion.p>

        {/* Dynamic progress bar */}
        <div className="w-64 mx-auto">
          <div className="bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm relative">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full relative animate-shimmer"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </motion.div>
            {/* Stripes overlay */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0_8px,transparent_8px_16px)] rounded-full pointer-events-none" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/60 text-sm mt-3"
          >
            {progress}%
          </motion.p>
        </div>
      </div>
      <style>{`
        .animate-blink { animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { to { opacity: 0; } }
        .animate-shimmer { background-size: 200% 100%; animation: shimmer 2s linear infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .animate-pulse-glow { animation: pulseGlow 2s infinite alternate; }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 #7c3aed33; } 100% { box-shadow: 0 0 40px 10px #7c3aed66; } }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;
