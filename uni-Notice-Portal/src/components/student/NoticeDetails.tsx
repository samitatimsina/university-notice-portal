import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";

import NoticeDetailsCard from "../../pages/NoticeDetailsCard";
import { getStudentNoticeById, markNoticeAsRead } from "../services/notice.service";
import type { Notice } from "../../types/notice";
import { useAuthStore } from "../../store/authStore";

export default function NoticeDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [notice, setNotice] = useState<Notice>();

  const [error, setError] = useState("");

const { user, loading: authLoading } = useAuthStore();

useEffect(() => {
  if (authLoading) return;

  if (!user) return;

  loadNotice();
}, [authLoading, user, id]);

async function loadNotice() {
  if (!id) {
    setError("Invalid notice ID.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const notice = await getStudentNoticeById(id);

    setNotice(notice);

    // Mark as read after successfully loading
    await markNoticeAsRead(id);

  } catch (error) {
    console.error("Failed to load notice:", error);

    setError("Unable to load notice.");

  } finally {
    setLoading(false);
  }
}

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <LoaderCircle
          size={40}
          className="animate-spin text-blue-600"
        />
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-600">
        {error}
      </div>
    );

  if (!notice)
    return (
      <div className="text-center mt-20">
        Notice not found.
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-5xl mx-auto mb-5">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
    onClick={() =>
        navigate("/student/notices")
    }
>
</button>

      </div>

      <NoticeDetailsCard notice={notice} />

    </div>
  );
}