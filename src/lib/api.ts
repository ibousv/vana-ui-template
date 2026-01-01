const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ChatMessage {
  message: string;
  tenant_id?: string;
}

export interface ChatResponse {
  response: string;
  sql?: string;
  results?: any[];
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async sendChatMessage(message: ChatMessage): Promise<ChatResponse> {
    return this.request<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  async getDataSources(): Promise<any[]> {
    return this.request<any[]>('/api/datasources');
  }

  async testConnection(datasource: any): Promise<{ success: boolean; message: string }> {
    return this.request('/api/datasources/test', {
      method: 'POST',
      body: JSON.stringify(datasource),
    });
  }
}

export const apiService = new ApiService();
