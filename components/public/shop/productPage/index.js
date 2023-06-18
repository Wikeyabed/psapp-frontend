import { Paper, Grid, Button, Typography } from "@mui/material";
import { jsx, css } from "@emotion/react";
import Slider from "./Slider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductPage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid md={2} lg={2.5}></Grid>
        <Grid item xs={12} md={8} lg={7}>
          <Paper
            elevation={5}
            sx={{
              padding: 5,
              marginTop: 10,
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid
                item
                md={6}
                sx={{
                  padding: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    paddingY: 5,
                  }}
                >
                  نام محصول
                </Typography>
                <Slider />
              </Grid>

              <Grid
                item
                md={6}
                sx={{
                  padding: 2,
                  paddingTop: 30,
                }}
              >
                <ul>
                  <li>f1</li>
                  <li>f2</li>
                  <li>f3</li>
                  <li>f4</li>
                  <li>f5</li>
                </ul>
                <Typography variant="caption">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  pellentesque consequat quam, sit amet efficitur libero
                  ullamcorper quis. Praesent at aliquet arcu, ut eleifend nunc.
                </Typography>

                <Button
                  sx={{
                    py: 2,
                    px: 3,
                    borderRadius: "10px",
                  }}
                  variant="contained"
                  size="large"
                  color="primary"
                  startIcon={
                    <ShoppingCartIcon
                      sx={{
                        ml: 2,
                      }}
                    />
                  }
                >
                  اضافه کردن به سبد خرید
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid md={2} lg={2.5}></Grid>
      </Grid>
    </>
  );
};

export default ProductPage;
