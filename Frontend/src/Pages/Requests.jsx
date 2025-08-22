import React, { useEffect, useState } from 'react';
import RequestCard from '../components/Request/RequestCard';
import { apiJson } from '../lib/api';
import { useAuth } from '../context/AuthContext.jsx';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { accessToken, refreshToken } = useAuth();

  // No dedicated API to fetch requests; skipping list fetch. Keep UI placeholder.
  useEffect(() => {
    setRequests([]);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Your Requests</h2>
      {requests.length === 0 && <div className="text-sm">No pending requests to show.</div>}
      {requests.map((r) => (
        <RequestCard key={r._id} request={r} />
      ))}
    </div>
  );
};

export default Requests;