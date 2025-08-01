import React from "react";
import RoomCard from "../components/Room/RoomCard";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
};

export default Home;