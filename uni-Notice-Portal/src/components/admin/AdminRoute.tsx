import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function AdminRoute() {
  const role = localStorage.getItem("role");

  const { user, loading:authLoading } = useAuthStore();

if (authLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

if (!user) {
  return <Navigate to="/" replace />;
}

  if (role !== "Admin") {
    return <Navigate to="/student/home" replace/>;
  }

  return <Outlet />;
}