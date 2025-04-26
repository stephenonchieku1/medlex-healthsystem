const API_BASE_URL = 'http://localhost:4000/api/v1';

// Generic fetch function
const fetchData = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Health Programs
export const getHealthPrograms = async (): Promise<HealthProgram[]> => {
  return fetchData<HealthProgram[]>('/programs');
};

export const getHealthProgram = async (id: string): Promise<HealthProgram> => {
  return fetchData<HealthProgram>(`/programs/${id}`);
};

export const createHealthProgram = async (program: Omit<HealthProgram, 'id'>): Promise<HealthProgram> => {
  return fetchData<HealthProgram>('/programs', {
    method: 'POST',
    body: JSON.stringify({ program }),
  });
};

export const updateHealthProgram = async (id: string, program: Partial<HealthProgram>): Promise<HealthProgram> => {
  return fetchData<HealthProgram>(`/programs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ program }),
  });
};

export const deleteHealthProgram = async (id: string): Promise<void> => {
  return fetchData<void>(`/programs/${id}`, {
    method: 'DELETE',
  });
};

// Clients
export const getClients = async (): Promise<Client[]> => {
  return fetchData<Client[]>('/clients');
};

export const getClient = async (id: string): Promise<Client> => {
  return fetchData<Client>(`/clients/${id}`);
};

export const createClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
  return fetchData<Client>('/clients', {
    method: 'POST',
    body: JSON.stringify({ client }),
  });
};

export const updateClient = async (id: string, client: Partial<Client>): Promise<Client> => {
  return fetchData<Client>(`/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ client }),
  });
};

export const searchClients = async (query: string): Promise<Client[]> => {
  return fetchData<Client[]>(`/clients/search?q=${encodeURIComponent(query)}`);
};

// Enrollments
export const getEnrollments = async (): Promise<Enrollment[]> => {
  return fetchData<Enrollment[]>('/enrollments');
};

export const getEnrollment = async (id: string): Promise<Enrollment> => {
  return fetchData<Enrollment>(`/enrollments/${id}`);
};

export const getClientEnrollments = async (clientId: string): Promise<Enrollment[]> => {
  return fetchData<Enrollment[]>(`/clients/${clientId}/enrollments`);
};

export const createEnrollment = async (enrollment: Omit<Enrollment, 'id'>): Promise<Enrollment> => {
  return fetchData<Enrollment>('/enrollments', {
    method: 'POST',
    body: JSON.stringify({
      client_id: enrollment.client_id,
      health_program_id: enrollment.health_program_id,
      enrollment_date: enrollment.enrollment_date,
      status: enrollment.status
    }),
  });
};

export const updateEnrollment = async (id: string, enrollment: Partial<Enrollment>): Promise<Enrollment> => {
  return fetchData<Enrollment>(`/enrollments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      client_id: enrollment.client_id,
      health_program_id: enrollment.health_program_id,
      enrollment_date: enrollment.enrollment_date,
      status: enrollment.status
    }),
  });
};

export const deleteEnrollment = async (id: string): Promise<void> => {
  return fetchData<void>(`/enrollments/${id}`, {
    method: 'DELETE',
  });
};

// Types
export interface HealthProgram {
  id: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  contact_number: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  client_id: string;
  health_program_id: string;
  enrollment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  client?: Client;
  health_program?: HealthProgram;
}

// Generic POST request
export const postData = async<T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

// Generic PUT request
export const updateData = async<T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
};

// Generic DELETE request
export const deleteData = async(endpoint: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    throw error;
  }
};

// API specific endpoints
export const api = {
  // Health Programs
  getHealthPrograms: getHealthPrograms,
  getHealthProgram: getHealthProgram,
  createHealthProgram: createHealthProgram,
  updateHealthProgram: updateHealthProgram,
  deleteHealthProgram: deleteHealthProgram,
  
  // Clients
  getClients: getClients,
  getClient: getClient,
  createClient: createClient,
  updateClient: updateClient,
  searchClients: searchClients,
  deleteClient: (id: string) => deleteData(`/clients/${id}`),
  
  // Enrollments
  getEnrollments: getEnrollments,
  getEnrollment: getEnrollment,
  getClientEnrollments: getClientEnrollments,
  enrollClient: createEnrollment,
  updateEnrollment: updateEnrollment,
  deleteEnrollment: deleteEnrollment,
};

export default api;
