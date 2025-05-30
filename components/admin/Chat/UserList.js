import { useContext, useEffect, useState } from "react";
import { AdminSocketContext } from "../../../src/context/AdminSocketContext";

export default function UserList({ onSelectUser, selectedUserId }) {
  const { socket } = useContext(AdminSocketContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [socket]);

  return (
    <div
      style={{
        width: "250px",
        borderLeft: "1px solid #ccc",
        padding: "1rem",
        direction: "rtl",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>کاربران آنلاین</h3>
      {onlineUsers.length === 0 && <p>هیچ کاربری آنلاین نیست</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {onlineUsers.map((userId) => (
          <li
            key={userId}
            onClick={() => onSelectUser(userId)}
            style={{
              padding: "0.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
              backgroundColor:
                userId === selectedUserId ? "#cce5ff" : "#f1f1f1",
              borderRadius: "6px",
            }}
          >
            کاربر {userId}
          </li>
        ))}
      </ul>
    </div>
  );
}
