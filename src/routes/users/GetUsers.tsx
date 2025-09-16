import { useEffect, useState } from "react";
import { getUserColumns } from "../../components/Datagrid/GetUserColumns";
import { useUserActionsMenu } from "../../hooks/menus/useUserMenu";
import { useUserStore } from "../../store/userStore";
import { fuseConfigs } from "../../config/fuseConfigs";
import { useSearch } from "../../hooks/useSearch";
import { LoadingSpinner } from "../../components/Miscellaneous/LoadingSpinner";
import { DataGridLayout } from "../../components/Datagrid/DataGridLayout";
import { useNavigate } from "react-router";

const GetUsers: React.FC = () => {
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const { handleMenuOpen, UserMenu } = useUserActionsMenu();
  const columns = getUserColumns(handleMenuOpen);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers().catch((err) => console.error("Error fetching users: ", err)).finally(() => setLoading(false));
    }
  }, [users.length, fetchUsers, setLoading]);

  const filteredUsers = useSearch(users, searchTerm, fuseConfigs.users);

  if (loading) return <LoadingSpinner />;
  if(!localStorage.getItem("jwt")) navigate("/login")

  return (
    <DataGridLayout
      title="Manage Users"
      addUrl="/users/post"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      rows={filteredUsers}
      columns={columns}
      loading={loading}
    >
      <UserMenu />
    </DataGridLayout>
  );
};

export default GetUsers;
