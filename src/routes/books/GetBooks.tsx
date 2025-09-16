import { useEffect, useState } from "react";
import { useBookActionsMenu } from "../../hooks/menus/useBookMenu";
import { getBookColumns } from "../../components/Datagrid/GetBookColumns";

import { useBookStore } from "../../store/bookStore";
import { LoadingSpinner } from "../../components/Miscellaneous/LoadingSpinner";
import { fuseConfigs } from "../../config/fuseConfigs";
import { useSearch } from "../../hooks/useSearch";
import { DataGridLayout } from "../../components/Datagrid/DataGridLayout";

const GetBooks: React.FC = () => {
  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const setLoading = useBookStore((state) => state.setLoading);

  const [searchTerm, setSearchTerm] = useState("");

  const { handleMenuOpen, BookMenu } = useBookActionsMenu();
  const columns = getBookColumns(handleMenuOpen);

  useEffect(() => {
    if(books.length === 0) {
      fetchBooks().catch((err) => console.error("Error fetching books", err)).finally(() => setLoading(false));
    }
  }, [books.length, fetchBooks, setLoading]);

  const filteredBooks = useSearch(books, searchTerm, fuseConfigs.books);

  if (loading) return <LoadingSpinner />;

  return (
    <DataGridLayout
      title="Manage Books"
      addUrl="/books/post"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      rows={filteredBooks}
      columns={columns}
      loading={loading}
    >
      <BookMenu />
    </DataGridLayout>
  );
};

export default GetBooks;
