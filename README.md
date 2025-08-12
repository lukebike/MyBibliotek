# Library System Website

A full-stack library management system with a React + TypeScript frontend and a Spring Boot backend. View at: https://mybibliotek.netlify.app/

## Features

- **User, Author, Book, and Loan CRUD operations** with full Create, Read, Update, Delete functionality
- **Interactive Dashboard** with real-time metrics, user growth tracking, and library statistics
- **Client-side search** with fuzzy search powered by Fuse.js
- **Skeleton loading states** for better user experience
- **Reusable components** including DataGrid layout, DashboardCard, and action menus
- **Material UI (MUI)** for modern, responsive UI components such as MUI X Datagrid
- **Zustand** for efficient state management across all entities
- **Axios** for API requests with centralized configuration
- **React Router** for client-side navigation
- **Form validation** with React Hook Form and comprehensive error handling
- **Fully theme-aware Light and Dark mode** with persistent theme preferences

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Spring Boot backend running at `http://localhost:8080`

### Install dependencies

```sh
npm install
```

### Run the frontend

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Configuration

The frontend expects the backend API at `http://localhost:8080`.  
You can change this in `src/api.ts`.

## Tech Stack

- [React](https://react.dev/) - Framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Material UI](https://mui.com/) - UI component library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Axios](https://axios-http.com/) - HTTP client
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Fuse.js](https://fusejs.io/) - Fuzzy search
- [React Router](https://reactrouter.com/) - Client-side routing
- [Day.js](https://day.js.org/) - Date manipulation for analytics
