import React from "react";

const NotificationCard = () => {
  return (
    <div className="bg-white p-4 border-b">
      <p><strong>User</strong> sent you a join request to <strong>Room Name</strong>.</p>
      <small className="text-gray-500">2 hours ago</small>
    </div>
  );
};

export default NotificationCard;
