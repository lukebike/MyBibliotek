export interface DashboardStats {
  totalUsers: number;
  activeLoans: number;
  booksReturned: number;
  totalAuthors: number;
  overdueBooks: number;
  newMembers: number;
  collectionSize: number;
}

export interface UsageMetric {
  label: string;
  current: number;
  total: number;
}

export interface RecentLoan {
  id: number;
  user: {
    initials: string;
    name: string;
  };
  book: {
    title: string;
  };
  dueDate: string;
  status: "active" | "overdue";
}

export interface RecentReturn {
  id: number;
  user: {
    initials: string;
    name: string;
  };
  book: {
    title: string;
  };
  returnDate: string;
}
