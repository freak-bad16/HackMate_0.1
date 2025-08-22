import React, { useEffect, useState } from "react";
import RoomCard from "../components/Room/RoomCard";
import { apiJson } from "../lib/api";
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { accessToken, refreshToken } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { ok, data } = await apiJson(
        "/room/all-rooms",
        { method: "GET" },
        { accessToken, refreshToken }
      );
      if (mounted && ok) setRooms(data?.data || []);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [accessToken, refreshToken]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Rooms</h1>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Home;