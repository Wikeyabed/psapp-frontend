import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

function LoadingBar({ children, loading }) {
  return (
    <>
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            backgroundColor: "#fff",
            height: "100%",
            textAlign: "center",
            zIndex: 3900,
            overflow: "hidden",
            overflowY: "hidden",
          }}
        >
          <CircularProgress
            color="primary"
            thickness={2}
            // disableShrink
            sx={{
              position: "absolute",
              animationDuration: "1000ms",

              height: "150px !important",
              marginX: "auto",
              top: "42%",
              width: "150px !important",
              left: 0,
              right: 0,
              borderRadius: "50%",
            }}
          />
          <Image
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "42%",
              marginTop: "45px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/logo.png`}
            width={100}
            height={60}
            alt="ایباکس"
          />
        </Box>
      ) : (
        <> {children}</>
      )}
    </>
  );
}

export default LoadingBar;
