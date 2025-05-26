import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import Image from "next/image";

// انیمیشن‌های سفارشی
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// کامپوننت استایل‌دهی شده
const GradientCircle = styled("div")(({ theme }) => ({
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: `linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)`,
  backgroundSize: "200% 200%",
  animation: `${gradientFlow} 4s ease infinite`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "90%",
    height: "90%",
    borderRadius: "50%",
    background: "#fff",
  },
}));

const LoadingBar = ({ loading, children }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 10));
    }, 300);

    return () => clearInterval(timer);
  }, [loading]);

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(5px)",
        }}
      >
        <GradientCircle>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={110}
            thickness={2}
            sx={{
              position: "absolute",
              color: "rgba(255, 255, 255, 0.3)",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#6366f1",
              zIndex: 1,
              animation: `${float} 3s ease infinite`,
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </GradientCircle>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#6366f1",
              fontWeight: "bold",
              mb: 1,
              background: "linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            در حال آماده‌سازی...
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", maxWidth: "300px" }}
          >
            لطفاً چند لحظه صبر کنید
          </Typography>
        </Box>

        <Box
          sx={{
            width: "80%",
            maxWidth: "300px",
            height: "6px",
            background: "#e5e7eb",
            borderRadius: "3px",
            mt: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
              transition: "width 0.4s ease-out",
              borderRadius: "3px",
            }}
          />
        </Box>
      </Box>
    );
  }

  return children;
};

export default LoadingBar;
