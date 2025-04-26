
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, ArrowLeft, Plus } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import ProgramForm from "../components/programs/ProgramForm";

// Define Program type
type Program = {
  id: number;
  name: string;
  description: string;
  created_at: string;
};

const Programs = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:4000/api/v1/programs");
        if (!response.ok) {
          throw new Error("Failed to fetch programs");
        }
        const data = await response.json();
        setPrograms(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Filter programs based on search query
  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle program creation
  const handleCreateProgram = async (programData: { name: string; description: string }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programData),
      });

      if (!response.ok) {
        throw new Error("Failed to create program");
      }

      const newProgram = await response.json();
      setPrograms([...programs, newProgram]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

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
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-4 text-slate-300 hover:text-white"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Health Programs</h1>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="w-full sm:w-1/2">
            <Input
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <Button 
            className="bg-gradient-to-r from-sky-500 to-indigo-600"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="mr-2 h-4 w-4" /> 
            {showForm ? "Cancel" : "New Program"}
          </Button>
        </div>

        {/* Program Form */}
        {showForm && (
          <div className="mb-6 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <ProgramForm onSubmit={handleCreateProgram} />
          </div>
        )}

        {/* Programs List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-sky-400">Loading...</div>
          </div>
        ) : (
          <>
            {filteredPrograms.length > 0 ? (
              <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-slate-700/50">
                      <TableHead className="text-slate-300 font-medium">Name</TableHead>
                      <TableHead className="text-slate-300 font-medium">Description</TableHead>
                      <TableHead className="text-slate-300 font-medium">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program) => (
                      <TableRow 
                        key={program.id} 
                        className="hover:bg-slate-700/50 cursor-pointer"
                        onClick={() => navigate(`/programs/${program.id}`)}
                      >
                        <TableCell className="font-medium text-white">
                          {program.name}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {program.description}
                        </TableCell>
                        <TableCell className="text-slate-400">
                          {new Date(program.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-slate-300">
                  {searchQuery
                    ? "No programs match your search."
                    : "No programs found. Create your first one!"}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Programs;
