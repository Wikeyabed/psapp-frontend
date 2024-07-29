import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import DogPic from "../../../public/images/dog.jpg";
import Banner0 from "../../../public/images/banner0.jpg";
import Banner1 from "../../../public/images/banner1.jpg";
import Banner2 from "../../../public/images/banner2.jpg";
import Banner3 from "../../../public/images/banner3.jpg";
import Banner4 from "../../../public/images/banner4.jpg";

import FullScreenSlider from "../layout/swiper/FullScreenSwiper";
import Banner0Mobile from "../../../public/images/banner0-mobile.jpg";
import Banner1Mobile from "../../../public/images/banner1-mobile.jpg";
import Banner2Mobile from "../../../public/images/banner2-mobile.jpg";
import Banner3Mobile from "../../../public/images/banner3-mobile.jpg";
import Banner4Mobile from "../../../public/images/banner4-mobile.jpg";

const BannerBox = styled(Grid)({
  padding: 10,
});

const slides = [
  { img: Banner0 },
  { img: Banner4, href: "/shop", text: "خرید" },

  { img: Banner1, href: "/contact", text: "ثبت درخواست" },
  {
    img: Banner2,
    href: "/shop/categories?category=کارتن+پستی",
    text: "خرید",
  },
  { img: Banner3, href: "/order-form", text: "فرم سفارش" },
];

const mobileSlides = [
  { img: Banner0Mobile },

  { img: Banner4Mobile, href: "/shop", text: "خرید" },
  { img: Banner1Mobile, href: "/shop", text: "خرید" },

  {
    img: Banner2Mobile,
    href: "/shop/categories?category=کارتن+پستی",
    text: "خرید",
  },
  { img: Banner3Mobile, href: "/order-form", text: "فرم سفارش" },
];

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
