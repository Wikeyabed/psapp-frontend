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

  const findFromReduxStore = (store, session) => {
    let newStore = [...store];

    const sortedStore = newStore.sort((a, b) => {
      const lowerID = a.product_uuid.toUpperCase(); // ignore upper and lowercase
      const higherID = b.product_uuid.toUpperCase(); // ignore upper and lowercase
      if (lowerID < higherID) {
        return -1;
      }
      if (lowerID > higherID) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    const sortedSession = session.sort((a, b) => {
      const lowerID = a.product_uuid.toUpperCase(); // ignore upper and lowercase
      const higherID = b.product_uuid.toUpperCase(); // ignore upper and lowercase
      if (lowerID < higherID) {
        return -1;
      }
      if (lowerID > higherID) {
        return 1;
      }

      return 0;
    });

    return intersectionBy(sortedStore, sortedSession, "product_uuid").map(
      (product, i) => {
        console.log("product 23123", product.product_name);

        const cartProducts = {
          ...product,
          ...{
            cart_quantity: session[i].quantity,
            product_name: product.product_name,
          },
        };

        console.log("innn", cartProducts);
        return cartProducts;
      }
    );
  };

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
        console.log("form result :", findFromReduxStore(allProducts, result));
        dispatch(addToCart(findFromReduxStore(allProducts, result)));
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
