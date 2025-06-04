import { Grid, Skeleton, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import FullScreenSlider from "../layout/swiper/FullScreenSwiper";

const BannerBox = styled(Grid)({
  padding: 10,
});

const slides = [
  { img: "/images/banner4.jpg", href: "/shop", text: "خرید" },
  { img: "/images/banner1.jpg", href: "/contact", text: "ثبت درخواست" },
  {
    img: "/images/banner2.jpg",
    href: "/shop/categories?category=کارتن+پستی",
    text: "خرید",
  },
  { img: "/images/banner3.jpg", href: "/order-form", text: "فرم سفارش" },
];

const mobileSlides = [
  { img: "/images/banner4-mobile.jpg", href: "/shop", text: "خرید" },
  { img: "/images/banner1-mobile.jpg", href: "/shop", text: "خرید" },
  {
    img: "/images/banner2-mobile.jpg",
    href: "/shop/categories?category=کارتن+پستی",
    text: "خرید",
  },
  { img: "/images/banner3-mobile.jpg", href: "/order-form", text: "فرم سفارش" },
];

function ShopSlider() {
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    // شبیه‌سازی زمان لودینگ
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // اسکلتون بنر با ابعاد ریسپانسیو
  const BannerSkeleton = () => (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={isMobile ? 200 : 400}
      sx={{ 
        borderRadius: 2,
        mx: 'auto',
        maxWidth: '100%'
      }}
      animation="wave"
    />
  );

  if (loading) {
    return (
      <Grid container sx={{ display: "flex" }}>
        <BannerBox
          sx={{
            height: "auto",
            width: '100%',
            display: { xs: isMobile ? "block" : "none", md: "block" }
          }}
          item
          xs={12}
        >
          <BannerSkeleton />
        </BannerBox>
      </Grid>
    );
  }

  return (
    <Grid sx={{ display: "flex" }} container>
      <BannerBox
        sx={{
          height: "auto",
          display: { xs: "none", md: "block" },
        }}
        item
        xs={12}
      >
        <FullScreenSlider slides={slides} />
      </BannerBox>

      <BannerBox
        sx={{
          height: "auto",
          display: { md: "none" },
        }}
        item
        xs={12}
      >
        <FullScreenSlider slides={mobileSlides} />
      </BannerBox>
    </Grid>
  );
}

export default ShopSlider;