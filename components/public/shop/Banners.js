import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import DogPic from "../../../public/images/dog.jpg";
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
  width: "100%",
  height: "100%",
  objectFit: "fill",
  borderRadius: "10px",
});

function Banners() {
  return (
    <Grid container>
      <BannerBox
        sx={{
          height: "500px",
        }}
        item
        lg={7}
      >
        <BannerPaper elevation={5}>
          <BannerImage src={DogPic.src} alt="pic" />
        </BannerPaper>
      </BannerBox>

      <Grid item container lg={5}>
        <BannerBox
          sx={{
            height: "250px",
          }}
          xs={12}
        >
          <BannerPaper elevation={5}>
            <BannerImage src={DogPic.src} alt="pic" />
          </BannerPaper>
        </BannerBox>

        <BannerBox
          sx={{
            height: "250px",
          }}
          xs={12}
        >
          <BannerPaper elevation={5}>
            <BannerImage src={DogPic.src} alt="pic" />
          </BannerPaper>
        </BannerBox>
      </Grid>
    </Grid>
  );
}

export default Banners;
