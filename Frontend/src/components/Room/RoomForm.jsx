import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiJson } from "../../lib/api.js";

const RoomForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [techStack, setTechStack] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { accessToken, refreshToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const body = {
      title,
      description,
      requirements: requirements.split(",").map((s) => s.trim()).filter(Boolean),
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const { ok, data } = await apiJson(
      "/room/create-room",
      { method: "POST", body },
      { accessToken, refreshToken }
    );
    if (ok) {
      setMessage(data?.message || "Room created");
      setTitle("");
      setDescription("");
      setRequirements("");
      setTechStack("");
    } else {
      setMessage(data?.message || "Failed to create room");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      {message && <div className="text-sm">{message}</div>}
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Room Title" className="w-full border p-2 rounded" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Room Description" className="w-full border p-2 rounded" />
      <input value={requirements} onChange={(e) => setRequirements(e.target.value)} type="text" placeholder="Requirements (comma separated)" className="w-full border p-2 rounded" />
      <input value={techStack} onChange={(e) => setTechStack(e.target.value)} type="text" placeholder="Tech Stack (comma separated)" className="w-full border p-2 rounded" />
      <button disabled={loading} type="submit" className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-60">{loading ? "Creating..." : "Create Room"}</button>
    </form>
  );
};

export default RoomForm;