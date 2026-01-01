# Vana AI Frontend

A modern Next.js 14 frontend for the Vana AI conversational data platform.

## Features

- 🤖 **AI Chat Interface** - Natural language queries with SQL generation
- 📊 **Dashboard & Visualizations** - Data results in tables and charts
- 🗄️ **Data Source Management** - Connect and manage multiple databases
- ⚙️ **Admin Interface** - User and tenant management
- 🔒 **Multi-tenant Support** - Secure tenant isolation
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Integration

The frontend connects to a FastAPI backend with endpoints:
- `POST /api/chat` - Send chat messages
- `GET /api/datasources` - Get data sources
- `POST /api/datasources/test` - Test connections

## Architecture

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Components**: Modular, reusable components
- **State**: React hooks for local state management

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # Reusable UI components
├── lib/                # Utilities and API services
└── types/              # TypeScript type definitions
```
