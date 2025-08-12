# Library System Website

A full-stack library management system with a React + TypeScript frontend and a Spring Boot backend. View at: https://mybibliotek.netlify.app/

## Why Use This Website?

### **Modern & Intuitive**

- **Clean, responsive interface** built with Material UI that works seamlessly across desktop, tablet, and mobile devices
- **Real-time dashboard** providing instant insights into library operations, user activity, and book popularity
- **Dark/Light mode support** with persistent theme preferences for comfortable viewing in any environment

### **Data-Driven Insights**

- **Popular books tracking** to understand what books our customers love most
- **Overdue management** with clear visual indicators for late book returns
- **Growth metrics** to track our library's expansion over time

### **Enhanced User Experience**

- **Instant search** with fuzzy matching - find books, authors, or users even with partial or misspelled queries
- **Skeleton loading states** provide smooth, professional loading experiences
- **One-click actions** for common tasks like loan management and book returns
- **Responsive design** that adapts beautifully to any screen size

### **User-Friendly**

- **Complete CRUD operations** for all entities (Users, Books, Authors, Loans) with intuitive forms
- **Error handling** with clear feedback when something goes wrong

### **Performance & Reliability**

- **Client-side state management** with Zustand for lightning-fast interactions
- **Optimized loading** with lazy-loaded components and efficient data fetching
- **Modern tech stack** ensuring long-term maintainability and scalability
- **Full TypeScript** implementation for robust, bug-free operation

**Perfect for:** Public libraries, school libraries, corporate libraries, bookstores, or any organization that needs to track books and manage lending operations efficiently.

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
