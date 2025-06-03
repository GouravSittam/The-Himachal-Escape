
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 bg-white/20 rounded-full";
      
      // Random initial position
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
      });

      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Animate particles
      gsap.to(particle, {
        y: "-=100vh",
        duration: Math.random() * 20 + 10,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 5,
      });

      // Floating animation
      gsap.to(particle, {
        x: `+=${Math.random() * 100 - 50}`,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Opacity animation
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    return () => {
      particles.forEach(particle => {
        particle.remove();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
};

export default ParticleBackground;
