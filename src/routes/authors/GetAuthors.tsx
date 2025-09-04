import { useEffect, useState } from "react";
import api from "../../api";
import type { Author } from "../../types/authors/Author";
import { getAuthorColumns } from "../../components/Datagrid/GetAuthorColumns";
import { useAuthorActionsMenu } from "../../hooks/menus/useAuthorMenu";
import { DataGridLayout } from "../../components/Datagrid/DataGridLayout";
import { useSearch } from "../../hooks/useSearch";
import { useAuthorStore } from "../../store/authorStore";
import { fuseConfigs } from "../../config/fuseConfigs";
import { LoadingSpinner } from "../../components/Miscellaneous/LoadingSpinner";
import { useNavigate } from "react-router";

export default function GetAuthors() {
  const { handleMenuOpen, AuthorMenu } = useAuthorActionsMenu();
  const authors = useAuthorStore((state) => state.authors);
  const loading = useAuthorStore((state) => state.loading);
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const setLoading = useAuthorStore((state) => state.setLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const columns = getAuthorColumns(handleMenuOpen);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get<Author[]>("/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((err) => {
        console.error("Error fetching authors", err);
        if(err.response?.status === 401){
          navigate("/login")
        }
      })
      .finally(() => setLoading(false));
  }, [setAuthors, setLoading, navigate]);

 
  const filteredAuthors = useSearch(authors, searchTerm, fuseConfigs.authors);

  if (loading || !authors) {
    return <LoadingSpinner />;
  }

  return (
    <DataGridLayout
      title="Manage Authors"
      addUrl="/authors/post"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      rows={filteredAuthors}
      columns={columns}
      loading={loading}
    >
      <AuthorMenu />
    </DataGridLayout>
  );
}
