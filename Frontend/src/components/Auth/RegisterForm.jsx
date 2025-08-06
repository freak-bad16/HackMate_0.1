import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    fullName: "",
    password: "",
  });

  const [message, setMessage] = useState(null); // message from backend
  const [isSuccess, setIsSuccess] = useState(false); // track success/failure

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendData = () => {
  fetch("http://localhost:3000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      const data = await response.json();

      // Always show the message from backend
      setMessage(data.message || "Unexpected response");

      // Determine success based on HTTP status or backend field
      setIsSuccess(response.ok && data.success);

      if (response.ok && data.success) {
        // Reset form on success
        setFormData({
          userName: "",
          email: "",
          fullName: "",
          password: "",
        });
      }
    })
    .catch((error) => {
      // Only fires on network error
      console.error("Network error:", error);
      setMessage("Network error. Please try again later.");
      setIsSuccess(false);
    });
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
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full transition duration-200"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
