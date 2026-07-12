import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { api } from "../../api/axios";
import { Link } from "react-router-dom";

interface Notice {
  notice_id: number;
  title: string;
  faculty: string;
  priority: string;
  created_at: string;
}

export default function StudentNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

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

    const response = await api.get("/student/notices", {
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


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Notices</h1>

          <p className="text-gray-500 mt-2">
            View university notices.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Faculty</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Published</th>
              <th className="p-4 text-left">Action</th>
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
                  <td className="p-4 border-t">
                    <Link to={`/student/notices/${notice.notice_id}`}
                    className="bg-blue-400 text-white rounded p-2">
                      View
                    </Link>
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