import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('/api/v1/room/allRooms')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  return (
    <div>App</div>
  );
}

export default App;
