"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
function InstallApp({ mobile }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    if (typeof window != "undefined") {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
      });
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("sw worker registered", reg))
          .catch(() => console.log("failed"));
      }
      return () => {
        window.removeEventListener("beforeinstallprompt", null);
      };
    }
  });

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const promptAppInstall = async () => {
    if (isIos()) {
      // write pop-up message for IOS here.
    }
    if (!isIos()) {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
      } else {
        // Do something when app is already installed
        alert("شما قبلا اپلیکیشن ایباکس را نصب کرده اید.");
      }
    }
  };

  const isWindowsLoadedPc =
    typeof window != "undefined" ? (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 4,
          }}
        >
          "اپلیکیشن میانبر دسترسی به ایباکس"
        </Typography>{" "}
        <Button
          onClick={promptAppInstall}
          variant="contained"
          disableElevation
          size="large"
          sx={{
            borderRadius: "20px",
            backgroundColor: "green",
            mx: "auto",
            width: "250px",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              ml: 2,
            }}
            variant="subtitle1"
          >
            اندروید{" "}
          </Typography>
          <Box>
            <AndroidIcon />
          </Box>
        </Button>
        <Button
          onClick={promptAppInstall}
          variant="contained"
          disableElevation
          size="large"
          sx={{
            borderRadius: "20px",
            backgroundColor: "silver",
            mx: "auto",
            color: "#444",
            width: "250px",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1">نصب اپلیکیشن ایباکس</Typography>
          <Box>
            <AppleIcon />
          </Box>
        </Button>
        <Button
          onClick={promptAppInstall}
          variant="contained"
          disableElevation
          size="large"
          sx={{
            borderRadius: "20px",
            backgroundColor: "blue",
            mx: "auto",
            width: "250px",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              ml: 2,
            }}
            variant="subtitle1"
          >
            ویندوز
          </Typography>
          <Box>
            <MicrosoftIcon />
          </Box>
        </Button>
        <p
          style={{
            textAlign: "center",
          }}
        >
          برای دسترسی سریع و آسان به محصولات <br /> اپلیکیشن ایباکس را نصب کنید.
        </p>
      </Box>
    ) : (
      ""
    );

  return typeof window != "undefined" ? <Box>{isWindowsLoadedPc}</Box> : "";
}

export default InstallApp;
