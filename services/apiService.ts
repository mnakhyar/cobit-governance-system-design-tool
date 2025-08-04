// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com/api/cobit'  // Update this with your actual backend URL
  : 'http://localhost:5000/api/cobit';

export interface Design {
  _id?: string;
  name: string;
  description?: string;
  context?: any;
  initialScope?: any;
  refinement?: any;
  finalDesign?: any;
  results?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface DesignSummary {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get all designs (summary only)
  async getDesigns(): Promise<DesignSummary[]> {
    return this.request<DesignSummary[]>('');
  }

  // Get a single design by ID
  async getDesign(id: string): Promise<Design> {
    return this.request<Design>(`/${id}`);
  }

  // Create a new design
  async createDesign(design: Omit<Design, '_id'>): Promise<Design> {
    return this.request<Design>('', {
      method: 'POST',
      body: JSON.stringify(design),
    });
  }

  // Update an existing design
  async updateDesign(id: string, design: Partial<Design>): Promise<Design> {
    return this.request<Design>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(design),
    });
  }

  // Delete a design
  async deleteDesign(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/${id}`, {
      method: 'DELETE',
    });
  }

  // Save or update a design (creates new if no ID, updates if ID exists)
  async saveDesign(design: Design): Promise<Design> {
    if (design._id) {
      return this.updateDesign(design._id, design);
    } else {
      return this.createDesign(design);
    }
  }
}

export const apiService = new ApiService(); 