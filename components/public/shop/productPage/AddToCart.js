import { useState, useEffect } from "react";

import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/reducers/productSlice";
import { setNotificationOn } from "../../../../redux/reducers/notificationSlice";
import { getCookie } from "cookies-next";
import { intersectionBy } from "lodash";

function AddToCart({
  counter,
  price,
  productId,
  fullStack,
  showDetails,
  product_uuid,
  instock,
}) {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(false);

  const handleAlertOpen = () => {
    dispatch(
      setNotificationOn({
        message: "محصول با موفقیت به سبد خرید اضافه شد ",
        color: "success",
      })
    );
    handleLoading();
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // const findProductFromStore = (SessionProducts, StoredProducts) => {
  //   return StoredProducts.filter((storeProduct) => {
  //     return SessionProducts.some((sessionProduct) => {
  //       sessionProduct.product_uuid === storeProduct.product_uuid;
  //     });
  //   }).map((product, i) => {
  //     if (SessionProducts[i].product_uuid === product.product_uuid) {
  //       return {
  //         ...product,
  //         ...{ cart_quantity: SessionProducts[i].quantity },
  //       };
  //     }
  //   });
  // };

  const handleAddToCart = async () => {
    console.log("adding to cart", product_uuid, fullStack);
    handleAlertOpen();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append(`product_uuid`, `${product_uuid}`);
    urlencoded.append(`product_id`, `${productId}`);
    urlencoded.append(`quantity`, `${fullStack}`);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(intersectionBy(allProducts, result, "product_uuid"));
        dispatch(
          addToCart(intersectionBy(allProducts, result, "product_uuid"))
        );
        handleUserCart(
          JSON.stringify(intersectionBy(allProducts, result, "product_uuid"))
        );
      })
      .catch((error) => console.log("error", error));
  };

  const handleUserCart = (products) => {
    if (isLoggedIn) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("token", getCookie("x-auth-token"));

      var urlencoded = new URLSearchParams();
      urlencoded.append("shopping_list_id", products);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/user`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <Box>
      <Button
        disabled={loading || instock < 1}
        onClick={handleAddToCart}
        sx={{
          p: `${loading ? 0 : "5px"}`,
          fontSize: { xs: "11px", md: "inherit" },
          marginRight: "auto",
          borderRadius: "5px",
          backgroundColor: "lightPrimary.main",
          width: {
            xs: `${showDetails ? "auto" : "120px"}`,
            md: `${showDetails ? "320px" : "120px"}`,
          },
          height: "36.5px",
          textAlign: "center",
        }}
        endIcon={showDetails ? <AddShoppingCart sx={{ mr: 1 }} /> : ""}
        // size="small"
        fullWidth={true}
        color="primary"
        variant="contained"
      >
        {loading ? (
          <Box
            sx={{
              width: "100%",
              borderRadius: "5px",
            }}
          >
            <LinearProgress
              sx={{
                color: "green",
                opacity: 0.3,
                height: "36.5px",
                borderRadius: "5px",
              }}
            />
          </Box>
        ) : (
          `${showDetails ? "اضافه کردن به سبد " : "اضافه کردن"}`
        )}
      </Button>
    </Box>
  );
}

export default AddToCart;
