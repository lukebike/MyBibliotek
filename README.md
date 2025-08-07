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

## In Progress

- **Pleasant mobile navigation experience**
- **Enhanced dashboard analytics** with more detailed library insights

## Architecture

### Dashboard System

- **Real-time metrics calculation** using dayjs for date handling
- **User growth tracking** with monthly percentage calculations
- **Dashboard cards** with growth indicators
- **Recent activity tables** for loans and returns

### State Management

- **Zustand stores** for Users, Authors, Books, and Loans with built-in loading states
- **API calls integrated into stores** for centralized data fetching
- **Optimistic updates** for better user experience
- **Custom hooks** for business logic like user growth calculations

### Search & Performance

- **Client-side fuzzy search** using Fuse.js with debounced input
- **Configurable search options** for different entity types
- **Skeleton loading** instead of spinners for better perceived performance

### Theme System

- **Light and Dark theme toggle** with Material UI
- **Theme persistence** using localStorage

## Project Structure

```
src/
  api.ts                  # Axios API instance and configuration
  App.tsx                 # Main app component with routing and theming
  components/             # Reusable UI components
    DataGridLayout.tsx    # Unified data table layout
    DashboardCard.tsx     # Dashboard metric cards with growth indicators
    ProgressBar.tsx       # Theme-aware progress indicators
    LoadingSpinner.tsx    # Skeleton loading component
    GetColumns.tsx        # Column definitions for each entity
  config/                 # Configuration files
    fuseConfigs.ts        # Search configuration for Fuse.js
  context/                # React context providers
    ThemeContext.tsx      # Theme context definition
    ThemeContextProvider.tsx # Theme state provider with persistence
  hooks/                  # Custom React hooks
    useSearch.ts          # Search functionality with debouncing
    useDebounce.ts        # Generic debounce hook
    useThemeContext.ts    # Theme context hook
    getUserGrowth.ts      # User analytics and growth calculations
    menus/                # Action menu hooks for each entity
      useUserMenu.tsx     # User action menu
      useAuthorMenu.tsx   # Author action menu
      useBookMenu.tsx     # Book action menu
      useLoanMenu.tsx     # Loan action menu
  layout/                 # Layout components
    ResponsiveAppBar.tsx  # Navigation bar with theme toggle & responsive drawer
    Dashboard.tsx         # Main dashboard with metrics and analytics
  routes/                 # Page components organized by feature
    users/                # User management pages
    authors/              # Author management pages
    books/                # Book management pages
    loans/                # Loan management pages
  store/                  # Zustand state stores
    userStore.ts          # User state management
    authorStore.ts        # Author state management
    bookStore.ts          # Book state management
    loanStore.ts          # Loan state management
  theme/                  # MUI theme customization
    themeStyles.ts        # Light and dark theme configurations
  types/                  # TypeScript type definitions
    users/                # User-related types
    authors/              # Author-related types
    books/                # Book-related types
    loans/                # Loan-related types
    DashboardStats.ts     # Dashboard and analytics type definitions
```

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

### Build for production

```sh
npm run build
```

## API Configuration

The frontend expects the backend API at `http://localhost:8080`.  
You can change this in `src/api.ts`.

## Key Features Implemented

### Dashboard Analytics

- **User growth tracking** with monthly percentage calculations based on registration dates
- **Dynamic metric cards** showing total users, active loans, books returned, and collection statistics
- **Progress indicators** for library usage metrics and popular book tracking
- **Recent activity tables** displaying recent loans and returns

### Search Functionality

- **Fuzzy search** across multiple fields for each entity type
- **Nested object searching** (e.g., loan search includes user names and book titles)
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

### Loan Management

- **Loan tracking** with borrower and book information
- **Extend loan functionality** with automatic due date updates
- **Success notifications** using Material UI Snackbars
- **Data consistency** ensuring UI updates reflect backend changes

### User Experience

- **Responsive design** with mobile-friendly navigation (in progress)
- **Snackbar notifications** for user feedback
- **Form validation** with helpful error messages
- **Smooth theme transitions** throughout the application
- **Dashboard metrics** providing valuable and easy to read insights

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
