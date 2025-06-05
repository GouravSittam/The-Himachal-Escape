import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Enhanced GSAP animation for nav background
      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: scrolled 
            ? (isDarkMode 
              ? "rgba(17, 24, 39, 0.95)" 
              : "rgba(255, 255, 255, 0.95)")
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: scrolled 
            ? (isDarkMode
              ? "0 10px 30px rgba(0, 0, 0, 0.3)"
              : "0 10px 30px rgba(0, 0, 0, 0.1)")
            : "none",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Enhanced logo animation
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1,
          duration: 1.2, 
          ease: "back.out(1.7)", 
          delay: 0.2 
        }
      );
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 sm:h-20 navbar-height ${
          isDarkMode ? "text-white" : "text-slate-800"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              ref={logoRef}
              className="flex items-center space-x-2 sm:space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600"
              >
                <img 
                  src="/assets/logo.png" 
                  alt="The Himachal Escape Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <span className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                isScrolled 
                  ? isDarkMode 
                    ? "text-white" 
                    : "text-slate-800"
                  : "text-white"
              }`}>
                The Himachal Escape
              </span>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>

            {/* Desktop Navigation */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-6 lg:space-x-8"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? isScrolled
                        ? isDarkMode
                          ? "text-blue-400"
                          : "text-blue-600"
                        : "text-white"
                      : isScrolled
                      ? isDarkMode
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-slate-600 hover:text-blue-600"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled 
                          ? isDarkMode
                            ? "bg-blue-400"
                            : "bg-blue-600"
                          : "bg-white"
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
                      ? isDarkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-blue-400/10"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? isDarkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-blue-400/10"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
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
                      ? isDarkMode
                        ? "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      : "bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30"
                  }`}
                >
                  Plan Your Trip
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      activeSection === item.id
                        ? isDarkMode
                          ? "bg-blue-400/10 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-blue-400/10 hover:text-blue-400"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="flex items-center space-x-4 px-4 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`transition-colors duration-300 ${
                      isDarkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-blue-400/10"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`transition-colors duration-300 ${
                      isDarkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-blue-400/10"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {isDarkMode ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
