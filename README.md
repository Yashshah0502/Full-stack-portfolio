# Full-Stack Portfolio

A modern full-stack portfolio application built with React, Express, and TypeScript in a monorepo structure.

## Project Structure

```
full-stack-portfolio/
├── apps/
│   ├── backend/         # Express.js API server
│   └── frontend/        # React + Vite frontend
├── packages/
│   └── common-types/    # Shared TypeScript types
└── package.json         # Root workspace configuration
```

## Tech Stack

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js v5
- **Language**: TypeScript (strict mode)
- **Tools**: Nodemon for development

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode)
- **Dev Server**: Vite dev server with HMR

### Shared
- **Monorepo**: npm workspaces
- **Type Safety**: Shared types package for consistency

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v7 or higher for workspace support)

### Installation

Install all dependencies across workspaces:

```bash
npm install
```

### Development

Start the backend server (runs on port 4000):
```bash
npm run dev:backend
```

Start the frontend dev server (runs on port 3000):
```bash
npm run dev:frontend
```

### Building

Build all workspaces:
```bash
npm run build
```

Build individual workspaces:
```bash
npm run build:backend
npm run build:frontend
npm run build:types
```

### Production

Start the backend server:
```bash
npm run start:backend
```

Preview the frontend build:
```bash
npm run preview:frontend
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:backend` | Start backend in development mode with hot reload |
| `npm run dev:frontend` | Start frontend dev server with HMR |
| `npm run build` | Build all packages (types, backend, frontend) |
| `npm run build:backend` | Build backend only |
| `npm run build:frontend` | Build frontend only |
| `npm run build:types` | Build shared types package |
| `npm run start:backend` | Start production backend server |
| `npm run preview:frontend` | Preview production frontend build |

## Environment Variables

### Backend

Create a `.env` file in `apps/backend/` based on `.env.example`:

```env
PORT=4000
NODE_ENV=development
```

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns server health status
  - Response: `{ "status": "ok", "service": "backend" }`

## Development Workflow

1. Install dependencies: `npm install`
2. Start backend: `npm run dev:backend`
3. Start frontend: `npm run dev:frontend` (in another terminal)
4. Access frontend at http://localhost:3000
5. Backend API available at http://localhost:4000

The frontend is configured to proxy `/api` requests to the backend during development.

## TypeScript Configuration

All packages use strict TypeScript settings:
- Strict mode enabled
- No unused locals/parameters
- No implicit returns
- ES Module syntax with verbatim module syntax

## Project Features

- Monorepo structure with npm workspaces
- Full TypeScript support across frontend and backend
- Shared type definitions for consistency
- Hot module replacement in development
- Production-ready build configuration
- Environment-based configuration
- CORS enabled for cross-origin requests

## License

ISC
