
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EnrollmentFormProps {
  onSubmit: (data: {
    program_id: number;
    enrollment_date: string;
    status: string;
  }) => void;
}

type Program = {
  id: number;
  name: string;
  description: string;
};

const EnrollmentForm = ({ onSubmit }: EnrollmentFormProps) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    program_id: 0,
    enrollment_date: new Date().toISOString().split("T")[0],
    status: "Active",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/programs");
        if (!response.ok) throw new Error("Failed to fetch programs");
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.program_id) newErrors.program_id = "Please select a program";
    if (!formData.enrollment_date) newErrors.enrollment_date = "Enrollment date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "program_id" ? parseInt(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    onSubmit(formData);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div className="text-sky-400">Loading available programs...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="program_id" className="text-white">Select Program</Label>
        <select 
          id="program_id" 
          name="program_id"
          value={formData.program_id} 
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
        {errors.program_id && <p className="text-red-400 text-sm mt-1">{errors.program_id}</p>}
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
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Suspended">Suspended</option>
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
  );
};

export default EnrollmentForm;
