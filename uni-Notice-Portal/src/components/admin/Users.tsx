import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { api } from "../../api/axios";
import { onAuthStateChanged } from "firebase/auth";
import { deleteUser } from "../services/user.service";

interface User {
  user_id: number;
  firebase_uid: string;
  name: string;
  email: string;
  role: string;
  faculty: string;
  academic_level: string;
  phone: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {

    if (!auth.currentUser) {
      console.log("User is not logged in yet.");
      return;
    }
      const idToken = await auth.currentUser?.getIdToken();

      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

async function handleDelete(firebaseUid: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    await deleteUser(firebaseUid);

    fetchUsers();

    alert("User deleted successfully.");
  } catch (error) {
    console.error(error);

    alert("Failed to delete user.");
  }
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {

    if (user) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  });

  return unsubscribe;
}, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="overflow-x-auto">

        <table className="min-w-full border border-gray-300">

          <thead className="bg-sky-700/80 text-white">

            <tr>
              <th className="p-3 border">User Id</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Faculty</th>
              <th className="p-3 border">Academic Level</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Firebase Id</th>
              <th className="p-3 border">Action</th>
            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td
                  colSpan={7}
                  className="text-center p-6"
                >
                  No users found.
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user.user_id}
                  className="hover:bg-gray-100"
                >
                  <td className="border p-3">
                    {user.user_id}
                  </td>
                  <td className="border p-3">
                    {user.name}
                  </td>

                  <td className="border p-3">
                    {user.email}
                  </td>

                  <td className="border p-3">
                    {user.role}
                  </td>

                  <td className="border p-3">
                    {user.faculty}
                  </td>

                  <td className="border p-3">
                    {user.academic_level}
                  </td>

                  <td className="border p-3">
                    {user.phone}
                  </td>

                  <td className="border p-3">
                    {user.firebase_uid}
                  </td>

                  <td className="border p-3 text-center">
                    <button
                      onClick={() =>
                        handleDelete(user.firebase_uid)
                      }
                      className="bg-red-600 text-white px-2 py-2 rounded-xl hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}