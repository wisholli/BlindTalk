import { io } from "socket.io-client";
import { createContext } from "react";

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
  reconnectionAttempts: 1,
  withCredentials: true,
});

export const SocketContext = createContext(socket);