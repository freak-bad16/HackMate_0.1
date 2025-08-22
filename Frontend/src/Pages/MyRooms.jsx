import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { apiJson } from "../lib/api.js";

const MyRooms = () => {
  const { accessToken, refreshToken } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchRooms = async () => {
    setLoading(true);
    const { ok, data } = await apiJson(
      "/room/all-rooms-of-User",
      { method: "GET" },
      { accessToken, refreshToken }
    );
    if (ok) setRooms(data?.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRooms(); }, [accessToken, refreshToken]);

  const deleteRoom = async (roomId) => {
    setMessage("");
    const { ok, data } = await apiJson(
      `/room/${roomId}`,
      { method: "DELETE" },
      { accessToken, refreshToken }
    );
    setMessage(data?.message || (ok ? "Room deleted" : "Failed to delete"));
    if (ok) fetchRooms();
  };

  const updateRoom = async (room) => {
    setMessage("");
    const { ok, data } = await apiJson(
      `/room/${room._id}`,
      {
        method: "PUT",
        body: {
          title: room.title,
          description: room.description,
          requirements: room.requirements,
          techStack: room.techStack,
        },
      },
      { accessToken, refreshToken }
    );
    setMessage(data?.message || (ok ? "Room updated" : "Failed to update"));
    if (ok) fetchRooms();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">My Rooms</h2>
      {message && <div className="text-sm mb-3">{message}</div>}
      {loading && <div>Loading...</div>}
      <div className="space-y-4">
        {rooms.map((r) => (
          <div key={r._id} className="border rounded p-3">
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className="border p-2 rounded"
                value={r.title}
                onChange={(e) => (r.title = e.target.value) && setRooms([...rooms])}
              />
              <input
                className="border p-2 rounded"
                value={r.techStack?.join(", ") || ""}
                onChange={(e) => (r.techStack = e.target.value.split(",").map(s=>s.trim()).filter(Boolean)) && setRooms([...rooms])}
              />
            </div>
            <textarea
              className="border p-2 rounded w-full mt-2"
              value={r.description}
              onChange={(e) => (r.description = e.target.value) && setRooms([...rooms])}
            />
            <input
              className="border p-2 rounded w-full mt-2"
              value={r.requirements?.join(", ") || ""}
              onChange={(e) => (r.requirements = e.target.value.split(",").map(s=>s.trim()).filter(Boolean)) && setRooms([...rooms])}
            />
            <div className="flex gap-2 mt-3">
              <button onClick={() => updateRoom(r)} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
              <button onClick={() => deleteRoom(r._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
        {rooms.length === 0 && !loading && <div className="text-sm">You have not created any rooms yet.</div>}
      </div>
    </div>
  );
};

export default MyRooms;


