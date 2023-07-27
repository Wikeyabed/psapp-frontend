import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

function LoadingBar({ children }) {
  const [delay, setDelay] = useState(true);

  const loadingDelay = () => {
    setTimeout(() => {
      setDelay(false);
    }, 1500);
  };

  useEffect(() => {
    loadingDelay();
  }, []);

  return (
    <>
      {delay ? (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            backgroundColor: "#fff",
            height: "100%",
            textAlign: "center",
            zIndex: 900,
            overflow: "hidden",
            overflowY: "hidden",
          }}
        >
          <LinearProgress
            color="primary"
            sx={{
              position: "absolute",
              height: "70px",
              marginX: "auto",
              top: "45%",
              width: "70px",
              left: 0,
              right: 0,
              borderRadius: "50%",
            }}
          />
        </Box>
      ) : (
        <> {children}</>
      )}
    </>
  );
}

export default LoadingBar;
