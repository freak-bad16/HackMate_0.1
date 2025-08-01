import React from "react";

const LoginForm = () => {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
      <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default LoginForm;