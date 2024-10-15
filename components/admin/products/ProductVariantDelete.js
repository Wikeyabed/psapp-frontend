import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";

import { setProductVariant } from "../../../redux/reducers/productSlice";
export default function ProductVariantDelete({ uuid, mainProductId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

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

  const handleDeleteVariant = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products-variant/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log("variantDeleted ", result);
        setOpen(false);
        getProductVariants();
        dispatch(
          setNotificationOn({
            message: "تنوع با موفقیت حذف شد",
            color: "success",
          })
        );
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <DeleteIcon
        sx={{
          cursor: "pointer",
          position: "absolute",

          left: 60,
          top: 15,
        }}
        color="error"
        onClick={handleClickOpen}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"حذف تنوع"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا مابل به حذف این تنوع هستید ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            خیر
          </Button>
          <Button
            color="success"
            onClick={() => handleDeleteVariant(uuid)}
            autoFocus
          >
            بله حذف شود
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
