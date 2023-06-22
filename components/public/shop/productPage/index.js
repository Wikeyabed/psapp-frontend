import { Paper, Grid, Button, Typography } from "@mui/material";
import { jsx, css } from "@emotion/react";
import Slider from "./Slider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const ProductPage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={false} md={2} lg={2.5}></Grid>
        <Grid item xs={12} md={8} lg={7}>
          <Paper
            elevation={5}
            sx={{
              padding: 5,
              marginTop: { xs: 3, sm: 5, md: 10 },
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  padding: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    paddingY: 5,
                  }}
                >
                  Product Name
                </Typography>
                <Slider />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  padding: 2,
                  paddingTop: { xs: 5, md: 30 },
                  textAlign: { xs: "center", md: "left" },
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
                    px: { xs: 2, sm: 3 },
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
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={false} md={2} lg={2.5}></Grid>
      </Grid>
    </>
  );
};
export default ProductPage;
