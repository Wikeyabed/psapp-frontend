import { useState, useEffect } from "react";

import { Box, Button, CircularProgress } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/reducers/productSlice";
import { setNotificationOn } from "../../../../redux/reducers/notificationSlice";
import { getCookie } from "cookies-next";

function AddToCart({ counter, price, productId, fullStack }) {
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

  const handleAddToCart = async () => {
    handleAlertOpen();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append(`product_id`, `${productId}`);
    urlencoded.append(`quantity`, `${fullStack}`);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(addToCart(findProductFromStore(result, allProducts)));
        handleUserCart(
          JSON.stringify(findProductFromStore(result, allProducts))
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
        disabled={loading}
        onClick={handleAddToCart}
        sx={{
          marginRight: "auto",
          borderRadius: "5px",
          backgroundColor: "lightPrimary.main",

          textAlign: "center",
        }}
        // size="small"
        color="primary"
        variant="contained"
      >
        {loading ? (
          <CircularProgress
            size={26.3}
            sx={{
              color: "#999",
            }}
          />
        ) : (
          "اضافه کردن"
        )}
      </Button>
    </Box>
  );
}

export default AddToCart;
