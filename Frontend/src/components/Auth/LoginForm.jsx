import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: "", // can be username or email
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const sendLogin = () => {
    const { identifier, password } = formData;

    fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important if you're using cookies
      body: JSON.stringify({
        userName: identifier.includes("@") ? undefined : identifier,
        email: identifier.includes("@") ? identifier : undefined,
        password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        setMessage(data.message || "Unexpected response");
        setIsSuccess(res.ok && data.success);

        if (res.ok && data.success) {
          console.log("Tokens:", data.data.accessToken, data.data.refreshToken);
          console.log("User Info:", data.data.user);

          // Optional: Store tokens in localStorage if not using cookies
          // localStorage.setItem("accessToken", data.data.accessToken);

          // Reset form
          setFormData({ identifier: "", password: "" });
        }
      })
      .catch((error) => {
        setMessage("Network error. Please try again later.");
        setIsSuccess(false);
        console.error("Network Error:", error);
      });
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
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
