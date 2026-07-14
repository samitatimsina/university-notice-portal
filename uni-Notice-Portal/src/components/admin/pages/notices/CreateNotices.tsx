import { useState } from "react";
import { auth } from "../../../../firebase/firebase";
import { api } from "../../../../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateNotice() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [faculty, setFaculty] = useState("");
  const [category, setCategory] = useState("");
  const [academic_level, setAcademicLevel] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [attachment, setAttachment] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !category ||
      !faculty ||
      !academic_level
    ) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields before publishing the notice.",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const token = await auth.currentUser?.getIdToken();
      console.log("Tokens:", token);

      const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("faculty", faculty);
        formData.append("academic_level", academic_level);
        formData.append("priority", priority);

        if (attachment) {
          formData.append("attachment", attachment);
        }

        await api.post("/admin/notices/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Notice published successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/admin/notices");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to publish the notice.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create Notice</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 space-y-6"
      >
        <div>
          <label className="font-medium">Notice Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="font-medium">Description</label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>
        <div>
          <label className="font-medium">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3"
          >
            <option value="">Select Category</option>

            <option>Notices</option>
            <option>Holidays</option>
            <option>Events</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Faculty</label>

            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="mt-2 w-full border rounded-lg p-3"
            >
              <option value="">Select Faculty</option>

              <option value="Select">Select</option>
              <option value="all">All</option>
              <option value="bsccsit">BSc CSIT</option>
              <option value="bca">BCA</option>
              <option value="bim">BIM</option>
              <option value="bsc">BSc</option>
              <option value="bbs">BBS</option>
              <option value="bba">BBA</option>
            </select>
          </div>

          <div>
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
          </div>
        </div>

        <div>
          <label className="font-medium">Priority</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3"
          >
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>

            <div>
            <label className="font-medium">Attachment (Optional)</label>

            <input
              type="file"
              onChange={(e) =>
                setAttachment(e.target.files ? e.target.files[0] : null)
              }
              className="mt-2 w-full border rounded-lg p-3"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />

            {attachment && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {attachment.name}
              </p>
            )}
          </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800"
          >
            Publish Notice
          </button>
        </div>
      </form>
    </div>
  );
}
