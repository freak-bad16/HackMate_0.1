import React from "react";

const RoomForm = () => {
  return (
    <form className="space-y-4 max-w-2xl mx-auto">
      <input type="text" placeholder="Room Title" className="w-full border p-2 rounded" />
      <textarea placeholder="Room Description" className="w-full border p-2 rounded" />
      <input type="text" placeholder="Requirements (comma separated)" className="w-full border p-2 rounded" />
      <input type="text" placeholder="Tech Stack (comma separated)" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">Create Room</button>
    </form>
  );
};

export default RoomForm;