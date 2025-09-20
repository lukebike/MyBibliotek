import { useEffect, useState } from "react";
import { useBookActionsMenu } from "../../hooks/menus/useBookMenu";
import { getBookColumns } from "../../components/Datagrid/GetBookColumns";

import { useBookStore } from "../../store/bookStore";
import { LoadingSpinner } from "../../components/Miscellaneous/LoadingSpinner";
import { fuseConfigs } from "../../config/fuseConfigs";
import { useSearch } from "../../hooks/useSearch";
import { DataGridLayout } from "../../components/Datagrid/DataGridLayout";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const GetBooks: React.FC = () => {
  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const setLoading = useBookStore((state) => state.setLoading);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const { handleMenuOpen, BookMenu } = useBookActionsMenu();
  const columns = getBookColumns(handleMenuOpen);

  useEffect(() => {
    if(books.length === 0) {
      fetchBooks().catch((err) => console.error("Error fetching books", err)).finally(() => setLoading(false));
    }
  }, [books.length, fetchBooks, setLoading]);

  const filteredBooks = useSearch(books, searchTerm, fuseConfigs.books);
  const { isAdmin } = useAuth();

  if (loading) return <LoadingSpinner />;
  if(!localStorage.getItem("jwt")) navigate("/login");

  return (
    <DataGridLayout
      title={isAdmin ? "Manage Books" : "Books"}
      addUrl={isAdmin ? "/books/post" : undefined}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      rows={filteredBooks}
      columns={columns}
      loading={loading}
    >
      {isAdmin && <BookMenu />}
    </DataGridLayout>
  );
};

export default GetBooks;
