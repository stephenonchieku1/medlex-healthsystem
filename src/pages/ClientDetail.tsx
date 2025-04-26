
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, CalendarCheck, Plus } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EnrollmentForm from "@/components/enrollments/EnrollmentForm";

// Define types
type Client = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  contact_number?: string;
  email?: string;
  address?: string;
  created_at: string;
};

type Program = {
  id: number;
  name: string;
  description: string;
};

type Enrollment = {
  id: number;
  client_id: number;
  program_id: number;
  enrollment_date: string;
  status: string;
  program: Program;
};

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEnrollForm, setShowEnrollForm] = useState(false);

  // Fetch client and their enrollments
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch client details
        const clientResponse = await fetch(`http://localhost:4000/api/v1/clients/${id}`);
        if (!clientResponse.ok) throw new Error("Failed to fetch client");
        const clientData = await clientResponse.json();
        setClient(clientData);

        // Fetch client enrollments
        const enrollmentsResponse = await fetch(`http://localhost:4000/api/v1/clients/${id}/enrollments`);
        if (!enrollmentsResponse.ok) throw new Error("Failed to fetch enrollments");
        const enrollmentsData = await enrollmentsResponse.json();
        setEnrollments(enrollmentsData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching client data:", error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchClientData();
    }
  }, [id]);

  const handleEnroll = async (enrollmentData: { program_id: number; enrollment_date: string; status: string }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/clients/${id}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
      });

      if (!response.ok) throw new Error("Failed to enroll client");
      
      const newEnrollment = await response.json();
      setEnrollments([...enrollments, newEnrollment]);
      setShowEnrollForm(false);
    } catch (error) {
      console.error("Error enrolling client:", error);
    }
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
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-bold text-white mb-4 sm:mb-0 flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5 text-sky-400" />
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

        {/* Enrollment Form */}
        {showEnrollForm && (
          <div className="mb-6 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <EnrollmentForm onSubmit={handleEnroll} />
          </div>
        )}

        {/* Enrollments List */}
        {enrollments.length > 0 ? (
          <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-slate-700/50">
                  <TableHead className="text-slate-300 font-medium">Program</TableHead>
                  <TableHead className="text-slate-300 font-medium">Enrollment Date</TableHead>
                  <TableHead className="text-slate-300 font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id} className="hover:bg-slate-700/50">
                    <TableCell className="font-medium text-white">
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
          <div className="text-center py-8 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-slate-300">
              This client is not enrolled in any programs yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDetail;
