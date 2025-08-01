import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <img src="avatar.jpg" alt="Avatar" className="w-24 h-24 rounded-full mb-2" />
      <h2 className="text-lg font-bold">Full Name</h2>
      <p className="text-sm text-gray-600">@username</p>
      <p>Hey everyone! I'm new here.</p>
    </div>
  );
};

export default ProfileCard;