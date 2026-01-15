# Developer Guide

## Getting Started

This template is designed to be forked and customized for your specific needs. Follow this guide to understand the architecture and extend functionality.

## Architecture Overview

### Component Structure

Components follow a consistent pattern:
- State management with React hooks
- API integration via `apiService`
- Loading and error states
- TypeScript types for all props and data

### API Service Pattern

All API calls go through `src/lib/api.ts`:

```tsx
// Add new endpoint
async getUsers(): Promise<User[]> {
  return this.request<User[]>('/api/users');
}
```

### Type Definitions

Define all types in `src/types/index.ts`:

```tsx
export interface User {
  id: string;
  name: string;
  email: string;
}
```

## Common Patterns

### Creating a New Feature

1. **Define Types** (`src/types/index.ts`)
```tsx
export interface MyFeature {
  id: string;
  name: string;
}
```

2. **Add API Method** (`src/lib/api.ts`)
```tsx
async getMyFeature(): Promise<MyFeature[]> {
  return this.request<MyFeature[]>('/api/my-feature');
}
```

3. **Create Component** (`src/components/MyFeature.tsx`)
```tsx
'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import type { MyFeature } from '@/types';

export default function MyFeature() {
  const [data, setData] = useState<MyFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await apiService.getMyFeature();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

4. **Add to Navigation** (`src/components/Sidebar.tsx`)
```tsx
{ id: 'myfeature', label: 'My Feature', icon: '⚡' }
```

5. **Add Route** (`src/app/page.tsx`)
```tsx
{activeView === 'myfeature' && <MyFeature />}
```

### Using Custom Hooks

Use the `useApi` hook for cleaner data fetching:

```tsx
import { useApi } from '@/lib/hooks';
import { apiService } from '@/lib/api';

export default function MyComponent() {
  const { data, loading, error, execute } = useApi<MyData>();

  useEffect(() => {
    execute(() => apiService.getMyData());
  }, [execute]);

  // Component logic
}
```

### Styling Components

Use Tailwind utility classes:

```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
  <p className="text-sm text-gray-600">Description</p>
</div>
```

## Configuration

### Environment Variables

Add new variables to `.env.example` and `.env.local`:

```env
NEXT_PUBLIC_MY_VAR=value
```

Access in code:

```tsx
const myVar = process.env.NEXT_PUBLIC_MY_VAR;
```

### API Configuration

Modify `src/lib/config.ts` for global settings:

```tsx
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  retries: 3,
} as const;
```

## Best Practices

### Error Handling

Always handle errors gracefully:

```tsx
try {
  const data = await apiService.getData();
  // Success handling
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  // Error handling
}
```

### Loading States

Show loading indicators for async operations:

```tsx
{loading && <div className="animate-spin">Loading...</div>}
```

### Accessibility

Add ARIA labels and semantic HTML:

```tsx
<button aria-label="Submit form" type="submit">
  Submit
</button>
```

### Type Safety

Always define types for props and data:

```tsx
interface MyComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

export default function MyComponent({ title, onSubmit }: MyComponentProps) {
  // Component logic
}
```

## Testing

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### API Testing

Mock API calls in tests:

```tsx
jest.mock('@/lib/api', () => ({
  apiService: {
    getData: jest.fn(() => Promise.resolve(mockData)),
  },
}));
```

## Deployment

### Build Optimization

```bash
npm run build
npm run start
```

### Environment-Specific Config

Use different `.env` files:
- `.env.local` - Local development
- `.env.production` - Production
- `.env.staging` - Staging

## Troubleshooting

### Common Issues

**API Connection Failed**
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running
- Check CORS settings

**Type Errors**
- Run `npm run build` to check TypeScript errors
- Ensure all types are properly defined

**Styling Issues**
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
