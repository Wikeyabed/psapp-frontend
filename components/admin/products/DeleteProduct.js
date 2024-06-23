import {
  IconButton,
  Tooltip,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { getCookie } from "cookies-next";

function DeleteProduct({ id, fetchProducts }) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setOpen(false);
        console.log(result);
        fetchProducts();
      })
      .catch((error) => console.log("error", error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DeleteIcon
        onClick={handleClickOpen}
        sx={{
          ml: 1,
          mt: "4px",
          color: "red",
          cursor: "pointer",
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"هشدار"}</DialogTitle>
        <DialogContent
          sx={{
            minWidth: "400px !important",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            آیا از حذف محصول اطمینان دارید ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              ml: 1,
            }}
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            خیر
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleDelete}
            autoFocus
          >
            بله , حذف شود
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteProduct;
