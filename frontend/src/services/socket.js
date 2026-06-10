import { io } from "socket.io-client";

let socket = null;

const serverUrl = () =>
  (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
    "/api",
    "",
  );

// Lidh socket-in me access token-in aktual (nëse je i loguar)
export const connectSocket = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  if (socket && socket.connected) return socket;

  // mbyll lidhjen e vjetër nëse ekziston
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(serverUrl(), {
    auth: { token },
    withCredentials: true,
    // pa "transports" — socket.io nis me polling dhe ngrihet vetë në websocket,
    // duke shmangur gabimin "can't establish ws connection" në konzolë
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
