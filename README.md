# Vana AI Frontend Template

A production-ready Next.js 14 template for building AI-powered data platforms with conversational interfaces.

## Features

- **AI Chat Interface** - Natural language queries with SQL generation
- **Dashboard & Visualizations** - Data results in tables and charts
- **Data Source Management** - Connect and manage multiple databases
- **Admin Interface** - User and tenant management
- **Multi-tenant Support** - Secure tenant isolation
- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Type-Safe** - Full TypeScript support with comprehensive types
- **Extensible** - Easy to customize and extend

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your app.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ChatInterface.tsx  # AI chat component
│   ├── Dashboard.tsx      # Dashboard view
│   ├── DataSources.tsx    # Data source management
│   └── Sidebar.tsx        # Navigation sidebar
├── lib/                   # Utilities and services
│   ├── api.ts            # API client service
│   ├── config.ts         # Configuration
│   └── hooks/            # Custom React hooks
├── types/                 # TypeScript definitions
│   └── index.ts          # Shared types
└── utils/                 # Helper functions
```

## Customization Guide

### Adding New Views

1. Create a component in `src/components/`:
```tsx
export default function MyView() {
  return <div>My Custom View</div>;
}
```

2. Add to navigation in `src/components/Sidebar.tsx`:
```tsx
{ id: 'myview', label: 'My View', icon: '⚡' }
```

3. Import and render in `src/app/page.tsx`:
```tsx
{activeView === 'myview' && <MyView />}
```

### Adding API Endpoints

Extend the API service in `src/lib/api.ts`:

```tsx
async myCustomEndpoint(data: MyType): Promise<ResponseType> {
  return this.request<ResponseType>('/api/my-endpoint', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

### Adding New Types

Define types in `src/types/index.ts`:

```tsx
export interface MyCustomType {
  id: string;
  name: string;
}
```

### Custom Hooks

Create reusable hooks in `src/lib/hooks/`:

```tsx
export function useMyHook() {
  // Your hook logic
  return { data, loading, error };
}
```

## API Integration

The frontend expects a backend with these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send chat messages |
| GET | `/api/datasources` | Get data sources |
| POST | `/api/datasources/test` | Test connections |

### Request/Response Examples

**Chat Request:**
```json
{
  "message": "Show me all users",
  "tenant_id": "optional-tenant-id"
}
```

**Chat Response:**
```json
{
  "response": "Here are the users",
  "sql": "SELECT * FROM users",
  "results": [{"id": 1, "name": "John"}]
}
```

## Styling

This template uses Tailwind CSS. Customize in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Best Practices

- Keep components small and focused
- Use TypeScript types for all data
- Handle loading and error states
- Add accessibility attributes
- Test API integration thoroughly

## Contributing

This is a template repository. Fork it and make it your own!

## License

MIT
