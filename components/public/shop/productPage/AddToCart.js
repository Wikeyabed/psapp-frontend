import { useState, useEffect } from "react";

import { Box, Button, CircularProgress } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { cookies } from "next/headers";

import AlertBar from "../products/AlertBar";

function AddToCart({ quantity, productId }) {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAlertOpen = () => {
    setAlert(true);
    handleLoading();
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
    return () => {};
  }, [alert]);

  const handleAddToCart = async () => {
    handleAlertOpen();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append(`product_id`, `${productId}`);
    urlencoded.append(`quantity`, `${quantity}`);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <Box
      sx={{
        mt: { xs: 2 },
      }}
    >
      <AlertBar openAlert={alert} />

      <Button
        disabled={loading}
        onClick={handleAddToCart}
        sx={{
          paddingLeft: 5,
          marginRight: "auto",
          borderRadius: "10px",
          backgroundColor: "#274060",

          border: `2px solid ${loading ? "#ccc" : "#1B2845"} `,
          borderBottom: `4px solid ${loading ? "#999" : "#1B2845"}`,
        }}
        size="large"
        color="secondary"
        fullWidth
        variant="contained"
        startIcon={loading ? "" : <AddShoppingCart sx={{ ml: 2 }} />}
      >
        {loading ? (
          <CircularProgress
            size={26.3}
            sx={{
              color: "#999",
            }}
          />
        ) : (
          "اضافه کردن به سبد خرید"
        )}
      </Button>
    </Box>
  );
}

export default AddToCart;
