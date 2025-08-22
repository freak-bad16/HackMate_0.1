import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages/Components
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChangePasswordForm from "./components/Auth/ChangePasswordForm";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Home from "./Pages/Home";
import Room from "./Pages/Room";
import CreateRoom from "./Pages/CreateRoom";
import Requests from "./Pages/Requests";
import Notifications from "./Pages/Notifications";
import NotFound from "./Pages/NotFound";
import MyRooms from "./Pages/MyRooms";
import Messages from "./Pages/Messages";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/my-rooms" element={<MyRooms />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages/:userId" element={<Messages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
