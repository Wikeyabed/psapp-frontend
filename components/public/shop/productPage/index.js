import { Paper, Grid, Button, Typography, Divider, Box } from "@mui/material";

import Slider from "./Slider";

import BottomTabs from "./BottomTabs";
import SmallDescription from "./SmallDescription";
import Quantity from "./Quantity";

const ProductPage = ({ product }) => {
  return (
    <>
      {product.length > 0 ? (
        <Grid container display={"flex"} justifyContent={"center"}>
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

                marginY: { sm: 5, md: 10 },
                mb: { xs: 10, md: "auto" },

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

                  <SmallDescription
                    desc={product.product_features.split("-")}
                  />
                  <Divider />
                  <Quantity
                    productId={product.product_id}
                    stack={product.stack}
                    quantity={product.product_quantity}
                    discount={product.discount}
                    price={product.price}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <BottomTabs description={product.product_description} />
              </Grid>
            </Paper>
          </Grid>
          {/* <Grid item xs={false} md={2} lg={2.5}></Grid> */}
        </Grid>
      ) : (
        "محصولی پیدا نشد"
      )}
    </>
  );
};
export default ProductPage;
