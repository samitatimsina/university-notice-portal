import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);

        localStorage.removeItem("role");

        navigate("/", { replace: true });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold">
        Signing out...
      </h2>
    </div>
  );
}