import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, CalendarCheck, Plus, Trash2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import EnrollmentForm from "@/components/enrollments/EnrollmentForm";
import { getClient, getClientEnrollments, createEnrollment, deleteEnrollment, Client, Enrollment, HealthProgram } from "@/services/api";

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<Enrollment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch client and their enrollments
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (!id) throw new Error("Client ID is required");
        
        // Fetch client details
        const clientData = await getClient(id);
        setClient(clientData);

        // Fetch client enrollments
        const enrollmentsData = await getClientEnrollments(id);
        setEnrollments(enrollmentsData);

        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching client data:", error);
        setError("Failed to load client data");
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  const handleEnroll = async (enrollmentData: { 
    client_id: string;
    health_program_id: string; 
    enrollment_date: string; 
    status: string 
  }) => {
    try {
      if (!id) throw new Error("Client ID is required");
      
      const newEnrollment = await createEnrollment({
        client_id: id,
        health_program_id: enrollmentData.health_program_id,
        enrollment_date: enrollmentData.enrollment_date,
        status: enrollmentData.status
      });
      
      // Refresh enrollments after successful enrollment
      const updatedEnrollments = await getClientEnrollments(id);
      setEnrollments(updatedEnrollments);
      setShowEnrollForm(false);
      setError(null);
    } catch (error) {
      console.error("Error enrolling client:", error);
      setError("Failed to enroll client in program");
    }
  };

  const handleDeleteEnrollment = async () => {
    if (!enrollmentToDelete || isDeleting) return;
    
    // Store the enrollment ID before clearing the state
    const enrollmentId = enrollmentToDelete.id;
    
    // Immediately update UI and close dialog
    setEnrollments(prevEnrollments => 
      prevEnrollments.filter(e => e.id !== enrollmentId)
    );
    setEnrollmentToDelete(null);
    setError(null);
    
    // Make the API call in the background
    setIsDeleting(true);
    deleteEnrollment(enrollmentId)
      .then(() => {
        // Success - no need to do anything, UI is already updated
      })
      .catch(error => {
        console.error("Error deleting enrollment:", error);
        // Only revert if it's not a 404 (which means it was already deleted)
        if (error.status !== 404) {
          setEnrollments(prevEnrollments => [...prevEnrollments, enrollmentToDelete]);
          setError("Failed to delete enrollment. Please try again.");
        }
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-sky-400 text-xl">Loading client data...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Client not found</div>
      </div>
    );
  }

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
        <Button 
          variant="ghost" 
          className="mb-6 text-slate-300 hover:text-white"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clients
        </Button>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}
        
        {/* Client Profile */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 mb-8">
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-2xl font-bold text-white mb-2">
              {client.first_name} {client.last_name}
            </h1>
            <Badge>{client.gender}</Badge>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Date of Birth</p>
                  <p className="text-slate-200">{new Date(client.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Contact Number</p>
                  <p className="text-slate-200">{client.contact_number || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-slate-200">{client.email || "Not provided"}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Address & Registration</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Address</p>
                  <p className="text-slate-200">{client.address || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Registration Date</p>
                  <p className="text-slate-200">{new Date(client.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Program Enrollments */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <CalendarCheck className="mr-2 h-6 w-6 text-sky-400" />
              Program Enrollments
            </h2>
            <Button
              className="bg-gradient-to-r from-sky-500 to-indigo-600"
              onClick={() => setShowEnrollForm(!showEnrollForm)}
            >
              <Plus className="mr-2 h-4 w-4" /> 
              {showEnrollForm ? "Cancel" : "Enroll in Program"}
            </Button>
          </div>

          {showEnrollForm && (
            <div className="mb-8">
              <EnrollmentForm 
                clientId={id!} 
                onSubmit={handleEnroll} 
              />
            </div>
          )}

          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-400">
                      No program enrollments found
                    </TableCell>
                  </TableRow>
                ) : (
                  enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium text-white">
                        {enrollment.health_program?.name || "Unknown Program"}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(enrollment.enrollment_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={enrollment.status === "Active" ? "default" : "secondary"}>
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
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={!!enrollmentToDelete} 
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setEnrollmentToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the enrollment from the program. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEnrollment}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClientDetail;
