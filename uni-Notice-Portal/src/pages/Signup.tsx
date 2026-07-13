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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { api } from "../api/axios";
// import { signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    console.log(result.user);
  } catch (err) {
    console.log(err);
  }
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [faculty, setFaculty] = useState("");
  const [academic_level, setAcademicLevel] = useState("");
  const [phone, setPhone] = useState("");

  const register = async () => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const token = await credential.user.getIdToken();
    const response = await api.post(
      "/signup",
      {
        name,
        role,
        faculty,
        phone,
        academic_level,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register();

      navigate("/student/home");
      console.log("registration successfull");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden lg:flex w-1/2 bg-blue-400 text-white flex-col justify-center px-20 relative overflow-hidden">
        <img
          src="/uni-background.jpg"
          alt="uni-background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Optional blue overlay */}
        <div className="absolute inset-0 bg-[#0F2B63]/75"></div>

        {/* Content */}
        <div className="relative z-10 mb-25">
          {/* Logo & Heading */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen size={48} strokeWidth={1.8} />

              <h1 className="text-4xl font-bold">University Notice Portal</h1>
            </div>

            <p className="text-lg opacity-90">
              Manage university notices, announcements, academic events and
              notifications from one centralized platform.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CalendarDays size={30} />
                <h3 className="font-semibold text-2xl">Stay Updated</h3>
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

              <p className="opacity-90 ml-11">Get notified instantly.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users size={30} />
                <h3 className="font-semibold text-2xl">Secure Access</h3>
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
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-5">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Create New User!!</h2>

            <p className="text-gray-500 mt-1">Sign up to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Full Name</label>

              <div className="mt-2 flex items-center border rounded-lg px-3">
                <User size={18} className="text-gray-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-1 outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium mb-2">Role</label>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border rounded-lg p-1"
                  required
                >
                  <option value="student">Student</option>
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label className="text-sm font-medium mb-2">Faculty</label>

                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="border rounded-lg p-1"
                >
                  <option value="Select">Select</option>
                  <option value="bsccsit">BSc CSIT</option>
                  <option value="bca">BCA</option>
                  <option value="bim">BIM</option>
                  <option value="bsc">BSc</option>
                  <option value="bbs">BBS</option>
                  <option value="bba">BBA</option>
                </select>
              </div>
            </div>

            {faculty === "bbs" || faculty === "bba" ? (
              <div>
                <label className="text-sm font-medium">Year</label>

                <select
                  value={academic_level}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="mt-2 w-full border rounded-lg p-3"
                >
                  <option value="">Select Year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium">Semester</label>

                <select
                  value={academic_level}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="mt-2 w-full border rounded-lg p-3"
                >
                  <option value="">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Phone</label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full border rounded-lg p-1 mt-2"
                required
              />
            </div>

            {/* Username */}

            <div>
              <label className="text-sm font-medium">Email</label>

              <div className="mt-2 flex items-center border rounded-lg px-1">
                <User size={18} className="text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-1 outline-none"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-medium">Password</label>

              <div className="mt-2 flex items-center border rounded-lg px-1">
                {/* <Lock size={18} className="text-gray-400" /> */}

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-1 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember */}

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
              >
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </button>
            </div>

            {/* signup */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition"
            >
              {loading ? "Signing In..." : "Sign Up"}
            </button>

            <div className="text-center text-sm">
              <h3 className="text-lg font-semibold text-black">OR</h3>
              <button
                onClick={loginWithGoogle}
                className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <FcGoogle size={22} />
                Continue with Google
              </button>
              <div>
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign In
              </Link>
              </div>
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
