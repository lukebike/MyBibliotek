import { useEffect, useState } from "react";
import api from "../../api";
import type { User } from "../../types/User/User";
import { getUserColumns } from "../../components/GetUserColumns";
import { useUserActionsMenu } from "../../hooks/useUserMenu";
import { useUserStore } from "../../store/userStore";
import { fuseConfigs } from "../../config/fuseConfigs";
import { useSearch } from "../../hooks/useSearch";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { DataGridLayout } from "../../components/DataGridLayout";

const GetUsers: React.FC = () => {
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const setUsers = useUserStore((state) => state.setUsers);
  const setLoading = useUserStore((state) => state.setLoading);
  const [searchTerm, setSearchTerm] = useState("");

  const { handleMenuOpen, UserMenu } = useUserActionsMenu();
  const columns = getUserColumns(handleMenuOpen);

  useEffect(() => {
    api
      .get<User[]>("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users: ", err))
      .finally(() => setLoading(false));
  }, [setUsers, setLoading]);

  const filteredUsers = useSearch(users, searchTerm, fuseConfigs.users);

  if (loading) return <LoadingSpinner />;

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
