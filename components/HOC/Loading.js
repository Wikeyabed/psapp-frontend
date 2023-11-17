import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoadingBar from "./LoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../redux/reducers/loadingSlice";
import { clearSearch } from "../../redux/reducers/productSlice";

export default function Loading() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    const handleStart = (url) => {
      dispatch(setLoadingOn());
      dispatch(clearSearch());
    };

    const handleComplete = (url) => {
      setTimeout(() => dispatch(setLoadingOff()), 200);
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
