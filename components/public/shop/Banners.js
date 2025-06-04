import { Grid, Paper, Skeleton, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const BannerBox = styled(Grid)({
  padding: 10,
});

const BannerPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
}));

const BannerImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "10px",
  display: "block",
});

const BannerSkeleton = () => (
  <BannerPaper elevation={5}>
    <Skeleton 
      variant="rectangular" 
      width="100%" 
      height="100%"
      sx={{ borderRadius: "10px" }}
      animation="wave"
    />
  </BannerPaper>
);

function Banners() {
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery('(min-width:900px)');
  const [images, setImages] = useState([]);

  // شبیه‌سازی بارگذاری تصاویر
  useEffect(() => {
    const timer = setTimeout(() => {
      setImages([
        { id: 1, src: "/images/banner1.jpg", mobileSrc: "/images/banner1-mobile.jpg" },
        { id: 2, src: "/images/banner2.jpg", mobileSrc: "/images/banner2-mobile.jpg" },
        { id: 3, src: "/images/banner3.jpg", mobileSrc: "/images/banner3-mobile.jpg" },
        { id: 4, src: "/images/banner4.jpg", mobileSrc: "/images/banner4-mobile.jpg" },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isDesktop) return null;

  return (
    <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
      {loading ? (
        <>
          <BannerBox item lg={8}>
            <BannerSkeleton />
          </BannerBox>
          <Grid item container lg={4}>
            {[1, 2, 3].map((item) => (
              <BannerBox item xs={12} key={`skeleton-${item}`}>
                <BannerSkeleton />
              </BannerBox>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <BannerBox item lg={8}>
            <BannerPaper elevation={5}>
              <BannerImage 
                src={images[1]?.src} 
                alt="banner" 
                loading="lazy"
              />
            </BannerPaper>
          </BannerBox>
          <Grid item container lg={4}>
            {[0, 2, 3].map((index) => (
              <BannerBox item xs={12} key={images[index]?.id}>
                <BannerPaper elevation={5}>
                  <BannerImage 
                    src={images[index]?.src} 
                    alt="banner" 
                    loading="lazy"
                  />
                </BannerPaper>
              </BannerBox>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Banners;