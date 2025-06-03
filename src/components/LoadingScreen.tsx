import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    timer
      .to({}, {
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        }
      })
      .to(".loading-screen", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });

    return () => {
      timer.kill();
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="loading-screen fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center font-jakarta"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: "backOut",
            delay: 0.2 
          }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse-glow overflow-hidden">
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
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          The Himachal Escape
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-white/80 text-lg mb-8"
        >
          Preparing your mountain adventure...
        </motion.p>

        <div className="w-64 mx-auto">
          <div className="bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer" />
            </motion.div>
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
    </motion.div>
  );
};

export default LoadingScreen;
