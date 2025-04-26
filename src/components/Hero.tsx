
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 pt-24">
      <div className="absolute inset-0 z-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-[120px]"></div>
        <div className="absolute -bottom-[40%] left-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative z-10 pb-16 sm:pb-20 md:pb-28 lg:pb-36 xl:pb-44">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 md:mt-24 lg:mt-28 lg:px-8 xl:mt-32">
            <div className="sm:text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4 space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-600/20 text-sky-300 text-xs tracking-wider uppercase font-medium">
                  <Brain className="h-4 w-4 mr-1.5" />
                  AI-Powered Healthcare
                </span>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Revolutionary</span>
                <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Healthcare AI Assistant
                </span>
              </h1>
              <p className="mt-4 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Experience the future of healthcare with MedLex AI. Get instant medical insights, personalized care recommendations, and 24/7 support from our advanced AI assistant.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                <Button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base rounded-xl font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-600/30 transition-all duration-200">
                  Try MedLex AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base rounded-xl font-medium bg-transparent border-2 border-sky-500/30 text-sky-300 hover:bg-sky-900/10 hover:text-sky-200 transition-colors">
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-sky-500 to-indigo-600 opacity-90 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:15px_15px]"></div>
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
