import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />
      <h2 className="text-lg font-bold">{user?.fullName || user?.userName || "User"}</h2>
      <p className="text-sm text-gray-600">@{user?.userName || "username"}</p>
      <p>{user?.about || "Hey everyone! I'm new here."}</p>
    </div>
  );
};
 
export default ProfileCard;