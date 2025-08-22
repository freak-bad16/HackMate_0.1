import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiJson } from "../../lib/api";

const RequestCard = ({ request }) => {
  const [msg, setMsg] = useState("");
  const { accessToken, refreshToken } = useAuth();
  const roomId = request?.room?._id || request?.room; // depending on population
  const requestId = request?._id;

  const respond = async (action) => {
    setMsg("");
    // Note: backend route has a trailing space bug in definition, but the router path used at runtime likely trims.
    const { ok, data } = await apiJson(
      `/request/${roomId}/give-response/${requestId}`,
      { method: "POST", body: { action } },
      { accessToken, refreshToken }
    );
    setMsg(data?.message || (ok ? `Request ${action}ed` : `Failed to ${action}`));
  };

  return (
    <div className="p-4 border rounded mb-2">
      <p><strong>{request?.requester?.userName || "User"}</strong> requested to join your room.</p>
      <p>Message: {request?.message}</p>
      {msg && <div className="text-sm mt-1">{msg}</div>}
      <div className="flex gap-2 mt-2">
        <button onClick={() => respond("accept")} className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>
        <button onClick={() => respond("reject")} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
      </div>
    </div>
  );
};

export default RequestCard;
