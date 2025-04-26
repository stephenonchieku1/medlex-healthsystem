import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ClientFormProps {
  onSubmit: (data: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    contact_number: string;
    email?: string;
    address?: string;
  }) => void;
  initialData?: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    contact_number: string;
    email?: string;
    address?: string;
  };
}

const ClientForm = ({ onSubmit, initialData }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || "",
    last_name: initialData?.last_name || "",
    date_of_birth: initialData?.date_of_birth || "",
    gender: initialData?.gender || "",
    contact_number: initialData?.contact_number || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.contact_number.trim()) newErrors.contact_number = "Contact number is required";
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Format the date to YYYY-MM-DD
    const formattedData = {
      ...formData,
      date_of_birth: new Date(formData.date_of_birth).toISOString().split('T')[0],
    };
    onSubmit(formattedData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name" className="text-white">First Name</Label>
          <Input 
            id="first_name" 
            name="first_name"
            value={formData.first_name} 
            onChange={handleChange}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
          {errors.first_name && <p className="text-red-400 text-sm mt-1">{errors.first_name}</p>}
        </div>
        
        <div>
          <Label htmlFor="last_name" className="text-white">Last Name</Label>
          <Input 
            id="last_name" 
            name="last_name"
            value={formData.last_name} 
            onChange={handleChange}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
          {errors.last_name && <p className="text-red-400 text-sm mt-1">{errors.last_name}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date_of_birth" className="text-white">Date of Birth</Label>
          <Input 
            id="date_of_birth" 
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth} 
            onChange={handleChange}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
          {errors.date_of_birth && <p className="text-red-400 text-sm mt-1">{errors.date_of_birth}</p>}
        </div>
        
        <div>
          <Label htmlFor="gender" className="text-white">Gender</Label>
          <select 
            id="gender" 
            name="gender"
            value={formData.gender} 
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 text-white px-3 py-2 mt-1"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contact_number" className="text-white">Contact Number</Label>
          <Input 
            id="contact_number" 
            name="contact_number"
            value={formData.contact_number} 
            onChange={handleChange}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
          {errors.contact_number && <p className="text-red-400 text-sm mt-1">{errors.contact_number}</p>}
        </div>
        
        <div>
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email"
            value={formData.email} 
            onChange={handleChange}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
      
      <div>
        <Label htmlFor="address" className="text-white">Address</Label>
        <Textarea 
          id="address" 
          name="address"
          value={formData.address} 
          onChange={handleChange}
          className="bg-slate-700 border-slate-600 text-white mt-1"
          rows={3}
        />
        {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-sky-500 to-indigo-600"
      >
        {isSubmitting ? "Saving..." : "Register Client"}
      </Button>
    </form>
  );
};

export default ClientForm;
