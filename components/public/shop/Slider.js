import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";

import FullScreenSlider from "../layout/swiper/FullScreenSwiper";

const BannerBox = styled(Grid)({
  padding: 10,
});

const slides = [
  // { img: Banner0 },
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
  // { img: Banner0Mobile },

  { img: "/images/banner4-mobile.jpg", href: "/shop", text: "خرید" },
  { img: "/images/banner1-mobile.jpg", href: "/shop", text: "خرید" },

  {
    img: "/images/banner2-mobile.jpg",
    href: "/shop/categories?category=کارتن+پستی",
    text: "خرید",
  },
  { img: "/images/banner3-mobile.jpg", href: "/order-form", text: "فرم سفارش" },
];

console.log("slidessssssssss", slides);
function ShopSlider() {
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
