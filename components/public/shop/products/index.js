import { Grid, Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ProductListByCategory from "./ProductListByCategory";
import Footer from "../../layout/footer";
function Products() {
  return (
    <>
      <Grid
        id="product_list"
        sx={{
          padding: "10px",
          marginTop: "75px",
        }}
      >
        <Grid
          sx={{
            borderRadius: "10px",
            padding: "10px 20px 20px",
            // minHeight: { md: "600px" },
          }}
          elevation={2}
          container
        >
          {/* <Typography
          sx={{
            mt: 10,

            width: "100% !important",
            fontWeight: "bold",
            textDecoration: "underline",
            textDecorationColor: "#007aff",
            textDecorationThickness: "4px",
            textUnderlineOffset: 12,
            textAlign: "center",
          }}
          variant="h5"
          component={"div"}
        >
          فروشگاه
        </Typography> */}
          {/* <Grid
          sx={{
            display: { xs: "none", md: "flex" },
          }}
          item
          xs={12}
        > */}
          {/* </Grid> */}
          <ProductListByCategory />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Products;
