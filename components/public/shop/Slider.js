import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import DogPic from "../../../public/images/dog.jpg";
import Banner1 from "../../../public/images/banner1.jpg";
import Banner2 from "../../../public/images/banner2.jpg";
import Banner3 from "../../../public/images/banner3.jpg";
import FullScreenSlider from "../layout/swiper/FullScreenSwiper";

const BannerBox = styled(Grid)({
  padding: 10,
});

const slides = [
  { img: Banner1, href: "/contact", text: "ثبت درخواست" },
  {
    img: Banner2,
    href: "/shop/categories?category=کارتن+پستی",
    text: "خرید",
  },
  { img: Banner3, href: "/order-form", text: "فرم سفارش" },
];

function ShopSlider() {
  return (
    <Grid sx={{ display: "flex" }} container>
      <BannerBox
        sx={{
          height: { xs: "170px", sm: "320px", md: "400px" },
        }}
        item
        xs={12}
      >
        <FullScreenSlider slides={slides} />
      </BannerBox>
    </Grid>
  );
}

export default ShopSlider;
