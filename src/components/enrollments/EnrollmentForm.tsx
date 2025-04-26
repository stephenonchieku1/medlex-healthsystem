import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";
import { getHealthPrograms, HealthProgram } from "../../services/api";

interface EnrollmentFormProps {
  clientId: string;
  onSubmit: (data: {
    client_id: string;
    health_program_id: string;
    enrollment_date: string;
    status: string;
  }) => void;
}

const EnrollmentForm = ({ clientId, onSubmit }: EnrollmentFormProps) => {
  const [programs, setPrograms] = useState<HealthProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    client_id: clientId,
    health_program_id: "",
    enrollment_date: new Date().toISOString().split("T")[0],
    status: "active",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  // Fetch available programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getHealthPrograms();
        setPrograms(data);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setError("Failed to load programs");
        setIsLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.health_program_id) newErrors.health_program_id = "Please select a program";
    if (!formData.enrollment_date) newErrors.enrollment_date = "Enrollment date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit({
        client_id: clientId,
        health_program_id: formData.health_program_id,
        enrollment_date: formData.enrollment_date,
        status: formData.status
      });
    } catch (error: any) {
      if (error.message?.includes("already enrolled")) {
        setShowDuplicateAlert(true);
      } else {
        setError("Failed to create enrollment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-sky-400">Loading available programs...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="health_program_id" className="text-white">Select Program</Label>
          <select 
            id="health_program_id" 
            name="health_program_id"
            value={formData.health_program_id} 
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 text-white px-3 py-2 mt-1"
          >
            <option value="">Select a program</option>
            {programs.map(program => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
          {errors.health_program_id && <p className="text-red-400 text-sm mt-1">{errors.health_program_id}</p>}
        </div>
        
        <div>
          <Label htmlFor="enrollment_date" className="text-white">Enrollment Date</Label>
          <Input 
            type="date"
            id="enrollment_date" 
            name="enrollment_date"
            value={formData.enrollment_date} 
            onChange={handleChange}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
          {errors.enrollment_date && <p className="text-red-400 text-sm mt-1">{errors.enrollment_date}</p>}
        </div>
        
        <div>
          <Label htmlFor="status" className="text-white">Status</Label>
          <select 
            id="status" 
            name="status"
            value={formData.status} 
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 text-white px-3 py-2 mt-1"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-sky-500 to-indigo-600"
        >
          {isSubmitting ? "Enrolling..." : "Enroll Client"}
        </Button>
      </form>

      <AlertDialog open={showDuplicateAlert} onOpenChange={setShowDuplicateAlert}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Duplicate Enrollment</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              This client is already enrolled in the selected program. Please select a different program or update the existing enrollment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EnrollmentForm;
