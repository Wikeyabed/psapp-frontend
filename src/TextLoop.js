import { useState, useEffect } from "react";
import "./TextLoop.css"; // Create this CSS file
import { Box, Typography } from "@mui/material";

const TextLoop = ({ messages = [], interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // Fade out current text
      setIsVisible(false);

      // Wait for fade-out animation to complete before changing text
      setTimeout(() => {
        setCurrentIndex(
          (prev) =>
            (prev + Math.floor(Math.random() * messages.length)) %
            messages.length
        );
        setIsVisible(true);
      }, 500); // Matches CSS transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  if (messages.length === 0) return null;

  return (
    <Box className="text-loop-container">
      <Typography
        sx={{
          fontSize: { xs: 7, md: 14 },
        }}
        className={`text-item ${isVisible ? "visible" : ""}`}
      >
        {messages[currentIndex]}
      </Typography>
    </Box>
  );
};

export default TextLoop;
