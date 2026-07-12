import { useState } from "react";
import {
  Home,
  Users,
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
  const [openUsers, setOpenUsers] = useState(false);
  const [openNotices, setOpenNotices] = useState(false);
  const [openEvents, setOpenEvents] = useState(false);
  const [openHoliday, setOpenHoliday] = useState(false);

  return (
    <aside className="w-72 bg-sky-900 text-white h-screen overflow-y-auto">

      <div className="text-2xl font-bold p-6 border-b border-sky-700">
        Admin Portal
      </div>

      <nav className="p-3">

        {/* Dashboard */}

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-sky-800"
        >
          <Home size={20} />
          Dashboard
        </Link>

        {/* Users */}

        <button
          onClick={() => setOpenUsers(!openUsers)}
          className="w-full flex justify-between items-center px-4 py-3 hover:bg-sky-800 rounded"
        >
          <div className="flex items-center gap-3">
            <Users size={20} />
            Users
          </div>

          {openUsers ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {openUsers && (
          <div className="ml-10 mt-1 space-y-1">

            <Link
              to="/admin/users"
              className="block py-2 hover:text-blue-300"
            >
              Manage Users
            </Link>

          </div>
        )}

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
              to="/admin/notices"
              className="block py-2 hover:text-blue-300"
            >
              All Notices
            </Link>

            <Link
              to="/admin/notices/create"
              className="block py-2 hover:text-blue-300"
            >
              Create Notice
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
              to="/admin/event"
              className="block py-2 hover:text-blue-300"
            >
              All Events
            </Link>

            <Link
              to="/admin/event/create"
              className="block py-2 hover:text-blue-300"
            >
              Create Event
            </Link>

          </div>
        )}

        {/* Holidays */}

        <button
          onClick={() => setOpenHoliday(!openHoliday)}
          className="w-full flex justify-between items-center px-4 py-3 hover:bg-sky-800 rounded"
        >
          <div className="flex items-center gap-3">
            <CalendarDays size={20} />
            Holidays
          </div>

          {openHoliday ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {openHoliday && (
          <div className="ml-10">

            <Link
              to="/admin/holiday"
              className="block py-2 hover:text-blue-300"
            >
              All Holidays
            </Link>

            <Link
              to="/admin/holiday/create"
              className="block py-2 hover:text-blue-300"
            >
              Create Holiday
            </Link>

          </div>
        )}

        {/* Profile */}

        <Link
          to="/admin/profile"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-sky-800"
        >
          <User size={20} />
          Profile
        </Link>

        {/* Logout */}
        <Link
          to="/logout"
          className="flex items-center gap-3 px-3 py-3 rounded"
        >
        <button
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-500 rounded mt-5"
        >
          <LogOut size={20} />
          Logout
        </button>
        </Link>

      </nav>
    </aside>
  );
}