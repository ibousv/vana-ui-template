# Vana UI Template

Production-ready Next.js 14 template for building AI-powered data platforms.

## What's Included

- AI Chat Interface with SQL generation
- Dashboard with data visualizations
- Data Source management
- TypeScript types and API service
- Reusable hooks and utilities
- Comprehensive documentation

## Quick Start

```bash
# Clone the template
git clone <your-repo-url>
cd vana-ui-template

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start development
npm run dev
```

## Documentation

- **[README.md](./README.md)** - Overview and quick start
- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Architecture and patterns
- **[API.md](./API.md)** - Backend API contract
- **[EXAMPLES.md](./EXAMPLES.md)** - Complete feature examples

## Project Structure

```
src/
├── app/           # Next.js pages
├── components/    # React components
├── lib/           # API service, hooks, config
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

## Customization

This template is designed to be forked and customized:

1. Update branding in `src/components/Sidebar.tsx`
2. Add your API URL in `.env.local`
3. Extend types in `src/types/index.ts`
4. Add features following patterns in `EXAMPLES.md`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hooks

## License

MIT - Use freely for your projects
