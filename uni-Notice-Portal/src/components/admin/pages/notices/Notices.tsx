import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../../api/axios";
import { auth } from "../../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { deleteNotice } from "../../../services/notice.service";

interface Notice {
  notice_id: number;
  title: string;
  faculty: string;
  priority: string;
  created_at: string;
}

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate();

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchNotices();
    } else {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

  const fetchNotices = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();

    const response = await api.get("/admin/notices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotices(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

async function handleDelete(id: number) {
  if (!window.confirm("Delete this notice?")) return;

  try {
    await deleteNotice(id.toString());

    setNotices((prev) =>
      prev.filter((notice) => notice.notice_id !== id)
    );
  } catch (error) {
    console.error(error);
  }
}


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Notices</h1>

          <p className="text-gray-500 mt-2">
            Manage university notices.
          </p>
        </div>

        <Link
          to="/admin/notices/create"
          className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
        >
          + Create Notice
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Faculty</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Published</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : notices.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No notices available.
                </td>
              </tr>
            ) : (
              notices.map((notice) => (
                <tr key={notice.notice_id}>
                  <td className="p-4 border-t">{notice.title}</td>
                  <td className="p-4 border-t">{notice.faculty}</td>
                  <td className="p-4 border-t">{notice.priority}</td>
                  <td className="p-4 border-t">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-t gap-2">
                    <button className="bg-blue-600 p-2 mr-2 rounded-lg text-white">
                      Edit
                    </button>

                    <button 
                    onClick={() => handleDelete(notice.notice_id)}
                    className="bg-red-600 rounded-lg mr-2 p-2 ">
                      Delete
                    </button>
                    <button className="bg-amber-200 rounded-lg text-black mr-2 p-2 "
                      onClick={() =>
                          navigate(`/admin/notices/${notice.notice_id}`)
                      }
                  >
                      View
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