import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Components
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePasswordForm from "./components/Auth/ChangePasswordForm";

// User Components
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

// Room Components
import Home from "./pages/Home";
import Room from "./pages/Room";
import CreateRoom from "./pages/CreateRoom";

// Requests & Notifications
import Requests from "./pages/Requests";
import Notifications from "./pages/Notifications";

// Optional: You can create a NotFound component if desired
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />

        {/* User Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/* Room Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/create-room" element={<CreateRoom />} />

        {/* Requests & Notifications */}
        <Route path="/requests" element={<Requests />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Optional: 404 Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
