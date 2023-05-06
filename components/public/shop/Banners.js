import { Grid, Box, Paper } from "@mui/material";
import styled from "@emotion/styled";

const BannerBox = styled(Grid)({
  padding: 10,
});

const BannerPaper = styled(Paper)({
  height: "100%",
});

function Banners() {
  return (
    <Grid
      container
      sx={{
        height: { lg: "450px" },
      }}
    >
      <BannerBox item lg={7}>
        <BannerPaper elevation={3}></BannerPaper>
      </BannerBox>

      <Grid item container lg={5}>
        <BannerBox xs={12}>
          {" "}
          <BannerPaper elevation={3}></BannerPaper>
        </BannerBox>

        <BannerBox xs={12}>
          {" "}
          <BannerPaper elevation={3}></BannerPaper>
        </BannerBox>
      </Grid>
    </Grid>
  );
}

export default Banners;
