import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/edit-profile">Edit Profile</Link></li>
        <li><Link to="/room">Rooms</Link></li>
        <li><Link to="/create-room">Create Room</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;