import React from 'react';
import NotificationCard from '../components/Notification/NotificationCard';

const Notifications = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Notifications</h2>
      <NotificationCard />
    </div>
  );
};

export default Notifications;