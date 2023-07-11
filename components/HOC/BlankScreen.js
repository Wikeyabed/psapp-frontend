import React, { use } from "react";
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

  return <div>{delay ? "" : <> {children}</>}</div>;
}

export default BlankScreen;
