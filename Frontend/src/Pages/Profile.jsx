import React from 'react';
import ProfileCard from '../components/User/ProfileCard';
import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
      <ProfileCard user={user} />
    </div>
  );
}; 

export default Profile;