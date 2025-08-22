import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { apiJson } from "../lib/api.js";

const Messages = () => {
  const { userId } = useParams();
  const { accessToken, refreshToken } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { ok, data } = await apiJson(
        `/messages/${userId}`,
        { method: "GET" },
        { accessToken, refreshToken }
      );
      if (ok) setMessages(data?.data || []);
      else setStatus(data?.message || "Failed to load messages");
    })();
  }, [userId, accessToken, refreshToken]);

  const send = async () => {
    if (!newMessage.trim()) return;
    setStatus("");
    const { ok, data } = await apiJson(
      `/messages`,
      { method: "POST", body: { reciver: userId, content: newMessage } },
      { accessToken, refreshToken }
    );
    if (ok) {
      setMessages((prev) => [...prev, data?.data]);
      setNewMessage("");
    } else {
      setStatus(data?.message || "Failed to send");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Messages</h2>
      {status && <div className="text-sm mb-2">{status}</div>}
      <div className="border rounded p-3 h-80 overflow-y-auto bg-white">
        {messages.map((m) => (
          <div key={m._id} className="mb-2">
            <div className="text-xs text-gray-500">{m?.sender?.fullName || m?.sender?.email || m?.sender}</div>
            <div>{m.content}</div>
          </div>
        ))}
        {messages.length === 0 && <div className="text-sm">No messages yet.</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={send} className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
};

export default Messages;


