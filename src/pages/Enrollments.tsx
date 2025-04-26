
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, ArrowLeft, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Define types
type Enrollment = {
  id: number;
  client_id: number;
  program_id: number;
  enrollment_date: string;
  status: string;
  client: {
    id: number;
    first_name: string;
    last_name: string;
  };
  program: {
    id: number;
    name: string;
  };
};

const Enrollments = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/enrollments");
        if (!response.ok) throw new Error("Failed to fetch enrollments");
        const data = await response.json();
        setEnrollments(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // Filter enrollments based on search query
  const filteredEnrollments = enrollments.filter(enrollment => {
    const clientName = `${enrollment.client.first_name} ${enrollment.client.last_name}`.toLowerCase();
    const programName = enrollment.program.name.toLowerCase();
    const search = searchQuery.toLowerCase();
    
    return clientName.includes(search) || programName.includes(search);
  });

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
          <h1 className="text-3xl font-bold text-white">Program Enrollments</h1>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by client or program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white pl-10"
            />
          </div>
        </div>

        {/* Enrollments List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-sky-400">Loading...</div>
          </div>
        ) : (
          <>
            {filteredEnrollments.length > 0 ? (
              <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-slate-700/50">
                      <TableHead className="text-slate-300 font-medium">Client Name</TableHead>
                      <TableHead className="text-slate-300 font-medium">Program</TableHead>
                      <TableHead className="text-slate-300 font-medium">Enrollment Date</TableHead>
                      <TableHead className="text-slate-300 font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnrollments.map((enrollment) => (
                      <TableRow 
                        key={enrollment.id} 
                        className="hover:bg-slate-700/50 cursor-pointer"
                        onClick={() => navigate(`/clients/${enrollment.client.id}`)}
                      >
                        <TableCell className="font-medium text-white">
                          {enrollment.client.first_name} {enrollment.client.last_name}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {enrollment.program.name}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={enrollment.status === "Active" ? "default" : "secondary"}>
                            {enrollment.status}
                          </Badge>
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
                    ? "No enrollments match your search."
                    : "No enrollments found. Enroll clients in programs to see them here."}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Enrollments;
