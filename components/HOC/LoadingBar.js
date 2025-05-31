import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingBar = ({ loading, children }) => {
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
          backgroundColor: "background.paper",
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{ mb: 2, color: "#6366f1" }}
        />
        <Typography variant="body2" color="#06b6d4">
          لطفاً چند لحظه صبر کنید
        </Typography>
      </Box>
    );
  }

  return children;
};

export default LoadingBar;
