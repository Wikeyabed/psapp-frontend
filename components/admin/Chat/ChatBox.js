import { useContext, useEffect, useState } from "react";
import { AdminSocketContext } from "../../../src/context/AdminSocketContext";

export default function ChatBox({ selectedUserId }) {
  const { socket } = useContext(AdminSocketContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      if (message.from === selectedUserId || message.to === selectedUserId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket, selectedUserId]);

  const sendMessage = () => {
    if (text.trim() === "") return;
    const message = {
      to: selectedUserId,
      text,
    };
    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, { ...message, from: "admin" }]);
    setText("");
  };

  if (!selectedUserId)
    return (
      <div style={{ flex: 1, padding: "1rem" }}>
        لطفاً یک کاربر را انتخاب کنید.
      </div>
    );

  return (
    <div style={{ flex: 1, padding: "1rem", direction: "rtl" }}>
      <h3>چت با کاربر {selectedUserId}</h3>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          background: "#f9f9f9",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === "admin" ? "left" : "right",
              margin: "4px 0",
            }}
          >
            <span
              style={{
                padding: "4px 8px",
                background: "#e0e0e0",
                borderRadius: "6px",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="پیام..."
          style={{ width: "80%", padding: "8px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 16px" }}>
          ارسال
        </button>
      </div>
    </div>
  );
}
