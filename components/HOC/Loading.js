import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoadingBar from "./LoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../redux/reducers/loadingSlice";

export default function Loading() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    const handleStart = (url) => {
      dispatch(setLoadingOn());
      console.log("started");
    };

    const handleComplete = (url) => {
      console.log("ended");
      dispatch(setLoadingOff());
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading && <LoadingBar loading={loading} />;
}
