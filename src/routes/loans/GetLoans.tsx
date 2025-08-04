import { useEffect, useState } from "react";
import api from "../../api";

import { useLoanActionsMenu } from "../../hooks/menus/useBookMenu";
import { getLoanColumns } from "../../components/GetBookColumns";

import { useLoanStore } from "../../store/bookStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { fuseConfigs } from "../../config/fuseConfigs";
import { useSearch } from "../../hooks/useSearch";
import { DataGridLayout } from "../../components/DataGridLayout";

const GetBooks: React.FC = () => {
  const loan = useLoanStore((state) => state.loans);
  const loading = useLoanStore((state) => state.loading);
  const setLoans = useLoanStore((state) => state.setLoans);
  const setLoading = useLoanStore((state) => state.setLoading);

  const [searchTerm, setSearchTerm] = useState("");

  const { handleMenuOpen, BookMenu } = useLoanActionsMenu();
  const columns = getLoanColumns(handleMenuOpen);

  useEffect(() => {
    api
      .get("/loans", {})
      .then((res) => {
        console.log(res.data);
        setLoans(res.data);
      })
      .catch((err) => console.error("Error fetching loans: ", err))
      .finally(() => setLoading(false));
  }, [setLoans, setLoading]);

  const filteredBooks = useSearch(loans, searchTerm, fuseConfigs.loans);

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
