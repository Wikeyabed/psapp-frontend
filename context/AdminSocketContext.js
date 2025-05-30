import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const AdminSocketContext = createContext(); // ✅ export مستقیم کانتکست

export const useAdminSocket = () => useContext(AdminSocketContext);

export const AdminSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <AdminSocketContext.Provider value={{ socket }}>
      {" "}
      {/* ✅ درست شد */}
      {children}
    </AdminSocketContext.Provider>
  );
};
