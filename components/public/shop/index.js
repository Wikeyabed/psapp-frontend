import React, { useState, useEffect, useRef, Suspense } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import PublicLayout from "../layout";
import dynamic from "next/dynamic";
import Image from "next/image";

// هوک سفارشی برای Intersection Observer
const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};

// کامپوننت‌های دینامیک با پیش‌لودینگ هوشمند
const ShopSlider = dynamic(() => import("./Slider"), {
  loading: () => <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />,
  ssr: false
});

const Products = dynamic(() => import("./products"), {
  loading: () => <ProductsSkeleton />,
  ssr: false
});

const LatestBlog = dynamic(() => import("./miniBlog"), {
  loading: () => <BlogSkeleton />,
  ssr: false
});

// اسکلتون‌های بهبود یافته
const ProductsSkeleton = () => (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(8)].map((_, i) => (
      <Grid item xs={6} md={3} key={i}>
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
        <Skeleton width="60%" height={24} sx={{ mt: 1 }} />
        <Skeleton width="40%" height={20} />
        <Skeleton width="80%" height={36} sx={{ mt: 2 }} />
      </Grid>
    ))}
  </Grid>
);

const BlogSkeleton = () => (
  <Box sx={{ mt: 4 }}>
    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
    <Skeleton width="80%" height={30} sx={{ mt: 2 }} />
    <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
  </Box>
);

const Shop = () => {
  const productsRef = useRef();
  const blogRef = useRef();
  const isProductsVisible = useOnScreen(productsRef);
  const isBlogVisible = useOnScreen(blogRef);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // لود داده‌های اولیه
  useEffect(() => {
    const loadInitialData = async () => {
      // اینجا می‌توانید API calls برای داده‌های اولیه قرار دهید
      await new Promise(resolve => setTimeout(resolve, 500)); // شبیه‌سازی لود داده
      setInitialDataLoaded(true);
    };

    loadInitialData();
  }, []);

  return (
    <PublicLayout>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sx={{ width: { xs: "100%", md: "1024px" } }}>
          {/* اسلایدر - همیشه لود شود */}
          <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
            <ShopSlider />
          </Suspense>

          {/* بخش وبلاگ - لود هنگام نمایش در viewport */}
          <Box ref={blogRef} sx={{ mt: 6 }}>
            {isBlogVisible || initialDataLoaded ? (
              <Suspense fallback={<BlogSkeleton />}>
                <LatestBlog />
              </Suspense>
            ) : (
              <BlogSkeleton />
            )}
          </Box>

          {/* محصولات - لود هنگام نمایش در viewport */}
          <Box ref={productsRef} sx={{ mt: 4 }}>
            {isProductsVisible || initialDataLoaded ? (
              <Suspense fallback={<ProductsSkeleton />}>
                <Products />
              </Suspense>
            ) : (
              <ProductsSkeleton />
            )}
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
};

export default Shop;