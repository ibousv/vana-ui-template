import type { ChatMessage, ChatResponse, DataSource } from '@/types';
import { config } from './config';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${config.apiUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `API Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Network error occurred');
    }
  }

  async sendChatMessage(message: ChatMessage): Promise<ChatResponse> {
    return this.request<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  async getDataSources(): Promise<DataSource[]> {
    return this.request<DataSource[]>('/api/datasources');
  }

  async testConnection(datasource: Partial<DataSource>): Promise<{ success: boolean; message: string }> {
    return this.request('/api/datasources/test', {
      method: 'POST',
      body: JSON.stringify(datasource),
    });
  }
}

export const apiService = new ApiService();
