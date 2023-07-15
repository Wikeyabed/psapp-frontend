import { Paper, Grid, Button, Typography, Divider, Box } from "@mui/material";
import { jsx, css } from "@emotion/react";
import Slider from "./Slider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BottomTabs from "./BottomTabs";
import SmallDescription from "./SmallDescription";
import PriceBox from "./PriceBox";

const ProductPage = ({ product }) => {
  return (
    <>
      <Grid container display={"flex"} justifyContent={"center"} spacing={3}>
        {/* <Grid item xs={false} md={2} lg={2.5}></Grid> */}
        <Grid
          sx={{
            p: { xs: 2, md: 0 },
          }}
          item
          xs={12}
          md={8}
          lg={8}
        >
          <Paper
            elevation={7}
            sx={{
              padding: { xs: 0, md: 4 },

              marginY: { xs: 2, sm: 5, md: 10 },

              borderRadius: "20px",
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
                <Slider images={product.images_url} />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  position: "relative",
                  padding: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "35px",
                    paddingBottom: 5,
                    fontWeight: "bold",
                  }}
                >
                  {product.product_name}
                </Typography>

                <SmallDescription desc={product.product_features.split("-")} />

                <Divider />
                <PriceBox discount={product.discount} price={product.price} />

                <Box
                  sx={{
                    mt: { xs: 2 },
                  }}
                >
                  <Button
                    sx={{
                      mt: 2,
                      py: 2,
                      px: { xs: 2, sm: 3 },
                      borderRadius: "10px",
                    }}
                    fullWidth={true}
                    variant="contained"
                    size="large"
                    color="secondary"
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
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <BottomTabs description={product.product_description} />
            </Grid>
          </Paper>
        </Grid>
        {/* <Grid item xs={false} md={2} lg={2.5}></Grid> */}
      </Grid>
    </>
  );
};
export default ProductPage;
