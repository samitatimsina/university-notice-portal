import { useEffect, useState } from "react";
import { api } from "../../api/axios";

interface Notice {
  notice_id: number;
  title: string;
  created_at: string;
}

interface Event {
  event_id: number;
  title: string;
  event_date: string;
  venue: string;
}

interface Holiday {
  holiday_id: number;
  title: string;
  holiday_date: string;
}

export default function Dashboard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const [noticeRes, eventRes, holidayRes] = await Promise.all([
        api.get("/student/notices"),
        api.get("/student/event"),
        api.get("/student/holiday"),
      ]);

      setNotices(noticeRes.data);
      setEvents(eventRes.data);
      setHolidays(holidayRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Student Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Welcome to the University Notice Portal
        </p>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white text-black rounded-xl p-6 shadow">
          <h2 className="text-lg">📢 Notices</h2>

          <p className="text-4xl font-bold mt-3">
            {notices.length}
          </p>
        </div>

        <div className="bg-white text-black rounded-xl p-6 shadow">
          <h2 className="text-lg">📅 Events</h2>

          <p className="text-4xl font-bold mt-3">
            {events.length}
          </p>
        </div>

        <div className="bg-white text-black rounded-xl p-6 shadow">
          <h2 className="text-lg">🎉 Holidays</h2>

          <p className="text-4xl font-bold mt-3">
            {holidays.length}
          </p>
        </div>

      </div>

      {/* Latest Notices */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Latest Notices
        </h2>

        {notices.slice(0, 5).map((notice) => (
          <div
            key={notice.notice_id}
            className="border-b py-3"
          >
            <p className="font-semibold">
              {notice.title}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(notice.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}

      </div>

      {/* Events */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Upcoming Events
        </h2>

        {events.slice(0, 5).map((event) => (

          <div
            key={event.event_id}
            className="border-b py-3"
          >
            <p className="font-semibold">
              {event.title}
            </p>

            <p className="text-gray-600">
              📍 {event.venue}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(event.event_date).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

      {/* Holidays */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Upcoming Holidays
        </h2>

        {holidays.slice(0, 5).map((holiday) => (

          <div
            key={holiday.holiday_id}
            className="border-b py-3"
          >
            <p className="font-semibold">
              {holiday.title}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(
                holiday.holiday_date
              ).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}