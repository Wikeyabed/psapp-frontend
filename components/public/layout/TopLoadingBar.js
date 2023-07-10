import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";

function TopLoadingBar() {
  const loadingProgress = useSelector((state) => state.loading.progress);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(loadingProgress);
  }, [loadingProgress]);

  return (
    <>
      <LoadingBar
        color="#f11946"
        height={3}
        shadow={false}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </>
  );
}

export default TopLoadingBar;
