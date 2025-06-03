import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // GSAP animation for nav background
      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: scrolled ? "0 10px 30px rgba(0, 0, 0, 0.1)" : "none",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Logo animation on mount
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)", delay: 0.2 }
      );
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      
      // Smooth scroll with GSAP
      gsap.to(window, {
        scrollTo: { y: offsetTop, autoKill: false },
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "destinations", label: "Destinations" },
    { id: "activities", label: "Activities" },
    { id: "culture", label: "Culture" },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              ref={logoRef}
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden"
              >
                <img 
                  src="/assets/logo.png" 
                  alt="The Himachal Escape Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-slate-800" : "text-white"
              }`}>
                The Himachal Escape
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-8"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? isScrolled
                        ? "text-blue-600"
                        : "text-white"
                      : isScrolled
                      ? "text-slate-600 hover:text-blue-600"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled ? "bg-blue-600" : "bg-white"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-4"
            >
              <motion.div variants={itemVariants}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      : "bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30"
                  }`}
                >
                  Plan Your Trip
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className={`w-6 h-6 ${isScrolled ? "text-slate-800" : "text-white"}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className={`w-6 h-6 ${isScrolled ? "text-slate-800" : "text-white"}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-20 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl md:hidden overflow-hidden"
            >
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                className="py-4"
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ x: 10, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full px-6 py-4 text-left font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div variants={itemVariants} className="px-6 py-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Plan Your Trip
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
