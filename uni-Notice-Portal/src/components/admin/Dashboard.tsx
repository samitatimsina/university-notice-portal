import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { auth, messaging } from "../../firebase/firebase";
import { api } from "../../api/axios";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  Users,
  UserCheck,
  UserX,
  Bell,
  Calendar,
  ClipboardList,
  ShieldCheck,
  Activity,
} from "lucide-react";

  interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers:number;
  }
  interface Notice {
  notice_id: number;
  title: string;
  created_at: string;
}

const Dashboard = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          return;
        }

        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        if (!token) {
          return;
        }

        const idToken = await auth.currentUser?.getIdToken();

        await api.put(
          "/users/fcm-token",
          {
            fcm_token: token,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Failed to update FCM token:", error);
      }
    };
    

    setupNotifications();
  }, []);

    const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });
  const { user, loading:authLoading } = useAuthStore();

useEffect(() => {

  if (authLoading) return;

  if (!user) return;

  const fetchDashboard = async () => {

    try {

      const token = await user.getIdToken();

      const response = await api.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {
      console.error(error);
    }

  };

  fetchDashboard();

}, [authLoading, user]);

useEffect(() => {
  const fetchRecentNotices = async () => {
    try {
      const token = await user?.getIdToken();

      const response = await api.get("/admin/notices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotices(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    fetchRecentNotices();
  }
}, [user]);




  return (
  <div className="p-8 bg-gray-100 min-h-screen">

    {/* Header */}

    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back! Here's today's overview.
        </p>
      </div>
    </div>

    {/* Statistics */}

    <div className="grid lg:grid-cols-3 gap-6">

      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.totalUsers}
          </h2>
        </div>

        <Users className="text-blue-600" size={42} />
      </div>

      <div className="bg-green-50 rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <p className="text-green-700">Active Users</p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.activeUsers}
          </h2>
        </div>

        <UserCheck className="text-green-600" size={42} />
      </div>

      <div className="bg-red-50 rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <p className="text-red-700">Inactive Users</p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.inactiveUsers}
          </h2>
        </div>

        <UserX className="text-red-600" size={42} />
      </div>

    </div>

    {/* Second Row */}

    <div className="grid lg:grid-cols-2 gap-6 mt-8">

      {/* Today's Summary */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Today's Summary
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Active Users</span>
            <span className="font-semibold">
              {stats.activeUsers}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Registered</span>
            <span className="font-semibold">
              {stats.totalUsers}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Inactive Users</span>
            <span className="font-semibold">
              {stats.inactiveUsers}
            </span>
          </div>

        </div>

      </div>

      {/* System Status */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          System Status
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between items-center">
            <span>Firebase</span>

            <span className="text-green-600 flex items-center gap-2">
              <ShieldCheck size={18} />
              Online
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>Database</span>

            <span className="text-green-600 flex items-center gap-2">
              <ShieldCheck size={18} />
              Connected
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>Notification Service</span>

            <span className="text-green-600 flex items-center gap-2">
              <Bell size={18} />
              Running
            </span>
          </div>

        </div>

      </div>

    </div>

    {/* Quick Actions */}

    <div className="mt-8">

      <h2 className="text-xl font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        <Link
          to="/admin/users"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-6 shadow transition"
        >
          <Users size={34} />

          <h3 className="mt-4 font-semibold text-lg">
            Manage Users
          </h3>

          <p className="text-sm opacity-90 mt-1">
            View and manage all users.
          </p>

        </Link>

        <Link
          to="/admin/notices"
          className="bg-green-700 hover:bg-green-600 text-white rounded-xl p-6 shadow transition"
        >
          <ClipboardList size={34} />

          <h3 className="mt-4 font-semibold text-lg">
            Manage Notices
          </h3>

          <p className="text-sm opacity-90 mt-1">
            Create and edit notices.
          </p>

        </Link>

        <Link
          to="/admin/holiday"
          className=" bg-[#2078ba] text-white rounded-xl p-6 shadow transition"
        >
          <Calendar size={34} />

          <h3 className="mt-4 font-semibold text-lg">
            Holiday Events
          </h3>

          <p className="text-sm opacity-90 mt-1">
            Add university holidays.
          </p>

        </Link>

      </div>

    </div>

    {/* Recent Activity */}

    <div className="mt-8 bg-white rounded-xl shadow p-6">

      <div className="flex items-center gap-2 mb-5">

        <Activity className="text-blue-600" />

        <h2 className="text-xl font-semibold">
          Recent Notices
        </h2>

      </div>

      <div className="space-y-4 text-gray-600">

        <div className="border-t pb-3">
          {notices.slice(0, 3).map((notice) => (
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
      </div>

    </div>

  </div>
);
};


export default Dashboard;