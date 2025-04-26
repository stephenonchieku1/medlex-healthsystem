import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, ArrowLeft, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getEnrollments, deleteEnrollment, Enrollment } from "@/services/api";

const Enrollments = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<Enrollment | null>(null);

  // Fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const data = await getEnrollments();
      setEnrollments(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setError("Failed to load enrollments");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteEnrollment(id);
      // Update the UI immediately by filtering out the deleted enrollment
      setEnrollments(prevEnrollments => prevEnrollments.filter(e => e.id !== id));
      setEnrollmentToDelete(null);
      setError(null);
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      setError("Failed to delete enrollment");
      setEnrollmentToDelete(null);
    }
  };

  // Filter enrollments based on search query
  const filteredEnrollments = enrollments.filter(enrollment => {
    if (!enrollment.client || !enrollment.health_program) return false;
    
    const clientName = `${enrollment.client.first_name} ${enrollment.client.last_name}`.toLowerCase();
    const programName = enrollment.health_program.name.toLowerCase();
    const search = searchQuery.toLowerCase();
    
    return clientName.includes(search) || programName.includes(search);
  });

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'destructive';
      case 'suspended':
        return 'warning';
      default:
        return 'secondary';
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
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Program Enrollments</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

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
            <div className="animate-pulse text-sky-400">Loading enrollments...</div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrollments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-400">
                      {searchQuery
                        ? "No enrollments match your search."
                        : "No enrollments found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium text-white">
                        {enrollment.client ? `${enrollment.client.first_name} ${enrollment.client.last_name}` : "Unknown Client"}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {enrollment.health_program?.name || "Unknown Program"}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(enrollment.enrollment_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(enrollment.status)}>
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => setEnrollmentToDelete(enrollment)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!enrollmentToDelete} onOpenChange={() => setEnrollmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the enrollment from the program. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => enrollmentToDelete && handleDelete(enrollmentToDelete.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Enrollments;
