import { useEffect, useState } from "react";
import { api } from "../../api/axios";

interface Event {
  event_id: number;
  title: string;
  description: string;
  venue: string;
  event_date: string;
  event_time: string;
  image?: string;
  created_at: string;
}

export default function StudentEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);



  const fetchEvents = async () => {
    try {
      const res = await api.get("/student/event");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading events...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        University Events
      </h1>

      {events.length === 0 ? (
        <div className="text-gray-500">
          No events available.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {events.map((event) => (

            <div
              key={event.event_id}
              className="bg-white rounded-lg shadow-md border overflow-hidden"
            >

              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {event.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {event.description}
                </p>

                <div className="mt-4 space-y-2 text-sm">

                  <p>
                    <strong>Venue:</strong>
                    {" "}
                    {event.venue}
                  </p>

                  <p>
                    <strong>Date:</strong>
                    {" "}
                    {new Date(
                      event.event_date
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Time:</strong>
                    {" "}
                    {event.event_time}
                  </p>

                </div>

                <div className="mt-5 text-xs text-gray-500">

                  Published on{" "}
                  {new Date(
                    event.created_at
                  ).toLocaleDateString()}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}