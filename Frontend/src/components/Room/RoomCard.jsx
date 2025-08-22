import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold">{room?.title || "Room"}</h2>
      <p className="text-gray-600 line-clamp-3">{room?.description}</p>
      <p className="text-sm text-blue-500">{(room?.techStack || []).join(", ")}</p>
      <Link to={`/room/${room?._id}`} className="inline-block mt-2 bg-blue-600 text-white px-4 py-1 rounded">View</Link>
    </div>
  );
};

export default RoomCard;