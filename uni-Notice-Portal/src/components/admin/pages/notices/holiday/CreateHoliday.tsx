import { useState } from "react";
import { createHoliday } from "../../../../services/holiday.service";

export default function CreateHoliday() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [holidayDate, setHolidayDate] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !holidayDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await createHoliday({
        title,
        description,
        holiday_date: holidayDate,
      });

      alert("Holiday published successfully.");

      setTitle("");
      setDescription("");
      setHolidayDate("");
    } catch (error) {
      console.error(error);
      alert("Failed to publish holiday.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">

        <div className="border-b px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Holiday
          </h1>

          <p className="text-gray-500 mt-1">
            Publish an official university holiday notice.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="p-8 space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">
              Holiday Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dashain Vacation"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter holiday details..."
              className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Holiday Date
            </label>

            <input
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
            >
              {loading ? "Publishing..." : "Publish Holiday"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}