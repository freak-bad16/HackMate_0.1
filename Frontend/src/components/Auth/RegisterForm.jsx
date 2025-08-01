import React from "react";

const RegisterForm = () => {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
      <input type="text" placeholder="Username" className="w-full border p-2 rounded" />
      <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
      <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default RegisterForm;