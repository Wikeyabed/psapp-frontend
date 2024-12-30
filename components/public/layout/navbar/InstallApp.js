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
      <Button
        onClick={promptAppInstall}
        variant="contained"
        disableElevation
        size="large"
        sx={{
          borderRadius: "20px",
          backgroundColor: "brown",
          mx: "auto",
        }}
      >
        <Typography variant="subtitle1">نصب اپلیکیشن ایباکس</Typography>
        <Box>
          <MicrosoftIcon />
          <AppleIcon />
          <AndroidIcon />
        </Box>
      </Button>
    ) : (
      ""
    );

  const isWindowsLoadedMobile =
    typeof window != "undefined" ? (
      <Button
        onClick={promptAppInstall}
        variant="contained"
        disableElevation
        size="large"
        sx={{
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "brown",
          mx: "auto",
        }}
      >
        <Typography variant="subtitle1">نصب اپلیکیشن ایباکس</Typography>
        <Box>
          <MicrosoftIcon />
          <AppleIcon />
          <AndroidIcon />
        </Box>
      </Button>
    ) : (
      ""
    );

  return mobile ? (
    <Box>{isWindowsLoadedMobile}</Box>
  ) : (
    <Box>{isWindowsLoadedPc}</Box>
  );
}

export default InstallApp;
