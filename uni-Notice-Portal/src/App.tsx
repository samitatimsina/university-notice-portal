import { useEffect } from "react";
import { requestPermissionAndToken } from "./components/requestPermissionAndToken";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/admin/Dashboard";
import Signup from "./pages/Signup";
import  Users  from "./components/admin/Users";
import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/student/UserLayout";
import Notices from "./components/admin/pages/notices/Notices";
import StudentNotices from "./components/student/StudentNotices";
import Events from "./components/admin/pages/notices/event/Events";
import StudentEvents from "./components/student/StudentEvents";
import Holidays from "./components/admin/pages/notices/holiday/Holidays";
import StudentHolidays from "./components/student/StudentHolidays";
import Profile from "./components/admin/Profile";
import StudentProfile from "./components/student/StudentProfile";
import UserRoute from "./components/student/UserRoute";
import AdminRoute from "./components/admin/AdminRoute";
import Home from "./components/student/Home";
import Logout from "./pages/Logout";
import CreateNotice from "./components/admin/pages/notices/CreateNotices";
import AdminNoticeDetails from "./components/admin/pages/notices/AdminNoticeDetails";
import NoticeDetails from "./components/student/NoticeDetails";
import CreateEvent from "./components/admin/pages/notices/event/CreateEvent";
import CreateHoliday from "./components/admin/pages/notices/holiday/CreateHoliday";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  useEffect(() => {
    requestPermissionAndToken();
  }, []);

  return (
    <>
    <Routes>

  {/* Public */}
  <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/logout" element={<Logout />} />

  {/* Admin */}
  <Route  element={<AdminRoute />}>
    <Route path="/admin" element={<AdminLayout />}>

      <Route
        path="dashboard"
        element={<Dashboard />}
      />

      <Route
        path="users"
        element={<Users />}
      />

      <Route
        path="notices"
        element={<Notices />}
      />
      <Route
        path="notices/create"
        element={<CreateNotice />}
      />

      <Route
    path="notices/:id"
    element={<AdminNoticeDetails />}
/>

      <Route
        path="event"
        element={<Events />}
      />
      <Route
        path="event/create"
        element={<CreateEvent />}
      />

      <Route
        path="holiday"
        element={<Holidays />}
      />
      <Route
        path="holiday/create"
        element={<CreateHoliday />}
      />

      <Route
        path="profile"
        element={<Profile />}
      />

    </Route>
  </Route>

  {/* Student */}
  <Route element={<UserRoute />}>
    <Route path="/student" element={<UserLayout />}>

      <Route
        path="home"
        element={<Home />}
      />
      <Route
        path="forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="notices"
        element={<StudentNotices />}
      />
      <Route
      path="notices/:id"
      element={<NoticeDetails />}
    />

      <Route
        path="event"
        element={<StudentEvents />}
      />
      <Route
        path="event/:id"
        element={<Events />}
      />

      <Route
        path="holiday"
        element={<StudentHolidays />}
      />
      <Route
        path="holiday/:id"
        element={<StudentHolidays />}
      />

      <Route
        path="profile"
        element={<StudentProfile />}
      />

    </Route>
  </Route>

  <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;