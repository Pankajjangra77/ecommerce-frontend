# E-Commerce Frontend

React TypeScript frontend for the e-commerce store.

## Prerequisites

- Node.js 16 or higher
- npm (Node package manager)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the frontend directory with:
```
VITE_API_URL=http://localhost:8000/api
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

- `src/components/`: React components
- `src/context/`: React context providers
- `src/services/`: API services
- `src/types/`: TypeScript type definitions

## Features

- Product catalog
- Shopping cart
- Discount code system
- Real-time notifications
- Responsive design

## Testing

Run tests:
```bash
npm run test
```

## Linting

Run ESLint:
```bash
npm run lint
```