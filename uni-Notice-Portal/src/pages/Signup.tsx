import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Bell,
  CalendarDays,
  Users,
  BookOpen,
  Mail,
  Phone,
  GraduationCap,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import { auth } from "../firebase/firebase";
import { api } from "../api/axios";

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
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useState("student");
  const [faculty, setFaculty] = useState("");
  const [academic_level, setAcademicLevel] = useState("");
  const [phone, setPhone] = useState("");

  const register = async () => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await credential.user.getIdToken();

    await api.post(
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
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register();

      navigate("/student/home");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden text-white">

        <img
          src="/uni-background.jpg"
          alt="University"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0F2B63]/80" />

        <div className="relative z-10 flex flex-col justify-center px-16">

          <div className="flex items-center gap-4 mb-8">
            <BookOpen size={42} />
            <h1 className="text-4xl font-bold">
              University Notice Portal
            </h1>
          </div>

          <p className="text-lg leading-8 text-blue-100">
            Manage notices, academic events, holiday announcements and
            real-time notifications from one centralized platform.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex gap-4">
              <CalendarDays size={26} />
              <div>
                <h3 className="font-semibold text-xl">
                  Stay Updated
                </h3>
                <p className="text-blue-100">
                  Receive academic notices instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Bell size={26} />
              <div>
                <h3 className="font-semibold text-xl">
                  Instant Notifications
                </h3>
                <p className="text-blue-100">
                  Never miss important announcements.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users size={26} />
              <div>
                <h3 className="font-semibold text-xl">
                  Secure Access
                </h3>
                <p className="text-blue-100">
                  Sign in securely using Firebase Authentication.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center px-6 py-4">

        <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl px-8 py-6">

          <div className="text-center mb-5">

            <h2 className="text-3xl font-bold">
              Create Account
            </h2>

            <p className="text-gray-500 mt-1">
              Sign up to continue
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {/* Full Name */}

<div>
  <label className="text-sm font-medium">Full Name</label>

  <div className="mt-1 flex items-center border rounded-lg px-3 py-2">
    <User size={18} className="text-gray-400 mr-2" />

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your full name"
      className="w-full outline-none"
      required
    />
  </div>
</div>

{/* Role & Faculty */}

<div className="grid grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium">Role</label>

    <div className="mt-1 flex items-center border rounded-lg px-3 py-2 bg-gray-50">
      <Users size={18} className="text-gray-400 mr-2" />

       <select
        value={faculty}
        onChange={(e) => setFaculty(e.target.value)}
        className="w-full outline-none bg-transparent"
        required
      >
        <option value="student">Student</option>
        </select>
    </div>
  </div>

  <div>
    <label className="text-sm font-medium">Faculty</label>

    <div className="mt-1 flex items-center border rounded-lg px-3">
      <GraduationCap size={18} className="text-gray-400 mr-2" />

      <select
        value={faculty}
        onChange={(e) => setFaculty(e.target.value)}
        className="w-full py-2 outline-none bg-transparent"
        required
      >
        <option value="">Select Faculty</option>
        <option value="bsccsit">BSc CSIT</option>
        <option value="bca">BCA</option>
        <option value="bim">BIM</option>
        <option value="bsc">BSc</option>
        <option value="bbs">BBS</option>
        <option value="bba">BBA</option>
      </select>
    </div>
  </div>

</div>

{/* Semester & Phone */}

<div className="grid grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium">
      {faculty === "bbs" || faculty === "bba"
        ? "Year"
        : "Semester"}
    </label>

    <select
      value={academic_level}
      onChange={(e) => setAcademicLevel(e.target.value)}
      className="mt-1 w-full border rounded-lg px-3 py-2 outline-none"
      required
    >
      <option value="">
        {faculty === "bbs" || faculty === "bba"
          ? "Select Year"
          : "Select Semester"}
      </option>

      {(faculty === "bbs" || faculty === "bba"
        ? [1, 2, 3, 4]
        : [1, 2, 3, 4, 5, 6, 7, 8]
      ).map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>
  <div>
    <label className="text-sm font-medium">Phone</label>

    <div className="mt-1 flex items-center border rounded-lg px-3 py-2">

      <Phone size={18} className="text-gray-400 mr-2" />

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="98XXXXXXXX"
        className="w-full outline-none"
        required
      />

    </div>
  </div>
  </div>
  
{/*  Email & Password */}

<div className="grid grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium">Email</label>

    <div className="mt-1 flex items-center border rounded-lg px-3 py-2">

      <Mail size={18} className="text-gray-400 mr-2" />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full outline-none"
        required
      />

    </div>
  </div>

  <div>
    <label className="text-sm font-medium">Password</label>

    <div className="mt-1 flex items-center border rounded-lg px-3 py-2">

      <Lock size={18} className="text-gray-400 mr-2" />

      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full outline-none"
        required
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>

    </div>
  </div>

</div>

<div className="flex items-center">
  <label className="flex items-center gap-2 text-sm text-gray-600">
    <input type="checkbox" />
    Remember me
  </label>
</div>

{/* Submit Button */}

<button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>

{/* OR Divider */}

<div className="flex items-center gap-3">
  <div className="flex-1 h-px bg-gray-300"></div>

  <span className="text-sm text-gray-500 font-medium">
    OR
  </span>

  <div className="flex-1 h-px bg-gray-300"></div>
</div>

{/* Google Sign In */}

<button
  type="button"
  onClick={loginWithGoogle}
  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition"
>
  <FcGoogle size={22} />

  <span className="font-medium">
    Continue with Google
  </span>
</button>

{/* Sign In */}

<div className="text-center text-sm">
  <span className="text-gray-600">
    Already have an account?{" "}
  </span>

  <Link
    to="/"
    className="text-blue-700 font-semibold hover:underline"
  >
    Sign In
  </Link>
</div>

</form>

<div className="text-center text-xs text-gray-500 mt-5">
  © 2026 University Notice Portal
</div>

</div>
</div>
</div>
);
}