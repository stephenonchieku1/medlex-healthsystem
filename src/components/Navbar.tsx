
import { Button } from "@/components/ui/button";
import { Menu, X, Brain } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-slate-900/80 backdrop-blur-xl z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-sky-500 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">MedLex AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-sky-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-sky-400 transition-colors">How it Works</a>
            <a href="#benefits" className="text-gray-300 hover:text-sky-400 transition-colors">Benefits</a>
            <Button className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl shadow-md shadow-sky-500/20 hover:shadow-sky-600/30 transition-all duration-200">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-sky-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-2 pt-2 pb-4 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-white/10 my-2">
              <a href="#features" className="text-gray-300 hover:text-sky-400 block px-3 py-2 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-sky-400 block px-3 py-2 transition-colors">How it Works</a>
              <a href="#benefits" className="text-gray-300 hover:text-sky-400 block px-3 py-2 transition-colors">Benefits</a>
              <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl shadow-md shadow-sky-500/20 hover:shadow-sky-600/30 transition-all duration-200">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
