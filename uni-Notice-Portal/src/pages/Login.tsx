import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Bell,
  CalendarDays,
  Users,
  BookOpen,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { api } from "../api/axios";

const login = async (email: string, password: string) => {
  // Firebase Login
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Firebase ID Token
  const token = await credential.user.getIdToken();
  console.log("test token:",token);

  // Get user details (role) from backend
  const response = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  if (rememberMe) {
     setPersistence(
        auth,
        browserLocalPersistence
    );
}
else {
     setPersistence(
        auth,
        browserSessionPersistence
    );
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await login(email, password);
      localStorage.setItem("role", user.role);

      console.log("Logged in user:", user);

      if (user.role === "Admin") {
  console.log("Navigating to admin...");
  navigate("/admin/dashboard");
} else {
  console.log("Navigating to student...");
  navigate("/student/home");
}
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-blue-400 text-white flex-col justify-center px-20 relative overflow-hidden">
        <img
          src="/uni-background.jpg"
          alt="uni-background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0F2B63]/75"></div>

        <div className="relative z-10">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen size={48} strokeWidth={1.8} />

              <h1 className="text-4xl font-bold">
                University Notice Portal
              </h1>
            </div>

            <p className="text-lg opacity-90">
              Manage university notices, announcements, academic events and
              notifications from one centralized platform.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CalendarDays size={30} />

                <h3 className="font-semibold text-2xl">
                  Stay Updated
                </h3>
              </div>

              <p className="opacity-90 ml-11">
                Receive important academic announcements instantly.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Bell size={30} />

                <h3 className="font-semibold text-2xl">
                  Real Time Notifications
                </h3>
              </div>

              <p className="opacity-90 ml-11">
                Get notified instantly.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users size={30} />

                <h3 className="font-semibold text-2xl">
                  Secure Access
                </h3>
              </div>

              <p className="opacity-90 ml-11">
                Login using your university credentials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}

      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}

            <div>
              <label className="text-sm font-medium">
                Email
              </label>

              <div className="mt-2 flex items-center border rounded-lg px-3">
                <User
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-medium">
                Password
              </label>

              <div className="mt-2 flex items-center border rounded-lg px-3">
                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter password"
                  className="w-full p-3 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e)=>setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <Link
                to="/student/forgot-password"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

            <div className="text-center mt-4 text-sm">
              <span className="text-gray-600">
                Don't have an account?{" "}
              </span>

              <Link
                to="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>

          <div className="text-center mt-8 text-gray-500 text-sm">
            © 2026 University Notice Portal
          </div>
        </div>
      </div>
    </div>
  );
}