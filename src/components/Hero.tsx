
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mountain, Compass, Star } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Majestic Mountains",
      subtitle: "Where Heaven Meets Earth"
    },
    {
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      title: "Pristine Valleys",
      subtitle: "Nature's Perfect Symphony"
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Mystical Landscapes",
      subtitle: "Adventure Beyond Imagination"
    }
  ];

  useEffect(() => {
    // GSAP animations on mount
    const tl = gsap.timeline();
    
    // Animate title with typing effect
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(featuresRef.current?.children,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Scroll-triggered animations
    gsap.fromTo(statsRef.current?.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate slide transitions
  useEffect(() => {
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );
  }, [currentSlide]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Background Slides with enhanced transitions */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: index === currentSlide ? 1 : 1.1,
            opacity: index === currentSlide ? 1 : 0 
          }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-white max-w-5xl mx-auto px-4"
        >
          {/* Main Title */}
          <div ref={titleRef} className="mb-8">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Himachal
              </span>
              <br />
              <span className="text-white">Pradesh</span>
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full"
            />
          </div>

          {/* Dynamic Subtitle */}
          <div ref={subtitleRef} className="mb-12 h-20 flex items-center justify-center">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-light opacity-90"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
          </div>

          {/* Key Features */}
          <motion.div
            ref={featuresRef}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Mountain, title: "Himalayan Peaks", desc: "Experience the world's most majestic mountain ranges" },
              { icon: Compass, title: "Adventure Sports", desc: "Thrilling activities for every adventure seeker" },
              { icon: Star, title: "Rich Culture", desc: "Immerse in centuries-old traditions and festivals" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300"
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Explore Destinations
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Watch Video
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto"
          >
            {[
              { number: "12", label: "Districts" },
              { number: "300+", label: "Destinations" },
              { number: "50+", label: "Adventures" },
              { number: "5M+", label: "Visitors" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, type: "spring", stiffness: 100 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/80 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 right-8 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
