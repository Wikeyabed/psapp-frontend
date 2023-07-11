import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

function BlankScreen({ children }) {
  const [delay, setDelay] = useState(true);

  const loadingDelay = () => {
    setTimeout(() => {
      setDelay(false);
    }, 1000);
  };

  useEffect(() => {
    loadingDelay();
  }, []);

  return (
    <>
      {delay ? (
        <Box
          sx={{
            position: "absolute",
            width: "100%",

            height: "100%",
            textAlign: "center",
          }}
        >
          <CircularProgress
            sx={{
              position: "absolute",
              marginX: "auto",
              top: "45%",
              left: 0,
              right: 0,
            }}
            size={50}
            color="primary"
          />
        </Box>
      ) : (
        <> {children}</>
      )}
    </>
  );
}

export default BlankScreen;
