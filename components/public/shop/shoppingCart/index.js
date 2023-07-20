import React from "react";
import CartItems from "../../layout/navbar/shoppingCart/CartItems";
import PublicLayout from "../../layout";
import { Grid, Button, Box, Paper, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PaymentIcon from "@mui/icons-material/Payment";
import { useEffect } from "react";
import {
  addToCart,
  getProducts,
} from "../../../../redux/reducers/productSlice";

function ShoppingCart() {
  const allProducts = useSelector((state) => state.product.products);
  const shoppingCart = useSelector((state) => state.product.shoppingCart);
  const dispatch = useDispatch();

  const findProductFromStore = (SessionProducts, StoredProducts) => {
    return StoredProducts.filter((storeProduct) => {
      return SessionProducts.some(
        (sessionProduct) =>
          sessionProduct.product_id === storeProduct.product_id
      );
    }).map((product, i) => {
      if (SessionProducts[i].product_id == product.product_id) {
      }
      return {
        ...product,
        ...{ cart_quantity: SessionProducts[i].quantity },
      };
    });
  };

  const fetchProducts = () => {
    if (!allProducts.length > 0) {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, requestOptions)
        .then((response) => response.json())
        .then((result) => dispatch(getProducts(result)))
        .catch((error) => console.log("error", error));
    }
  };

  const checkCart = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/check`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(addToCart(findProductFromStore(result, allProducts)));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchProducts();
    checkCart();
  }, [allProducts]);

  return (
    <PublicLayout>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            sx={{
              padding: 5,
              borderRadius: "20px",
            }}
          >
            <Typography mb={4} textAlign={"center"} variant="h5">
              سبد خرید
            </Typography>
            <CartItems />
          </Paper>
        </Grid>
        <Grid display={"flex"} justifyContent={"center"} item xs={12}>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: " 400px",
              marginTop: 5,
              borderRadius: "10px",
              backgroundColor: "#274060",
              border: `2px solid  #1B2845 `,
              borderBottom: `4px solid  #1B2845`,
            }}
            size="large"
            color="secondary"
            variant="contained"
            endIcon={<PaymentIcon sx={{ mr: 1 }} />}
            fullWidth={true}
          >
            پرداخت
          </Button>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default ShoppingCart;
