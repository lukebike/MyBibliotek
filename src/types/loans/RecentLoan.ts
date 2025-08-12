export interface RecentLoan {
  id: number;
  user: { initials: string; name: string };
  book: { title: string };
  dueDate: string;
  status: string;
}
