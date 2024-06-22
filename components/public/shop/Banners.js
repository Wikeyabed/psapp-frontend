import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import DogPic from "../../../public/images/dog.jpg";
import Banner1 from "../../../public/images/banner1.jpg";
import Banner2 from "../../../public/images/banner2.jpg";
import Banner3 from "../../../public/images/banner3.jpg";
import Banner4 from "../../../public/images/banner4.jpg";

const BannerBox = styled(Grid)({
  padding: 10,
});

const BannerPaper = styled(Paper)({
  height: "100%",
  borderRadius: "10px",
  // border: "1px solid #e0e0e0",
  // borderBottom: "4px solid #e0e0e0",
});

const BannerImage = styled("img")({
  display: { xs: "none !important", md: "block" },
  width: "100%",
  height: "100%",
  objectFit: "fill",
  borderRadius: "10px",
});

const BannerImageMobile = styled("img")({
  display: { md: "none" },
  width: "100%",
  height: "100%",
  objectFit: "fill",
  borderRadius: "10px",
});

function Banners() {
  return (
    <Grid sx={{ display: { xs: "none", md: "flex" } }} container>
      <BannerBox
        // sx={{
        //   height: { md: "auto" },
        // }}
        item
        lg={8}
      >
        <BannerPaper elevation={5}>
          <BannerImage src={Banner2.src} alt="pic" />
          <BannerImageMobile src={Banner2Mobile.src} alt="pic" />
        </BannerPaper>
      </BannerBox>

      <Grid item container lg={4}>
        <BannerBox item xs={12}>
          <BannerPaper elevation={5}>
            <BannerImage src={Banner1.src} alt="pic" />
            <BannerImageMobile src={Banner1Mobile.src} alt="pic" />
          </BannerPaper>
        </BannerBox>

        <BannerBox item xs={12}>
          <BannerPaper elevation={5}>
            <BannerImage src={Banner3.src} alt="pic" />
            <BannerImageMobile src={Banner3Mobile.src} alt="pic" />
          </BannerPaper>
        </BannerBox>
      </Grid>
    </Grid>
  );
}

export default Banners;
