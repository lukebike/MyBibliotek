import { useEffect, useState } from "react";
import api from "../api";
import type { User } from "../types/User";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<User[]>("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users: ", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.firstName} {u.lastName} ({u.email}) - Registered:{" "}
            {u.registrationDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
