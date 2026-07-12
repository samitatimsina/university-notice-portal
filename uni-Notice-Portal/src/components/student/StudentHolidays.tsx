import { useEffect, useState } from "react";
import { api } from "../../api/axios";

interface Holiday {
  holiday_id: number;
  title: string;
  description: string;
  holiday_date: string;
  created_at: string;
}

export default function StudentHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHolidays = async () => {
    try {
      const res = await api.get("/student/holiday");
      setHolidays(res.data);
    } catch (error) {
      console.error("Failed to fetch holidays", error);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    fetchHolidays();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading holidays...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        University Holidays
      </h1>

      {holidays.length === 0 ? (
        <div className="text-gray-500">
          No holidays available.
        </div>
      ) : (
        <div className="space-y-5">

          {holidays.map((holiday) => (

            <div
              key={holiday.holiday_id}
              className="bg-white rounded-lg shadow-md border p-5"
            >
              <h2 className="text-xl font-semibold">
                {holiday.title}
              </h2>

              <p className="mt-2 text-gray-700">
                {holiday.description}
              </p>

              <div className="mt-4 flex justify-between text-sm text-gray-500">

                <span>
                  Holiday Date:
                  {" "}
                  {new Date(
                    holiday.holiday_date
                  ).toLocaleDateString()}
                </span>

                <span>
                  Posted:
                  {" "}
                  {new Date(
                    holiday.created_at
                  ).toLocaleDateString()}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}