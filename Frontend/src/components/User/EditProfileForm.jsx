import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiJson } from "../../lib/api.js";

const EditProfileForm = () => {
  const { user, accessToken, refreshToken, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [linkedIn, setLinkedIn] = useState(user?.socialLink?.linkedIn || "");
  const [github, setGithub] = useState(user?.socialLink?.github || "");
  const [insta, setInsta] = useState(user?.socialLink?.insta || "");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const body = { fullName, about, socialLink: { linkedIn, github, insta } };
    const { ok, data } = await apiJson(
      "/user/update-user-details",
      { method: "PUT", body },
      { accessToken, refreshToken }
    );
    if (ok) {
      setMessage(data?.message || "Profile updated");
      setUser(data?.data || null);
    } else {
      setMessage(data?.message || "Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {message && <div className="text-sm">{message}</div>}
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
      <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About" className="w-full border p-2 rounded" />
      <input value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} type="text" placeholder="LinkedIn URL" className="w-full border p-2 rounded" />
      <input value={github} onChange={(e) => setGithub(e.target.value)} type="text" placeholder="GitHub URL" className="w-full border p-2 rounded" />
      <input value={insta} onChange={(e) => setInsta(e.target.value)} type="text" placeholder="Instagram URL" className="w-full border p-2 rounded" />
      <button disabled={loading} type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-60">{loading ? "Saving..." : "Save Changes"}</button>

      <hr className="my-4" />
      {uploadMsg && <div className="text-sm mb-2">{uploadMsg}</div>}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Update Avatar</label>
        <input type="file" accept="image/*" onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const fd = new FormData();
          fd.append("avatar", file);
          const { ok, data } = await apiJson(
            "/user/avatar",
            { method: "PATCH", body: fd },
            { accessToken, refreshToken }
          );
          setUploadMsg(data?.message || (ok ? "Avatar updated" : "Failed to update avatar"));
        }} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Update Cover Image</label>
        <input type="file" accept="image/*" onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const fd = new FormData();
          fd.append("coverImage", file);
          const { ok, data } = await apiJson(
            "/user/cover-image",
            { method: "PATCH", body: fd },
            { accessToken, refreshToken }
          );
          setUploadMsg(data?.message || (ok ? "Cover updated" : "Failed to update cover image"));
        }} />
      </div>
    </form>
  );
};

export default EditProfileForm;