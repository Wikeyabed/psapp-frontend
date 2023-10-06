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

const BannerPaper = styled(Paper)({
  height: "100%",
  borderRadius: "10px",
});

const BannerImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
});

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
        <FullScreenSlider slides={[Banner1, Banner2, Banner3]} />
      </BannerBox>
    </Grid>
  );
}

export default ShopSlider;
