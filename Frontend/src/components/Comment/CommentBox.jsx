import React from "react";

const CommentBox = () => {
  return (
    <div className="p-4 border-t">
      <textarea placeholder="Write a comment..." className="w-full p-2 border rounded"></textarea>
      <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">Post</button>
    </div>
  );
};

export default CommentBox;