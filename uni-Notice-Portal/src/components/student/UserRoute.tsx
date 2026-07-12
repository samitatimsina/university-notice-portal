import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function UserRoute() {
  const role = localStorage.getItem("role");
  const { user, loading:authLoading } = useAuthStore();
  if (authLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

  if (!role) {
    return <Navigate to="/" />;
  }
  if(!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}