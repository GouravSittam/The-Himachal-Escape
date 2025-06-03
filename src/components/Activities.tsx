
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mountain, Users, Calendar, Star } from "lucide-react";

const Activities = () => {
  const activities = [
    {
      id: 1,
      name: "Trekking",
      description: "Explore scenic trails through valleys, forests, and high-altitude passes",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      difficulty: "Moderate",
      duration: "3-15 days",
      season: "Apr - Oct",
      popular: ["Hampta Pass", "Pin Parvati", "Triund"],
      price: "₹5,000 - ₹25,000"
    },
    {
      id: 2,
      name: "Paragliding",
      description: "Soar through the skies with breathtaking aerial views of valleys",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      difficulty: "Beginner",
      duration: "30 min - 2 hrs",
      season: "Mar - Jun",
      popular: ["Bir Billing", "Solang Valley", "Kasauli"],
      price: "₹2,500 - ₹8,000"
    },
    {
      id: 3,
      name: "River Rafting",
      description: "Navigate through thrilling rapids in pristine mountain rivers",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      difficulty: "Intermediate",
      duration: "2-6 hrs",
      season: "May - Sep",
      popular: ["Beas River", "Sutlej River", "Spiti River"],
      price: "₹1,500 - ₹5,000"
    },
    {
      id: 4,
      name: "Skiing",
      description: "Experience world-class skiing on pristine snow-covered slopes",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
      difficulty: "Advanced",
      duration: "Half/Full day",
      season: "Dec - Mar",
      popular: ["Solang Valley", "Kufri", "Narkanda"],
      price: "₹3,000 - ₹12,000"
    },
    {
      id: 5,
      name: "Rock Climbing",
      description: "Challenge yourself on natural rock faces and artificial walls",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      difficulty: "Intermediate",
      duration: "4-8 hrs",
      season: "Mar - Nov",
      popular: ["Manali", "Dharamshala", "Kasol"],
      price: "₹2,000 - ₹6,000"
    },
    {
      id: 6,
      name: "Mountain Biking",
      description: "Cycle through challenging terrain and scenic mountain paths",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      difficulty: "Moderate",
      duration: "3-8 hrs",
      season: "Apr - Oct",
      popular: ["Spiti Circuit", "Manali-Leh", "Shimla Hills"],
      price: "₹1,000 - ₹4,000"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "Beginner": "bg-green-100 text-green-800",
      "Moderate": "bg-yellow-100 text-yellow-800",
      "Intermediate": "bg-orange-100 text-orange-800",
      "Advanced": "bg-red-100 text-red-800"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-8">
      {/* Featured Activity */}
      <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="relative">
          <div
            className="h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${activities[0].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-8">
              <div className="max-w-2xl">
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  Featured Activity
                </Badge>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Himalayan Trekking
                </h3>
                <p className="text-xl text-white/90 mb-6 leading-relaxed">
                  Embark on legendary trails through some of the world's most spectacular mountain landscapes
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center text-white/90">
                    <Mountain className="h-5 w-5 mr-2" />
                    <span>15+ Epic Routes</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Expert Guides</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Star className="h-5 w-5 mr-2" />
                    <span>4.9/5 Rating</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-white/90 font-semibold px-8"
                >
                  Book Your Adventure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.slice(1).map((activity) => (
          <Card
            key={activity.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <div
                className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${activity.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge className={`${getDifficultyColor(activity.difficulty)} border-0`}>
                  {activity.difficulty}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-xl font-bold text-white mb-1">{activity.name}</h3>
                <p className="text-white/90 text-sm">{activity.duration}</p>
              </div>
            </div>

            <CardContent className="p-5">
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                {activity.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Season:</span>
                  <span className="font-medium text-slate-700">{activity.season}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Price:</span>
                  <span className="font-medium text-green-600">{activity.price}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">Popular spots:</p>
                <div className="flex flex-wrap gap-1">
                  {activity.popular.slice(0, 2).map((spot, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-slate-100 text-slate-600"
                    >
                      {spot}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                >
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Activities;
