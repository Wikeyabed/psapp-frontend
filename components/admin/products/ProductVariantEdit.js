import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";

import { setProductVariant } from "../../../redux/reducers/productSlice";
export default function ProductVariantEdit({
  uuid,
  variant,
  clearId,
  mainProductId,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProductVariants = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products-variant/${mainProductId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("all the variant for this id ", result);
        dispatch(setProductVariant(result));
      })
      .catch((error) => console.log("error", error));
  };

  const handleEditVariant = async () => {
    let myHeaders = new Headers();

    console.log("variant data form box", variant);
    myHeaders.append("token", getCookie("x-auth-token"));

    var urlencoded = new URLSearchParams();
    urlencoded.append("variant_name", variant.variant_name);
    urlencoded.append("variant_stack", variant.variant_stack * 1);
    urlencoded.append("variant_quantity", variant.variant_quantity * 1);
    // urlencoded.append("variant_color", variant.variant_color);
    urlencoded.append("variant_price", variant.variant_price * 1);
    urlencoded.append("variant_discount", variant.variant_discount * 1);
    urlencoded.append("variant_uuid", uuid);
    urlencoded.append("variant_sort", variant.variant_sort * 1);
    urlencoded.append("is_active", variant.is_active);
    console.log(variant.is_active);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products-variant/${uuid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("results", result);
        setOpen(false);
        dispatch(
          setNotificationOn({
            message: "تنوع با موفقیت بروزرسانی شد",
            color: "success",
          })
        );
        getProductVariants();
        clearId();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <CheckCircle
        sx={{
          cursor: "pointer",
          position: "absolute",

          left: 15,
          top: 15,
        }}
        color="success"
        onClick={handleClickOpen}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"بروزرسانی تنوع"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا مابل به بروزرسانی این تنوع هستید ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            خیر
          </Button>
          <Button color="success" onClick={handleEditVariant} autoFocus>
            بله بروزرسانی شود
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
