
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, ArrowLeft, Plus, Search } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import ClientForm from "@/components/clients/ClientForm";

// Define Client type
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

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:4000/api/v1/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        setClients(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contact_number?.includes(searchQuery)
  );

  // Handle client creation
  const handleCreateClient = async (clientData: Omit<Client, 'id' | 'created_at'>) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error("Failed to create client");
      }

      const newClient = await response.json();
      setClients([...clients, newClient]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating client:", error);
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
          <h1 className="text-3xl font-bold text-white">Client Registry</h1>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white pl-10"
            />
          </div>
          <Button 
            className="bg-gradient-to-r from-sky-500 to-indigo-600"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="mr-2 h-4 w-4" /> 
            {showForm ? "Cancel" : "Register Client"}
          </Button>
        </div>

        {/* Client Form */}
        {showForm && (
          <div className="mb-6 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <ClientForm onSubmit={handleCreateClient} />
          </div>
        )}

        {/* Clients List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-sky-400">Loading...</div>
          </div>
        ) : (
          <>
            {filteredClients.length > 0 ? (
              <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-slate-700/50">
                      <TableHead className="text-slate-300 font-medium">Name</TableHead>
                      <TableHead className="text-slate-300 font-medium">Gender</TableHead>
                      <TableHead className="text-slate-300 font-medium">Date of Birth</TableHead>
                      <TableHead className="text-slate-300 font-medium">Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow 
                        key={client.id} 
                        className="hover:bg-slate-700/50 cursor-pointer"
                        onClick={() => navigate(`/clients/${client.id}`)}
                      >
                        <TableCell className="font-medium text-white">
                          {client.first_name} {client.last_name}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {client.gender}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {new Date(client.date_of_birth).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-slate-400">
                          {client.contact_number || client.email || "N/A"}
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
                    ? "No clients match your search."
                    : "No clients found. Register your first client!"}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Clients;
