import React from "react";

const RoomCard = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold">Room Title</h2>
      <p className="text-gray-600">Room description goes here...</p>
      <p className="text-sm text-blue-500">React, Node.js</p>
      <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">View</button>
    </div>
  );
};

export default RoomCard;