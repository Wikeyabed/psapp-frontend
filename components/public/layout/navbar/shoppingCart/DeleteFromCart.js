import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../../redux/reducers/productSlice";

function DeleteFromCart({ productId }) {
  const dispatch = useDispatch();

  const handleDeleteFromCart = () => {
    console.log(productId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("product_id", productId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch(removeFromCart(productId)))
      .catch((error) => console.log("error", error));
  };

  return (
    <IconButton
      onClick={handleDeleteFromCart}
      sx={{
        color: "red",
        position: "absolute",
        left: "0",
        top: "0",
      }}
      aria-label="delete"
    >
      <DeleteForeverIcon />
    </IconButton>
  );
}

export default DeleteFromCart;
