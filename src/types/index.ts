export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sql?: string;
  results?: any[];
  error?: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'postgres' | 'mysql' | 'sqlite';
  host: string;
  port: number;
  database: string;
  status: 'connected' | 'disconnected' | 'error';
}

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
