import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  LoaderCircle,
  Pencil,
  Trash2
} from "lucide-react";

import NoticeDetailsCard from "../../../../pages/NoticeDetailsCard";
import StatsCard from "../../StatsCard";

import {
  deleteNotice,
  getNoticeById,
  getNoticeStats
} from "../../../services/notice.service";

import type {
  Notice,
  NoticeStats,
} from "../../../../types/notice";

export default function AdminNoticeDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [notice, setNotice] =
    useState<Notice>();

  const [stats, setStats] =
    useState<NoticeStats>();

  useEffect(() => {
    loadNotice();
  }, []);

  async function loadNotice() {

    try {

      setLoading(true);

      const [noticeData, statData] =
        await Promise.all([
          getNoticeById(id!),
          getNoticeStats(id!),
        ]);

      setNotice(noticeData);

      setStats(statData);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {

    if (
      !window.confirm(
        "Delete this notice?"
      )
    )
      return;

    await deleteNotice(id!);

    navigate("/admin/notices");
  }

  // async function handleRepublish() {

  //   await resendNotification(id!);

  //   alert("Notification Sent.");
  // }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">

        <LoaderCircle
          className="animate-spin"
          size={45}
        />

      </div>
    );

  if (!notice || !stats)
    return <h2>Notice not found.</h2>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-5 text-blue-600"
      >
        <ArrowLeft size={18} />

        Back
      </button>

      <div className="grid lg:grid-cols-4 gap-5 mb-8">

        <StatsCard
          title="Target Users"
          value={stats.totalUsers}
        />

        <StatsCard
          title="Delivered"
          value={stats.delivered}
        />

        <StatsCard
          title="Read"
          value={stats.read}
        />

        <StatsCard
          title="Unread"
          value={stats.unread}
        />

      </div>

      <NoticeDetailsCard
        notice={notice}
        isAdmin
      >

        <div className="border-t p-6 bg-white flex gap-3">

          <button
            onClick={() =>
              navigate(
                `/admin/notices/edit/${notice.notice_id}`
              )
            }
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >

            <Pencil size={18} />

            Edit

          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg"
          >

            <Trash2 size={18} />

            Delete

          </button>

          {/* <button
            onClick={handleRepublish}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg"
          >

            <Send size={18} />

            Republish

          </button> */}

        </div>

      </NoticeDetailsCard>

    </div>
  );
}