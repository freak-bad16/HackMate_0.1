import React from "react";

const RequestCard = () => {
  return (
    <div className="p-4 border rounded mb-2">
      <p><strong>Username</strong> requested to join your room.</p>
      <p>Message: Please add me.</p>
      <div className="flex gap-2 mt-2">
        <button className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
      </div>
    </div>
  );
};

export default RequestCard;
