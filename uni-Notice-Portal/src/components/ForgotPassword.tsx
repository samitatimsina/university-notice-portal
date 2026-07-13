import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      alert("Password reset email has been sent.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Forgot Password
      </h2>

      <input
        type="email"
        placeholder="Enter email"
        className="border p-2 w-full"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        Send Reset Email
      </button>

    </div>
  );
}