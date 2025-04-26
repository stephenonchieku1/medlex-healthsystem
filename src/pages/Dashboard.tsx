
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-sky-500 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                MedLex Health System
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">
          Health Information Dashboard
        </h1>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Programs Card */}
          <Link to="/programs" className="block">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-sky-500/50 transition-all hover:shadow-glow">
              <h2 className="text-xl font-semibold text-white mb-2">
                Health Programs
              </h2>
              <p className="text-slate-300 mb-4">
                Manage various health programs like TB, Malaria, HIV, etc.
              </p>
              <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600">
                Manage Programs
              </Button>
            </div>
          </Link>

          {/* Clients Card */}
          <Link to="/clients" className="block">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-sky-500/50 transition-all hover:shadow-glow">
              <h2 className="text-xl font-semibold text-white mb-2">
                Client Registry
              </h2>
              <p className="text-slate-300 mb-4">
                Register and manage client information and medical records.
              </p>
              <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600">
                Manage Clients
              </Button>
            </div>
          </Link>

          {/* Enrollments Card */}
          <Link to="/enrollments" className="block">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-sky-500/50 transition-all hover:shadow-glow">
              <h2 className="text-xl font-semibold text-white mb-2">
                Program Enrollments
              </h2>
              <p className="text-slate-300 mb-4">
                Enroll clients in one or more health programs and track their progress.
              </p>
              <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600">
                Manage Enrollments
              </Button>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
