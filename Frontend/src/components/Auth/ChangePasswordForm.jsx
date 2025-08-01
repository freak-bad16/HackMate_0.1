import React from "react";

const ChangePasswordForm = () => {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <input type="password" placeholder="Current Password" className="w-full border p-2 rounded" />
      <input type="password" placeholder="New Password" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;