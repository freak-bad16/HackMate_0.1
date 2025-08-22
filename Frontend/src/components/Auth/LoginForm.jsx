import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: "", // can be username or email
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    sendLogin();
  };

  const sendLogin = async () => {
    const { identifier, password } = formData;
    const result = await login({ identifier, password });
    if (result.ok) {
      setIsSuccess(true);
      setMessage("Login successful");
      setFormData({ identifier: "", password: "" });
      navigate("/");
    } else {
      setIsSuccess(false);
      setMessage(result.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 border rounded shadow bg-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

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
        name="identifier"
        placeholder="Email or Username"
        value={formData.identifier}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white px-4 py-2 rounded w-full transition duration-200"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
