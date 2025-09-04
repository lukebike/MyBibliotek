import { useEffect, useState } from "react";
import api from "../../api";

import { useLoanActionsMenu } from "../../hooks/menus/useLoanMenu";
import { getLoanColumns } from "../../components/Datagrid/GetLoanColumns";

import { useLoanStore } from "../../store/loanStore";
import { LoadingSpinner } from "../../components/Miscellaneous/LoadingSpinner";
import { fuseConfigs } from "../../config/fuseConfigs";
import { useSearch } from "../../hooks/useSearch";
import { DataGridLayout } from "../../components/Datagrid/DataGridLayout";

const GetBooks: React.FC = () => {
  const loans = useLoanStore((state) => state.loans);
  const loading = useLoanStore((state) => state.loading);
  const setLoans = useLoanStore((state) => state.setLoans);
  const setLoading = useLoanStore((state) => state.setLoading);

  const [searchTerm, setSearchTerm] = useState("");

  const { handleMenuOpen, LoanMenu } = useLoanActionsMenu();
  const columns = getLoanColumns(handleMenuOpen);

  useEffect(() => {
    api
      .get("/loans", {})
      .then((res) => {
        setLoans(res.data);
      })
      .catch((err) => console.error("Error fetching loans: ", err))
      .finally(() => setLoading(false));
  }, [setLoans, setLoading]);

  const filteredLoans = useSearch(loans, searchTerm, fuseConfigs.loans);

  if (loading) return <LoadingSpinner />;

  return (
    <DataGridLayout
      title="Manage Loans"
      addUrl="/loans/post"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      rows={filteredLoans}
      columns={columns}
      loading={loading}
    >
      <LoanMenu />
    </DataGridLayout>
  );
};

export default GetBooks;
