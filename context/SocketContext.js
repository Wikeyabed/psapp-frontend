import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const DEFAULT_SOCKET_URL = "http://localhost:3000";
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || DEFAULT_SOCKET_URL;

console.log('[Socket] Initializing with URL:', SOCKET_URL);

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socketInstance, setSocketInstance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const connectSocket = () => {
    if (!SOCKET_URL) {
      console.error('[Socket] ERROR: Socket URL is not defined!');
      setConnectionError('آدرس سرور چت مشخص نشده است');
      return;
    }

    console.log('[Socket] Attempting connection...');
    
    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      timeout: 10000,
    });

    socketRef.current = socket;
    setSocketInstance(socket);

    socket.on("connect", () => {
      setIsConnected(true);
      setConnectionError(null);
      setRetryCount(0);
      console.log('[Socket] ✅ Connected - ID:', socket.id);
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log('[Socket] ⚠️ Disconnected. Reason:', reason);
      if (reason === "io server disconnect") {
        setTimeout(connectSocket, 3000);
      }
    });

    socket.on("connect_error", (err) => {
      console.error('[Socket] 🔥 Connection Error:', err.message);
      setConnectionError('خطا در اتصال به سرور چت');
      setIsConnected(false);
      setRetryCount(prev => prev + 1);
      
      if (retryCount < 3) {
        setTimeout(connectSocket, 5000);
      }
    });

    socket.on("error", (err) => {
      console.error('[Socket] 💥 Error:', err);
      setConnectionError('خطای داخلی در اتصال چت');
    });

    return socket;
  };

  useEffect(() => {
    const socket = connectSocket();

    return () => {
      console.log('[Socket] 🧹 Cleaning up...');
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("error");
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ 
      socket: socketInstance, 
      isConnected,
      error: connectionError,
      retryCount
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);