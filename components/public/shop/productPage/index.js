import { Paper, Grid, Button, Typography, Divider, Box } from "@mui/material";

import Slider from "./Slider";
import { useRouter } from "next/router";
import BottomTabs from "./BottomTabs";
import SmallDescription from "./SmallDescription";
import Quantity from "./Quantity";
import Error from "../../../../pages/404";
import SelectVariants from "./SelectVariants";
import { useState } from "react";

const ProductPage = ({ product, variants }) => {
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleSelect = (value) => {
    setSelectedVariant(value);
  };

  return (
    <>
      {product != "undefined" ? (
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid item xs={false} md={2} lg={2.5}></Grid>
          <Grid
            sx={{
              p: { xs: 2, md: 0 },
            }}
            item
            xs={12}
            md={10}
            xl={8}
          >
            <Paper
              elevation={3}
              sx={{
                padding: { xs: 0, md: 4 },

                marginY: { sm: 5, md: 10 },
                mb: { xs: 10, md: "auto" },
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
                      fontSize: { xs: "15px", lg: "25px" },
                      paddingBottom: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {product.product_name + "-" + selectedVariant.variant_name}
                  </Typography>

                  <SmallDescription
                    desc={product.product_features.split("-")}
                  />

                  <SelectVariants select={handleSelect} variants={variants} />
                  <Divider />
                  <Box
                    sx={{
                      p: 1,
                    }}
                  >
                    <Quantity
                      product_name={product.product_name}
                      variant_name={selectedVariant.variant_name}
                      productId={product.product_id}
                      stack={selectedVariant.variant_stack}
                      quantity={selectedVariant.variant_quantity}
                      discount={selectedVariant.variant_discount}
                      price={selectedVariant.variant_price}
                      product_uuid={product.product_uuid}
                      variant_uuid={selectedVariant.variant_uuid}
                      images_url={product.images_url}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <BottomTabs
                  postId={product.product_id}
                  description={product.product_description}
                />
              </Grid>
            </Paper>
          </Grid>
          {/* <Grid item xs={false} md={2} lg={2.5}></Grid> */}
        </Grid>
      ) : (
        <>
          <Typography
            sx={{
              mt: 10,
            }}
            variant="h4"
            textAlign={"center"}
          >
            محصول مورد نظر یافت نشد ...{" "}
          </Typography>

          <Typography
            sx={{
              my: 4,
              color: "primary.main",
            }}
            variant="h6"
            textAlign={"center"}
          >
            در حال بازگشت به صفحه اصلی فروشگاه
          </Typography>
        </>
      )}
    </>
  );
};
export default ProductPage;
