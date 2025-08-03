# Library System Website

A full-stack library management system with a React + TypeScript + Vite frontend and a Spring Boot backend.

## Features

- **User, Author, and Book CRUD operations** with full Create, Read, Update, Delete functionality
- **Client-side search** with fuzzy search powered by Fuse.js
- **Skeleton loading states** for better user experience
- **Reusable components** including DataGrid layout and action menus
- **Material UI (MUI)** for modern, responsive UI components
- **Zustand** for efficient state management across all entities
- **Axios** for API requests with centralized configuration
- **React Router** for client-side navigation
- **Form validation** with React Hook Form and comprehensive error handling
- **Dark theme** with custom MUI theming

## In Progress

- **Integrating the loan system into the frontend**
- **Dashboard to display all library information**
- **Interchangable Light and Dark mode themes**
- **Pleasant mobile navigation experience**

## Architecture

### State Management

- **Zustand stores** for Users, Authors, and Books with built-in loading states
- **API calls integrated into stores** for centralized data fetching
- **Optimistic updates** for better user experience

### Search & Performance

- **Client-side fuzzy search** using Fuse.js with debounced input
- **Configurable search options** for different entity types
- **Skeleton loading** instead of spinners for better perceived performance

### Reusable Components

- **DataGridLayout** - Unified layout for all data tables
- **LoadingSpinner** - Skeleton components matching table structure
- **Custom hooks** for menu actions, search, and debouncing

## Project Structure

```
src/
  api.ts                  # Axios API instance and configuration
  App.tsx                 # Main app component with routing and theming
  components/             # Reusable UI components
    DataGridLayout.tsx    # Unified data table layout
    LoadingSpinner.tsx    # Skeleton loading component
    Get*Columns.tsx       # Column definitions for each entity
  config/                 # Configuration files
    fuseConfigs.ts        # Search configuration for Fuse.js
  hooks/                  # Custom React hooks
    useSearch.ts          # Search functionality with debouncing
    useDebounce.ts        # Generic debounce hook
    use*Menu.tsx          # Action menu hooks for each entity
  layout/                 # Layout components
    ResponsiveAppBar.tsx  # Navigation bar with responsive drawer
  routes/                 # Page components organized by feature
    users/                # User management pages
    authors/              # Author management pages
    books/                # Book management pages
  store/                  # Zustand state stores
    userStore.ts          # User state and API integration
    authorStore.ts        # Author state with fetchAuthors method
    bookStore.ts          # Book state management
  theme/                  # MUI theme customization
    themeStyles.ts        # Dark theme configuration
  types/                  # TypeScript type definitions
    User/                 # User-related types (User, CreateUser, UpdateUser)
    Author/               # Author-related types
    Book/                 # Book-related types
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

## Key Features Implemented

### Search Functionality

- **Fuzzy search** across multiple fields for each entity type
- **Debounced input** to prevent excessive API calls
- **Configurable search keys** per entity in `fuseConfigs.ts`

### Loading States

- **Skeleton loading** that matches the actual content structure
- **Loading states** managed in Zustand stores
- **Error handling** with user-friendly messages

### CRUD Operations

- **Create** new entities with form validation
- **Read** with paginated data grids and search
- **Update** existing entities with pre-populated forms
- **Delete** with confirmation dialogs and optimistic updates

### User Experience

- **Responsive design** with mobile-friendly navigation (in progress)
- **Dark theme** throughout the application
- **Snackbar notifications** for user feedback
- **Form validation** with helpful error messages

## Tech Stack

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Material UI](https://mui.com/) - UI component library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Axios](https://axios-http.com/) - HTTP client
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Fuse.js](https://fusejs.io/) - Fuzzy search
- [React Router](https://reactrouter.com/) - Client-side routing
