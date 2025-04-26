
const API_BASE_URL = 'http://localhost:4000/api/v1';

// Generic GET request
export const fetchData = async<T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

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
  // Programs
  getPrograms: () => fetchData<any[]>('/programs'),
  getProgram: (id: number) => fetchData<any>(`/programs/${id}`),
  createProgram: (data: any) => postData<any>('/programs', data),
  updateProgram: (id: number, data: any) => updateData<any>(`/programs/${id}`, data),
  deleteProgram: (id: number) => deleteData(`/programs/${id}`),
  
  // Clients
  getClients: () => fetchData<any[]>('/clients'),
  getClient: (id: number) => fetchData<any>(`/clients/${id}`),
  createClient: (data: any) => postData<any>('/clients', data),
  updateClient: (id: number, data: any) => updateData<any>(`/clients/${id}`, data),
  deleteClient: (id: number) => deleteData(`/clients/${id}`),
  
  // Enrollments
  getEnrollments: () => fetchData<any[]>('/enrollments'),
  getClientEnrollments: (clientId: number) => fetchData<any[]>(`/clients/${clientId}/enrollments`),
  enrollClient: (clientId: number, data: any) => postData<any>(`/clients/${clientId}/enrollments`, data),
  updateEnrollment: (id: number, data: any) => updateData<any>(`/enrollments/${id}`, data),
  deleteEnrollment: (id: number) => deleteData(`/enrollments/${id}`),
};

export default api;
