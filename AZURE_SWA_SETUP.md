# Azure Static Web Apps Local Development Setup

This document explains how to set up local development with Azure Static Web Apps CLI for the Music Marketplace application.

## Prerequisites

1. Node.js (v18 or higher)
2. npm or yarn
3. Azure Static Web Apps CLI (installed as dev dependency)

## Installation

1. Install dependencies:
```bash
npm install
```

## Local Development

### Option 1: Using Azure Static Web Apps CLI (Recommended for production-like testing)

Start the application with Azure Static Web Apps CLI:
```bash
npm run swa:dev
```

This will:
- Start the Vite dev server on http://localhost:5173
- Start the Azure SWA CLI on http://localhost:4280
- Proxy API calls through the SWA CLI to your backend

Access the application at: http://localhost:4280

### Option 2: Standard Vite Development

For quick development without SWA CLI:
```bash
npm run dev
```

Access the application at: http://localhost:5173

### Option 3: Concurrent Development

Run both Vite dev server and SWA CLI simultaneously:
```bash
npm run start:local
```

## Backend Setup

Make sure your backend server is running on port 5000:
```bash
cd ../music-marketplace-backend
npm run dev
```

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Test the production build with SWA CLI:
```bash
npm run swa:start
```

## API Configuration

The application automatically detects the environment and configures API calls:

- **Local Vite dev server** (port 5173): Direct calls to http://localhost:5000
- **Azure SWA CLI** (port 4280): Proxied calls through /api
- **Production**: Relative URLs through Azure Static Web Apps

## Configuration Files

- `staticwebapp.config.json`: Azure Static Web Apps routing configuration
- `swa-cli.config.json`: Local Azure SWA CLI configuration
- `vite.config.js`: Vite proxy configuration for local development

## Deployment

When deploying to Azure Static Web Apps:

1. The frontend will be built and deployed as a static site
2. The backend API will be deployed as Azure Functions (if configured)
3. Routing and API proxying will be handled by Azure Static Web Apps

## Troubleshooting

### API Calls Not Working

1. Ensure backend server is running on port 5000
2. Check CORS configuration in backend server.js
3. Verify the correct port is being used (4280 for SWA CLI, 5173 for Vite)

### SWA CLI Issues

1. Clear SWA CLI cache: `npx swa --clear-cache`
2. Restart the development servers
3. Check that the API location path is correct in package.json scripts

### CORS Errors

The backend is configured to accept requests from:
- http://localhost:5173 (Vite dev server)
- http://localhost:4280 (Azure SWA CLI)
- *.azurestaticapps.net (Production)

Make sure these origins are not blocked by any firewall or security software.
