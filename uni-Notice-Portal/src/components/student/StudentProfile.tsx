import { useState } from "react";
import { User, Mail, GraduationCap, ShieldCheck, Calendar } from "lucide-react";

import { getStudentProfile } from "../services/profile.service";
import type { UserProfile } from "../../types/user";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import ProfileImageUpload from "../ProfileImageUpload";

const handleChangePassword = async () => {
  if (!auth.currentUser?.email) {
    alert("No user is logged in.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, auth.currentUser.email);

    alert("A password reset email has been sent to your email address.");
  } catch (error: any) {
    alert(error.message);
  }
};

export default function StudentProfile() {
  const [profile, setProfile] = useState<UserProfile>();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/", { replace: true });
  }

  async function loadProfile() {
    try {
      const data = await getStudentProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  }

  onAuthStateChanged(auth, (user) => {
  if (user) {
    loadProfile();
  }
});

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow">
          <div className="bg-sky-800 h-36 rounded-t-xl" />
          <div className="-mt-14 flex justify-center">
            <ProfileImageUpload
              profileImage={profile.profile_image}
              onUploadSuccess={loadProfile}
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold">{profile.name}</h2>

            <p className="text-gray-500">{profile.role}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-8">
            <div className="flex gap-3">
              <Mail className="text-blue-600" />

              <div>
                <p className="text-gray-500">Email</p>

                <p>{profile.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck className="text-green-600" />

              <div>
                <p className="text-gray-500">Role</p>

                <p>{profile.role}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <GraduationCap className="text-purple-600" />

              <div>
                <p className="text-gray-500">Faculty</p>

                <p>{profile.faculty}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <User className="text-orange-600" />

              <div>
                <p className="text-gray-500">Academic Level</p>

                <p>{profile.academic_level}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Calendar className="text-red-600" />

              <div>
                <p className="text-gray-500">Joined</p>

                <p>{new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t p-6 flex justify-end gap-4">
            <button
              onClick={handleChangePassword}
              className="bg-sky-600 text-white px-6 py-2 rounded-lg"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
