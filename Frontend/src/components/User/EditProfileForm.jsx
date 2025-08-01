import React from "react";

const EditProfileForm = () => {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
      <textarea placeholder="About" className="w-full border p-2 rounded" />
      <input type="text" placeholder="LinkedIn URL" className="w-full border p-2 rounded" />
      <input type="text" placeholder="GitHub URL" className="w-full border p-2 rounded" />
      <input type="text" placeholder="Instagram URL" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;