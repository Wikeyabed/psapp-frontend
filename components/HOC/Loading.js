import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import LoadingBar from "./LoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../redux/reducers/loadingSlice";
import { clearSearch } from "../../redux/reducers/productSlice";

export default function Loading() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleStart = () => {
      clearTimeout(timeoutRef.current);
      dispatch(setLoadingOn());
      dispatch(clearSearch());
    };

    const handleComplete = () => {
      // حداقل زمان نمایش لودینگ (مثلاً 400ms)
      timeoutRef.current = setTimeout(() => {
        dispatch(setLoadingOff());
      }, 400);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      clearTimeout(timeoutRef.current);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, dispatch]);

  return loading && <LoadingBar loading={loading} />;
}
