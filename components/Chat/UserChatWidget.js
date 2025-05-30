import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "../../context/SocketContext";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  TextField,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Badge,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Send as SendIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon
} from "@mui/icons-material";

const UserChatWidget = () => {
  const { socket, isConnected, error: socketError, retryCount } = useSocket();
  const user = useSelector((state) => state.auth?.user);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (!socket || !isConnected) return;
  
    const handleReceiveMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
      if (!open) setUnreadCount(prev => prev + 1);
    };
  
    socket.on("receiveMessage", handleReceiveMessage);
  
    // بارگیری تاریخچه چت هنگام اتصال
    socket.emit("getChatHistory", (history) => {
      setMessages(history || []);
    });
  
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, isConnected, open]);
  
  const handleSend = () => {
    if (!text.trim()) return;
  
    const msg = {
      text,
      senderId: user?.id || "guest",
      senderName: user?.username || "کاربر مهمان",
      avatar: user?.avatar || "/default-avatar.png"
    };
  
    socket.emit("sendMessage", msg, () => {
      setText(""); // پاک کردن فیلد متن پس از ارسال موفق
    });
  };

  const handleRetryConnection = () => {
    window.location.reload();
  };

  if (!isConnected) {
    return (
      <Box position="fixed" bottom={24} left={24} zIndex={9999}>
        <Button
          variant="contained"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={handleRetryConnection}
          sx={{
            borderRadius: '12px',
            fontFamily: 'inherit'
          }}
        >
          {socketError || 'اتصال به چت ناموفق بود'}
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box position="fixed" bottom={24} left={24} zIndex={9999}>
        {!open ? (
          <Badge badgeContent={unreadCount} color="error">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              startIcon={<ChatIcon />}
              sx={{
                borderRadius: '12px',
                fontFamily: 'inherit'
              }}
            >
              چت پشتیبانی
            </Button>
          </Badge>
        ) : (
          <Paper sx={{ width: 320, height: 400, display: 'flex', flexDirection: 'column' }}>
            {/* محتوای چت */}
          </Paper>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {socketError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserChatWidget;