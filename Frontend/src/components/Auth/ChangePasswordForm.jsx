import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiJson } from "../../lib/api.js";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { accessToken, refreshToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const { ok, data } = await apiJson(
        "/auth/change-password",
        {
          method: "PATCH",
          body: { oldPassword: currentPassword, newPassword },
        },
        { accessToken, refreshToken }
      );

      if (ok) setMessage(data?.message || "Password changed successfully");
      else setError(data?.message || "Failed to change password");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white shadow p-6 rounded"
    >
      <h2 className="text-xl font-semibold">Change Password</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="password"
        placeholder="Current Password"
        className="w-full border p-2 rounded"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-2 rounded"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
