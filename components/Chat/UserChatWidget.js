import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useRouter } from "next/router";
import {
  Button,
  Box,
  TextField,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const UserChatWidget = () => {
  const { socket, isConnected } = useSocket();
  const user = useSelector((state) => state.auth?.user);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!socket) return;

    console.log("📡 Listening for messages...");
    socket.on("receiveMessage", (msg) => {
      console.log("📥 پیام دریافتی:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleSend = () => {
    if (!text.trim()) return;

    const msg = {
      sender: user?.id || "guest",
      message: text,
      timestamp: new Date(),
    };

    console.log("📤 ارسال پیام:", msg);
    socket.emit("sendMessage", msg); // 👈 هماهنگ با سرور
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  const handleOpenChat = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setOpen(true);
  };

  if (!isConnected) return null;

  return (
    <Box position="fixed" bottom={24} left={24} zIndex={9999}>
      {!open ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenChat}
          sx={{
            borderRadius: "12px",
            height: "48px",
            backgroundColor: "#6366f1",
            fontFamily: "Segoe UI",
          }}
          startIcon={<ChatIcon />}
        >
          چت با ما
        </Button>
      ) : (
        <Paper
          sx={{
            width: 300,
            height: 400,
            display: "flex",
            flexDirection: "column",
            p: 1,
            boxShadow: 3,
            borderRadius: "12px",
            background: "#fff",
            fontFamily: "Segoe UI",
            direction: "rtl",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">پشتیبانی آنلاین</Typography>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box flex={1} overflow="auto" my={1}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                my={0.5}
                textAlign={msg.sender === user?.id ? "right" : "left"}
              >
                <Typography
                  variant="body2"
                  sx={{
                    background: msg.sender === user?.id ? "#6366f1" : "#e0e0e0",
                    color: msg.sender === user?.id ? "#fff" : "#000",
                    px: 1.5,
                    py: 1,
                    borderRadius: "12px",
                    display: "inline-block",
                    fontSize: "14px",
                  }}
                >
                  {msg.message}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box display="flex" mt={1}>
            <TextField
              size="small"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="پیام شما..."
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default UserChatWidget;
