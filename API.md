# API Documentation

## Overview

The frontend communicates with a backend API. This document describes the expected API contract.

## Base URL

Configure via environment variable:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Authentication

Add authentication headers in `src/lib/api.ts`:

```tsx
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  ...options.headers,
}
```

## Endpoints

### Chat

#### POST /api/chat

Send a chat message and receive AI-generated response.

**Request:**
```json
{
  "message": "Show me all users created this month",
  "tenant_id": "tenant-123"
}
```

**Response:**
```json
{
  "response": "Here are the users created this month",
  "sql": "SELECT * FROM users WHERE created_at >= '2024-01-01'",
  "results": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-15"
    }
  ]
}
```

**Error Response:**
```json
{
  "error": "Failed to generate SQL query",
  "message": "Invalid table name"
}
```

### Data Sources

#### GET /api/datasources

Get all configured data sources.

**Response:**
```json
[
  {
    "id": "ds-1",
    "name": "Production DB",
    "type": "postgres",
    "host": "db.example.com",
    "port": 5432,
    "database": "production",
    "status": "connected"
  }
]
```

#### POST /api/datasources/test

Test a data source connection.

**Request:**
```json
{
  "type": "postgres",
  "host": "db.example.com",
  "port": 5432,
  "database": "production",
  "username": "user",
  "password": "pass"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Connection successful"
}
```

## Error Handling

All endpoints return errors in this format:

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "code": "ERROR_CODE"
}
```

HTTP Status Codes:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Implement rate limiting on the backend. Frontend will handle 429 responses:

```tsx
if (response.status === 429) {
  throw new Error('Rate limit exceeded. Please try again later.');
}
```

## Extending the API

### Adding New Endpoints

1. **Define Type** (`src/types/index.ts`)
```tsx
export interface NewResource {
  id: string;
  name: string;
}
```

2. **Add Method** (`src/lib/api.ts`)
```tsx
async getNewResource(): Promise<NewResource[]> {
  return this.request<NewResource[]>('/api/new-resource');
}

async createNewResource(data: Partial<NewResource>): Promise<NewResource> {
  return this.request<NewResource>('/api/new-resource', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

3. **Use in Component**
```tsx
const resources = await apiService.getNewResource();
```

## WebSocket Support

For real-time features, add WebSocket support:

```tsx
// src/lib/websocket.ts
export class WebSocketService {
  private ws: WebSocket | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      // Handle messages
    };
  }

  send(data: any) {
    this.ws?.send(JSON.stringify(data));
  }
}
```

## Pagination

For paginated endpoints:

**Request:**
```
GET /api/resources?page=1&limit=20
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Filtering & Sorting

**Request:**
```
GET /api/resources?filter=active&sort=created_at&order=desc
```

## File Uploads

For file upload endpoints:

```tsx
async uploadFile(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  return this.request<{ url: string }>('/api/upload', {
    method: 'POST',
    body: formData,
    headers: {}, // Let browser set Content-Type for FormData
  });
}
```
