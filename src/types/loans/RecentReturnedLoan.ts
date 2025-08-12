export interface RecentReturnedLoan {
  id: number;
  user: { initials: string; name: string };
  book: { title: string };
  returnDate: string;
}
