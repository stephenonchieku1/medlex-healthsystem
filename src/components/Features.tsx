
import { CircleCheck, Heart, Clock, Globe, Brain, Zap, Microchip, AtomIcon } from "lucide-react";
import React from "react";

const Features = () => {
  const features = [
    {
      name: "Neural Processing",
      description: "Advanced AI algorithms process medical data with unprecedented speed and accuracy.",
      icon: Brain,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      name: "24/7 Availability",
      description: "Access healthcare support anytime, anywhere with our always-on AI assistant.",
      icon: Clock,
      gradient: "from-sky-500 to-cyan-400",
    },
    {
      name: "Accurate Insights",
      description: "Get precise medical information backed by the latest research and clinical data.",
      icon: CircleCheck,
      gradient: "from-green-500 to-emerald-400",
    },
    {
      name: "Personalized Care",
      description: "Receive tailored health recommendations based on your unique medical profile.",
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div id="features" className="py-28 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
      <div className="absolute opacity-30 -top-40 -right-40 h-80 w-80 rounded-full bg-sky-600/30 blur-[100px]"></div>
      <div className="absolute opacity-20 -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-600/30 blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-300 text-xs tracking-wider uppercase font-medium">
              <Zap className="h-4 w-4 mr-1.5" />
              Features
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Healthcare Made <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Smarter</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Experience the power of AI in healthcare with our comprehensive suite of cutting-edge features.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="group relative">
                <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:border-sky-500/30 hover:shadow-sky-500/10">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10`}></div>
                  <span className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </span>
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-4 text-base text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
