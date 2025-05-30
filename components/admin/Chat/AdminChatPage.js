import { useState } from "react";
import UserList from "./UserList";
import ChatBox from "./ChatBox";

export default function AdminChatPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        direction: "rtl",
      }}
    >
      <UserList
        onSelectUser={(userId) => setSelectedUserId(userId)}
        selectedUserId={selectedUserId}
      />
      <ChatBox selectedUserId={selectedUserId} />
    </div>
  );
}
