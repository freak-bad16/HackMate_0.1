import React from "react";

const RoomDetail = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Room Title</h1>
      <p>Description of the room.</p>
      <h3 className="mt-4 font-semibold">Requirements:</h3>
      <ul className="list-disc ml-6">
        <li>React</li>
        <li>Node</li>
      </ul>
    </div>
  );
};

export default RoomDetail;