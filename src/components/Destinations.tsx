import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mountain, Camera, Star, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Destinations = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  const destinations = [
    {
      id: 1,
      name: "Manali",
      description: "A picturesque hill station nestled in the Pir Panjal and Dhauladhar ranges",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      category: "Hill Station",
      highlights: ["Hadimba Temple", "Solang Valley", "Rohtang Pass"],
      bestTime: "May - Oct",
      rating: 4.8
    },
    {
      id: 2,
      name: "Shimla",
      description: "The Queen of Hills, former British summer capital with colonial charm",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      category: "Capital City",
      highlights: ["Mall Road", "Christ Church", "Jakhu Temple"],
      bestTime: "Mar - Jun",
      rating: 4.6
    },
    
    {
      id: 3,
      name: "Dharamshala",
      description: "Spiritual haven and home to the Dalai Lama with Tibetan influence",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      category: "Spiritual",
      highlights: ["McLeod Ganj", "Namgyal Monastery", "Bhagsu Falls"],
      bestTime: "Mar - Jun",
      rating: 4.7
    },
    {
      id: 4,
      name: "Spiti Valley",
      description: "Cold desert mountain valley with ancient monasteries and stark beauty",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      category: "Adventure",
      highlights: ["Key Monastery", "Chandratal Lake", "Pin Valley"],
      bestTime: "Jun - Sep",
      rating: 4.9
    },
    {
      id: 5,
      name: "Kasol",
      description: "Mini Israel of India, known for its hippie culture and scenic beauty",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      category: "Backpacker",
      highlights: ["Parvati River", "Malana Village", "Kheerganga Trek"],
      bestTime: "Apr - Jun",
      rating: 4.5
    },
    {
      id: 6,
      name: "Kinnaur",
      description: "Land of fairytales with apple orchards and ancient traditions",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
      category: "Cultural",
      highlights: ["Kalpa", "Sangla Valley", "Chitkul"],
      bestTime: "Apr - Oct",
      rating: 4.7
    }
  ];

  useEffect(() => {
    // GSAP Scroll Animations
    gsap.fromTo(cardsRef.current?.children,
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotation: 5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Hill Station": "bg-blue-100 text-blue-800",
      "Capital City": "bg-purple-100 text-purple-800",
      "Spiritual": "bg-orange-100 text-orange-800",
      "Adventure": "bg-red-100 text-red-800",
      "Backpacker": "bg-green-100 text-green-800",
      "Cultural": "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      ref={cardsRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6"
    >
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          variants={cardVariants}
          whileHover={{ 
            y: -10,
            scale: 1.02,
            transition: { type: "spring", stiffness: 300 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-500 border-0 overflow-hidden bg-white cursor-pointer">
            <motion.div 
              className="relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="h-48 sm:h-56 md:h-64 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${destination.image})` }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="absolute top-3 sm:top-4 left-3 sm:left-4"
              >
                <Badge className={`${getCategoryColor(destination.category)} border-0 text-xs sm:text-sm`}>
                  {destination.category}
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1"
              >
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                <span className="text-white text-xs sm:text-sm font-semibold">{destination.rating}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{destination.name}</h3>
                <p className="text-white/90 text-xs sm:text-sm">Best time: {destination.bestTime}</p>
              </motion.div>
            </motion.div>

            <CardContent className="p-4 sm:p-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed"
              >
                {destination.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="mb-3 sm:mb-4"
              >
                <h4 className="font-semibold text-slate-800 text-sm sm:text-base mb-2 flex items-center">
                  <Compass className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-blue-500" />
                  Highlights
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {destination.highlights.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlightIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.6 + highlightIndex * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        {highlight}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.7 }}
                className="flex space-x-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
                    size="sm"
                  >
                    Explore
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Destinations;
