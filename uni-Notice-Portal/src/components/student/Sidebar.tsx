import { useState } from "react";
import {
  Home,
  Calendar,
  CalendarDays,
  FileText,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const [openNotices, setOpenNotices] = useState(false);
  const [openEvents, setOpenEvents] = useState(false);

  return (
    <aside className="w-72 bg-sky-900 text-white h-screen overflow-y-auto">

      <div className="text-2xl font-bold p-6 border-b border-sky-700">
        Student Portal 
      </div>

      <nav className="p-3">

        {/* Dashboard */}

        <Link
          to="/student/home"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-sky-800"
        >
          <Home size={20} />
          Home
        </Link>

        {/* Notices */}

        <button
          onClick={() => setOpenNotices(!openNotices)}
          className="w-full flex justify-between items-center px-4 py-3 hover:bg-sky-800 rounded"
        >
          <div className="flex items-center gap-3">
            <FileText size={20} />
            Notices
          </div>

          {openNotices ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {openNotices && (
          <div className="ml-10 space-y-1">

            <Link
              to="/student/notices"
              className="block py-2 hover:text-blue-300"
            >
              All Notices
            </Link>

          </div>
        )}

        {/* Events */}

        <button
          onClick={() => setOpenEvents(!openEvents)}
          className="w-full flex justify-between items-center px-4 py-3 hover:bg-sky-800 rounded"
        >
          <div className="flex items-center gap-3">
            <Calendar size={20} />
            Events
          </div>

          {openEvents ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {openEvents && (
          <div className="ml-10">

            <Link
              to="/student/event"
              className="block py-2 hover:text-blue-300"
            >
              All Events
            </Link>

          </div>
        )}

        {/* Holidays */}

        <Link
          to="/student/holiday"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-sky-800"
        >
          <CalendarDays size={20} />
          Holidays
        </Link>

        {/* Profile */}

        <Link
          to="/student/profile"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-sky-800"
        >
          <User size={20} />
          Profile
        </Link>

        {/* Logout */}
        <Link
          to="/logout"
          className="flex items-center gap-3 px-2 py-2 rounded"
        >
        <button
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600 rounded mt-3"
        >
          <LogOut size={20} />
          Logout
        </button>
        </Link>

      </nav>
    </aside>
  );
}