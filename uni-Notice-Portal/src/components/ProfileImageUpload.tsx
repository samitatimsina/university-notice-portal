import { useState } from "react";
import { User } from "lucide-react";
import { api } from "../api/axios";

interface Props {
  profileImage?: string | null;
  onUploadSuccess: () => void;
}

export default function ProfileImageUpload({
  profileImage,
  onUploadSuccess,
}: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("profile", image);

    try {
      await api.put("/profile/image", formData);

      alert("Profile image updated.");

      setImage(null);
      setPreview("");

      onUploadSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
  };

  return (
    <div className="flex flex-col items-center">

      <label htmlFor="profile-image" className="cursor-pointer">

        <div className="h-28 w-28 rounded-full bg-white shadow overflow-hidden flex items-center justify-center">

          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : profileImage ? (
            <img
              src={`http://localhost:5000/uploads/profiles/${profileImage}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User
              size={60}
              className="text-blue-600"
            />
          )}

        </div>

      </label>

      <input
        id="profile-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          setImage(file);
          setPreview(URL.createObjectURL(file));
        }}
      />

      {image && (
        <button
          onClick={uploadImage}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save Photo
        </button>
      )}

    </div>
  );
}