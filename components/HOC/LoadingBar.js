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
            backgroundColor: "rgba(0, 0, 0,0.6)",
            height: "100%",
            textAlign: "center",
            zIndex: 4000,
            overflow: "hidden",
            overflowY: "hidden",
          }}
        >
          <LinearProgress
            color="info"
            sx={{
              position: "absolute",
              height: "10px",
              marginX: "auto",
              top: "45%",
              width: "350px",
              left: 0,
              right: 0,
              borderRadius: "5px",
            }}
            size={10}
          />
        </Box>
      ) : (
        <> {children}</>
      )}
    </>
  );
}

export default LoadingBar;
