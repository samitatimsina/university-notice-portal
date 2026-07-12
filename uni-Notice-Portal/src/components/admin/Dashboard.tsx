import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { auth, messaging } from "../../firebase/firebase";
import { api } from "../../api/axios";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

  interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers:number;
  }

const Dashboard = () => {
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




  return (
  <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-gray-500">
            Total Users
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalUsers}
          </p>

        </div>

        <div className="bg-green-100 shadow rounded-xl p-6">

          <h2 className="text-green-700">
            Active Users
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.activeUsers}
          </p>

        </div>

        <div className="bg-red-100 shadow rounded-xl p-6">

          <h2 className="text-red-700">
            Inactive Users
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.inactiveUsers}
          </p>

        </div>

      </div>

      

      <div>
        <h3 className="font-bold text-md mt-2"> Quick Actions</h3>
        <div>
        <Link
        to="/admin/users"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Manage Users
      </Link>
      </div>
      <div>
          <Link
        to="/admin/notices"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Notices
      </Link>
      </div>
      <div>
          <Link
        to="/admin/holiday"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Holiday
      </Link>
      </div>
      </div>
      </div>
  );
};


export default Dashboard;