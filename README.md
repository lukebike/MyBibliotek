# Library System Website

A full-stack library management system with a React + TypeScript + Vite frontend and a Spring Boot backend.

## Features

- User, Author, and Book CRUD operations
- Material UI (MUI) for modern UI components
- Zustand for state management
- Axios for API requests
- React Router for navigation
- Fuse.js for fast fuzzy searching
- Form validation with React Hook Form

## In Progress

- **Integrating the loan system into the frontend**
- **Dashboard to display all library information**

## Project Structure

```
src/
  api.ts                  # Axios API instance
  App.tsx                 # Main app component and routing
  components/             # DataGrid column definitions
  hooks/                  # Custom hooks (menus, debounce, etc.)
  layout/                 # AppBar and layout components
  routes/                 # Page components for users, authors, books
  store/                  # Zustand stores for state management
  theme/                  # MUI theme customization
  types/                  # TypeScript types for domain models
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Spring Boot backend running at `http://localhost:8080`

### Install dependencies

```sh
npm install
# or
yarn install
```

### Run the frontend

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```sh
npm run build
```

### Lint

```sh
npm run lint
```

## API Configuration

The frontend expects the backend API at `http://localhost:8080`.  
You can change this in `src/api.ts`.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Fuse.js](https://fusejs.io/)
