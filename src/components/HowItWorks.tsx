
import { Microchip } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your account in seconds and get immediate access to MedLex AI's powerful healthcare platform.",
    },
    {
      number: "02",
      title: "Share Your Concerns",
      description: "Describe your symptoms or health questions to our advanced neural network assistant.",
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive personalized health insights and evidence-based recommendations instantly.",
    },
  ];

  return (
    <div id="how-it-works" className="py-28 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
      <div className="absolute top-40 right-10 h-60 w-60 rounded-full bg-cyan-500/20 blur-[80px]"></div>
      <div className="absolute bottom-20 left-10 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center mb-16">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-300 text-xs tracking-wider uppercase font-medium">
              <Microchip className="h-4 w-4 mr-1.5" />
              How It Works
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Simple Steps to <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">Better Health</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 h-0.5 top-24 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent md:block hidden"></div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-xl font-bold shadow-lg shadow-sky-500/20 relative z-10">
                    {step.number}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="mt-8 px-6 py-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:border-sky-500/30 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-4 text-gray-300">{step.description}</p>
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

export default HowItWorks;
