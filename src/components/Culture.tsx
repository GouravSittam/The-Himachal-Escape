
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Utensils, Heart, Star } from "lucide-react";

const Culture = () => {
  const festivals = [
    {
      name: "Kullu Dussehra",
      date: "October",
      description: "International festival celebrating the victory of good over evil",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    },
    {
      name: "Himachal Day",
      date: "April 15",
      description: "Celebrating the formation of Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    },
    {
      name: "Losar Festival",
      date: "February/March",
      description: "Tibetan New Year celebrated in Spiti and Lahaul",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
    }
  ];

  const cuisine = [
    {
      name: "Dham",
      description: "Traditional feast served on special occasions",
      type: "Main Course",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    },
    {
      name: "Siddu",
      description: "Steamed bread stuffed with poppy seeds or walnuts",
      type: "Bread",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
    },
    {
      name: "Madra",
      description: "Chickpeas or kidney beans cooked in yogurt-based curry",
      type: "Curry",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      name: "Chana Madra",
      description: "Chickpeas in creamy yogurt gravy with aromatic spices",
      type: "Main Course",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
    }
  ];

  const heritage = [
    {
      name: "Hadimba Temple",
      location: "Manali",
      period: "1553 AD",
      description: "Ancient wooden temple dedicated to Hadimba Devi"
    },
    {
      name: "Christ Church",
      location: "Shimla",
      period: "1857 AD",
      description: "Gothic Revival architecture from British era"
    },
    {
      name: "Tashijong Monastery",
      location: "Dharamshala",
      period: "1969 AD",
      description: "Tibetan Buddhist monastery and nunnery"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Festivals Section */}
      <div>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-3xl font-bold text-slate-800">Vibrant Festivals</h3>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the colorful celebrations that bring communities together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {festivals.map((festival, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${festival.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-xl font-bold mb-1">{festival.name}</h4>
                  <p className="text-purple-100 text-sm">{festival.date}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-slate-600 mb-4">{festival.description}</p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cuisine Section */}
      <div>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Utensils className="h-8 w-8 text-orange-600 mr-3" />
            <h3 className="text-3xl font-bold text-slate-800">Authentic Cuisine</h3>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Savor the rich flavors of traditional Himachali dishes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cuisine.map((dish, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <div
                  className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${dish.image})` }}
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-orange-100 text-orange-800 border-0">
                    {dish.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-bold text-slate-800 mb-2">{dish.name}</h4>
                <p className="text-slate-600 text-sm">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Heritage Section */}
      <div>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-red-600 mr-3" />
            <h3 className="text-3xl font-bold text-slate-800">Heritage Sites</h3>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover architectural marvels and spiritual sanctuaries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {heritage.map((site, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-red-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-slate-800">{site.name}</h4>
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    {site.period}
                  </Badge>
                </div>
                <p className="text-slate-600 mb-3">{site.description}</p>
                <div className="flex items-center text-sm text-slate-500">
                  <Star className="h-4 w-4 mr-1 text-red-500" />
                  <span>{site.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cultural Experience CTA */}
      <Card className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-0 overflow-hidden">
        <CardContent className="p-12 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Immerse in Himachali Culture
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join local families, participate in traditional festivals, and learn authentic cooking techniques 
            in our cultural immersion programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-8"
            >
              Cultural Programs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Cooking Classes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Culture;
