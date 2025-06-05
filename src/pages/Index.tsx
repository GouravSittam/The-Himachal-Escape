import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Camera, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Activities from "@/components/Activities";
import Culture from "@/components/Culture";
import Navigation from "@/components/Navigation";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const quickCardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "destinations", "activities", "culture"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Enhanced GSAP Scroll Animations
    gsap.fromTo(quickCardsRef.current?.children,
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quickCardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateY: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1.2
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-jakarta">
      <Navigation activeSection={activeSection} />
      
      <main className="relative">
        <section id="home">
          <Hero />
        </section>

        <motion.section
          id="destinations"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 sm:mb-8 leading-tight">
                Discover{" "}
                <span className="text-gradient-blue">Himachal Pradesh</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
                From the snow-capped peaks of the Himalayas to serene valleys dotted with ancient temples, 
                experience the magic of India's mountain paradise.
              </p>
            </motion.div>
            <Destinations />
          </div>
        </motion.section>

        <motion.section
          id="activities"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="py-24 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.05),transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 sm:mb-8">
                Adventures{" "}
                <span className="text-gradient">Await</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium px-4 sm:px-0">
                Embark on thrilling adventures amidst breathtaking landscapes
              </p>
            </motion.div>
            <Activities />
          </div>
        </motion.section>

        <motion.section
          id="culture"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/50 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.08),transparent_60%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 sm:mb-8">
                Rich Heritage &{" "}
                <span className="text-gradient-blue">Culture</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto font-medium px-4 sm:px-0">
                Immerse yourself in centuries-old traditions, vibrant festivals, and authentic Himachali cuisine
              </p>
            </motion.div>
            <Culture />
          </div>
        </motion.section>

        {/* Enhanced Quick Access Cards */}
        <section className="py-24 bg-gradient-to-br from-white to-slate-50/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent_70%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                Plan Your <span className="text-gradient">Journey</span>
              </h2>
            </motion.div>
            
            <motion.div
              ref={quickCardsRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto px-4 sm:px-6"
            >
              {[
                {
                  icon: Mountain,
                  title: "Plan Your Journey",
                  description: "Get personalized itineraries and travel guides crafted by local experts",
                  gradient: "from-blue-50 to-indigo-50",
                  buttonGradient: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
                  glowColor: "group-hover:shadow-blue-500/25"
                },
                {
                  icon: Camera,
                  title: "Photo Gallery",
                  description: "Explore stunning visuals capturing the raw beauty of Himachal",
                  gradient: "from-emerald-50 to-teal-50",
                  buttonGradient: "from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
                  glowColor: "group-hover:shadow-emerald-500/25"
                },
                {
                  icon: Heart,
                  title: "Travel Stories",
                  description: "Read inspiring experiences and hidden gems from fellow adventurers",
                  gradient: "from-purple-50 to-pink-50",
                  buttonGradient: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
                  glowColor: "group-hover:shadow-purple-500/25"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -20,
                    scale: 1.05,
                    rotateY: 10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="group"
                >
                  <Card className={`hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br ${card.gradient} overflow-hidden backdrop-blur-sm ${card.glowColor} hover-lift`}>
                    <CardContent className="p-10 text-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <motion.div
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 360,
                          transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
                        }}
                        className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${card.buttonGradient} rounded-2xl flex items-center justify-center shadow-lg relative z-10`}
                      >
                        <card.icon className="h-10 w-10 text-white" />
                      </motion.div>
                      
                      <h3 className="text-3xl font-bold text-slate-800 mb-6 relative z-10">{card.title}</h3>
                      <p className="text-slate-600 mb-8 text-lg leading-relaxed relative z-10">{card.description}</p>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10"
                      >
                        <Button className={`bg-gradient-to-r ${card.buttonGradient} text-white border-0 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}>
                          {index === 0 ? "Start Planning" : index === 1 ? "View Gallery" : "Read Stories"}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <motion.footer
          ref={footerRef}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-12"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="transition-transform duration-300"
              >
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Himachal Pradesh
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Discover the enchanting beauty of India's mountain paradise. 
                  Experience adventure, culture, and tranquility like never before.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: "facebook", color: "hover:text-blue-400" },
                    { icon: "instagram", color: "hover:text-pink-400" },
                    { icon: "twitter", color: "hover:text-sky-400" },
                    { icon: "youtube", color: "hover:text-red-400" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className={`text-slate-400 ${social.color} transition-colors duration-300`}
                    >
                      <i className={`fab fa-${social.icon} text-xl`}></i>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              
              {[
                {
                  title: "Popular Destinations",
                  items: [
                    { name: "Manali", description: "Adventure Capital" },
                    { name: "Shimla", description: "Queen of Hills" },
                    { name: "Dharamshala", description: "Little Lhasa" },
                    { name: "Spiti Valley", description: "Cold Desert" }
                  ]
                },
                {
                  title: "Adventure Activities",
                  items: [
                    { name: "Trekking", description: "Himalayan Trails" },
                    { name: "Paragliding", description: "Sky Adventures" },
                    { name: "Skiing", description: "Winter Sports" },
                    { name: "River Rafting", description: "Water Thrills" }
                  ]
                },
                {
                  title: "Contact Us",
                  items: [
                    { name: "Email", description: "info@himachaltourism.com" },
                    { name: "Phone", description: "+91 177 262 5320" },
                    { name: "Address", description: "Tourism Office, Shimla" },
                    { name: "Hours", description: "Mon-Sat: 9AM-6PM" }
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        whileHover={{ x: 5, color: "#60a5fa" }}
                        className="transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex flex-col">
                          <span className="text-slate-300 group-hover:text-blue-400 transition-colors duration-300">
                            {item.name}
                          </span>
                          <span className="text-sm text-slate-400 group-hover:text-blue-300 transition-colors duration-300">
                            {item.description}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="border-t border-slate-700 mt-16 pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-slate-400">&copy; 2025 The Himachal Escape. All rights reserved.</p>
                <div className="flex space-x-6">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    Privacy Policy
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    Terms of Service
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    Cookie Policy
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
