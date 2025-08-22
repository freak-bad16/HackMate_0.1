import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { apiJson } from "../../lib/api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    fullName: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendData = async () => {
    // Backend register route uses multer upload.fields; send multipart/form-data
    const fd = new FormData();
    fd.append("userName", formData.userName);
    fd.append("email", formData.email);
    fd.append("fullName", formData.fullName);
    fd.append("password", formData.password);
    const { ok, data } = await apiJson("/auth/register", { method: "POST", body: fd });
    if (ok) {
      setIsSuccess(true);
      setMessage(data?.message || "Registration successful. You can login now.");
      setFormData({ userName: "", email: "", fullName: "", password: "" });
      navigate("/login");
    } else {
      setIsSuccess(false);
      setMessage(data?.message || "Registration failed");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null); // reset message
    sendData();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

      {message && (
        <div
          className={`text-sm px-4 py-2 rounded ${
            isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={formData.userName}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white px-4 py-2 rounded w-full transition duration-200"
      >
        {loading ? "Submitting..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
