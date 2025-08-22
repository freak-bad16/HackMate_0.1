import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiJson } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Room = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [likeMsg, setLikeMsg] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const [comment, setComment] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const { accessToken, refreshToken } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { ok, data } = await apiJson(
        "/room/all-rooms",
        { method: "GET" },
        { accessToken, refreshToken }
      );
      if (mounted && ok) {
        const found = (data?.data || []).find((r) => r._id === roomId);
        setRoom(found || null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [roomId, accessToken, refreshToken]);

  if (!room) return <div className="p-4">Loading room...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{room.title}</h2>
      <p className="mb-4">{room.description}</p>
      <div className="mb-2"><strong>Requirements:</strong> {(room.requirements||[]).join(", ")}</div>
      <div className="mb-2"><strong>Tech Stack:</strong> {(room.techStack||[]).join(", ")}</div>
      {likeMsg && <div className="text-sm mb-2">{likeMsg}</div>}
      <button
        className="mb-4 px-3 py-1 bg-blue-600 text-white rounded"
        onClick={async () => {
          setLikeMsg("");
          const { ok, data } = await apiJson(
            `/room/${roomId}/like`,
            { method: "POST" },
            { accessToken, refreshToken }
          );
          setLikeMsg(data?.message || (ok ? "Liked" : "Failed to like"));
        }}
      >Like</button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Send Join Request</h3>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Message to owner"
            value={joinMessage}
            onChange={(e) => setJoinMessage(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={async () => {
              setActionMsg("");
              const { ok, data } = await apiJson(
                `/request/${roomId}/send-request`,
                { method: "POST", body: { message: joinMessage } },
                { accessToken, refreshToken }
              );
              setActionMsg(data?.message || (ok ? "Request sent" : "Failed to send request"));
              if (ok) setJoinMessage("");
            }}
          >Send</button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add a Comment</h3>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-purple-600 text-white rounded"
            onClick={async () => {
              setActionMsg("");
              const { ok, data } = await apiJson(
                `/room/${roomId}/comment`,
                { method: "POST", body: { content: comment } },
                { accessToken, refreshToken }
              );
              setActionMsg(data?.message || (ok ? "Comment added" : "Failed to comment"));
              if (ok) setComment("");
            }}
          >Post</button>
        </div>
      </div>

      {actionMsg && <div className="mt-3 text-sm">{actionMsg}</div>}
    </div>
  );
};

export default Room;