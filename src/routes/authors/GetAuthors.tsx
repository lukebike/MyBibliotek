import { useEffect, useState } from "react";
import { getAuthorColumns } from "../../components/Datagrid/GetAuthorColumns";
import { useAuthorActionsMenu } from "../../hooks/menus/useAuthorMenu";
import { DataGridLayout } from "../../components/Datagrid/DataGridLayout";
import { useSearch } from "../../hooks/useSearch";
import { useAuthorStore } from "../../store/authorStore";
import { fuseConfigs } from "../../config/fuseConfigs";
import { LoadingSpinner } from "../../components/Miscellaneous/LoadingSpinner";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function GetAuthors() {
  const { handleMenuOpen, AuthorMenu } = useAuthorActionsMenu();
  const authors = useAuthorStore((state) => state.authors);
  const loading = useAuthorStore((state) => state.loading);
  const fetchAuthors = useAuthorStore((state) => state.fetchAuthors);
  const [searchTerm, setSearchTerm] = useState("");
  const columns = getAuthorColumns(handleMenuOpen);
  const navigate = useNavigate();
  useEffect(() => {
    if (authors.length === 0) {
      fetchAuthors().catch((err) => {
        console.error("Error fetching authors", err);
      });
    }
  }, [authors.length, fetchAuthors, navigate]);

 
  const filteredAuthors = useSearch(authors, searchTerm, fuseConfigs.authors);
  const { isAdmin } = useAuth();

  if (loading || !authors) {
    return <LoadingSpinner />;
  }
  if(!localStorage.getItem("jwt")) navigate("/login");

  return (
    <DataGridLayout
      title={isAdmin ? "Manage Authors" : "Authors"}
      addUrl={isAdmin ? "/authors/post" : undefined}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      rows={filteredAuthors}
      columns={columns}
      loading={loading}
    >
      {isAdmin && <AuthorMenu />}
    </DataGridLayout>
  );
}
