import React, { useState, useEffect } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import PublicLayout from "../layout";
import Features from "./Features";
import Products from "./products";
import ShopSlider from "./Slider";
import LatestBlog from "./miniBlog";

const ShopSkeleton = () => {
  return (
    <PublicLayout>
      <Grid
        container
        sx={{ height: "100%", display: "flex", justifyContent: "center" }}
      >
        <Grid item sx={{ width: { xs: "100%", md: "1024px" } }}>
          {/* اسکلتون اسلایدر */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={{ xs: 250, md: 400 }}
            sx={{
              borderRadius: 2,
              mb: 4,
              bgcolor: "grey.200",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />

          {/* اسکلتون ویژگی‌ها */}
          <Box sx={{ display: "flex", mb: 4 }}>
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={6} md={3} key={item}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={60}
                      height={60}
                      sx={{ mb: 2, bgcolor: "grey.300" }}
                    />
                    <Skeleton width="80%" height={25} sx={{ mb: 1 }} />
                    <Skeleton width="60%" height={20} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* اسکلتون وبلاگ */}
          <Box sx={{ mb: 4 }}>
            <Skeleton width="30%" height={40} sx={{ mb: 3, mx: "auto" }} />
            <Grid container spacing={3}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} md={4} key={item}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={180}
                    sx={{ borderRadius: 2, mb: 2 }}
                  />
                  <Skeleton width="90%" height={25} sx={{ mb: 1 }} />
                  <Skeleton width="70%" height={20} />
                  <Skeleton width="50%" height={20} sx={{ mt: 2 }} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* اسکلتون محصولات */}
          <Box>
            <Skeleton width="30%" height={40} sx={{ mb: 3, mx: "auto" }} />
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={6} md={4} key={item}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    sx={{ borderRadius: 2, mb: 2 }}
                  />
                  <Skeleton width="80%" height={25} />
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="40%" height={30} sx={{ mt: 1 }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
};

function Shop() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی لودینگ داده‌ها
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 ثانیه نمایش اسکلتون

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ShopSkeleton />;
  }

  return (
    <PublicLayout>
      <Grid
        container
        sx={{ height: "100%", display: "flex", justifyContent: "center" }}
      >
        <Grid item sx={{ width: { xs: "100%", md: "1024px" } }}>
          <ShopSlider />
          <Box sx={{ display: "flex" }}>
            <Features />
          </Box>
          <Box>
            <LatestBlog />
          </Box>
          <Products />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default Shop;
