import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link to="/" className="font-semibold">HackMate</Link>
          <Link to="/" className="text-sm">Home</Link>
          <Link to="/create-room" className="text-sm">Create Room</Link>
          <Link to="/my-rooms" className="text-sm">My Rooms</Link>
          <Link to="/requests" className="text-sm">Requests</Link>
          <Link to="/notifications" className="text-sm">Notifications</Link>
        </div>
        <div className="flex gap-3 items-center">
          {!user && (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/profile" className="text-sm">{user.fullName || user.userName}</Link>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;