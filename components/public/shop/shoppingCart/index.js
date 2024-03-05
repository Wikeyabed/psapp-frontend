/* eslint-disable react-hooks/exhaustive-deps */
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
import Link from "../../../../src/Link";
import { useRouter } from "next/router";
import {
  setOrderPrice,
  setProductsInOrder,
} from "../../../../redux/reducers/orderSlice";

function ShoppingCart() {
  const allProducts = useSelector((state) => state.product.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.product.shoppingCart);
  const router = useRouter();
  const dispatch = useDispatch();

  const findProductFromStore = (SessionProducts, StoredProducts) => {
    console.log("session", SessionProducts);
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

  const sendToCheckout = () => {
    let orderProduct = [];
    let finalPrice = 0;
    cartItems.map((product) => {
      finalPrice +=
        product.price * (1 - product.discount * 0.01) * product.cart_quantity;
      const prodObj = {
        product_discount: product.discount + "%",
        product_name: product.product_name,
        product_quantity: product.cart_quantity,
        unit_price: product.price * (1 - product.discount * 0.01),
        total_price:
          product.price * (1 - product.discount * 0.01) * product.cart_quantity,
      };

      orderProduct = [...orderProduct, prodObj];
    });

    dispatch(setOrderPrice({ totalPrice: finalPrice }));
    dispatch(setProductsInOrder({ products: orderProduct }));

    router.push("/shop/checkout");
  };

  useEffect(() => {
    fetchProducts();
    checkCart();
  }, [allProducts]);

  return (
    <PublicLayout>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} md={8} lg={6}>
          <Grid
            sx={{
              borderRadius: "5px",
            }}
          >
            <Typography mb={4} textAlign={"center"} variant="h5">
              سبد خرید
            </Typography>
            <CartItems />
          </Grid>
        </Grid>
        <Grid display={"flex"} justifyContent={"center"} item xs={12}>
          <Grid xs={12} md={4}>
            {isLoggedIn ? (
              <Button
                disabled={cartItems.length === 0}
                onClick={sendToCheckout}
                sx={{
                  mt: 4,
                  paddingLeft: 5,
                  marginRight: "auto",
                  borderRadius: "10px",
                  backgroundColor: "primary.main",
                  border: "1px solid",
                  borderColor: "lightPrimary.main",
                  borderBottom: "4px solid",
                  borderBottomColor: "lightPrimary.main",
                }}
                size="large"
                color="primary"
                variant="contained"
                endIcon={<PaymentIcon sx={{ mr: 1 }} />}
                fullWidth={true}
              >
                پرداخت
              </Button>
            ) : (
              <Button
                component={Link}
                href="/auth/login"
                sx={{
                  mt: 4,
                  paddingLeft: 5,
                  marginRight: "auto",
                  borderRadius: "10px",
                  backgroundColor: "primary.main",
                  border: "1px solid",
                  borderColor: "lightPrimary.main",
                  borderBottom: "4px solid",
                  borderBottomColor: "lightPrimary.main",
                }}
                size="large"
                color="primary"
                variant="contained"
                endIcon={<PaymentIcon sx={{ mr: 1 }} />}
                fullWidth={true}
              >
                ورود و پرداخت
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default ShoppingCart;
