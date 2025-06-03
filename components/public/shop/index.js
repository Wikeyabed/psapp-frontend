import React, { useState, useEffect } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import PublicLayout from "../layout";
import dynamic from "next/dynamic";

const Products = dynamic(() => import("./products"));
const ShopSlider = dynamic(() => import("./Slider"));
const LatestBlog = dynamic(() => import("./miniBlog"));

function ShopSkeleton() {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item sx={{ width: { xs: "100%", md: "1024px" } }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          animation="wave"
          sx={{ borderRadius: 2, mb: 4 }}
        />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={6} md={3} key={item}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton width="80%" height={150} sx={{ mt: 1 }} />
                <Skeleton width="60%" height={20} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

function Shop() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      const timer = setTimeout(() => setHasLoaded(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasLoaded]);

  return (
    <PublicLayout>
      {!hasLoaded ? (
        <ShopSkeleton />
      ) : (
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item sx={{ width: { xs: "100%", md: "1024px" } }}>
            <ShopSlider />

            <Box>
              <LatestBlog />
            </Box>
            <Products />
          </Grid>
        </Grid>
      )}
    </PublicLayout>
  );
}

export default Shop;
