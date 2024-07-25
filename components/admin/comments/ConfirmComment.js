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
import { CheckBoxRounded } from "@mui/icons-material";

import { useState } from "react";
import { getCookie } from "cookies-next";

function ConfirmComment({ id, isActive, fetchComments }) {
  const [open, setOpen] = useState(false);

  const handleDisable = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var urlencoded = new URLSearchParams();
    urlencoded.append("is_active", "false");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment-status/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setOpen(false);
        console.log(result);
        fetchComments();
      })
      .catch((error) => console.log("error", error));
  };

  const handleConfirm = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var urlencoded = new URLSearchParams();
    urlencoded.append("is_active", "true");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment-status/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setOpen(false);
        console.log(result);
        fetchComments();
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
      <CheckBoxRounded
        onClick={handleClickOpen}
        sx={{
          ml: 1,
          mt: "4px",
          color: isActive == "true" ? "green" : "gray",
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
            {isActive
              ? "آیا از غیر فعال سازی کامنت اطمینان دارید"
              : "آیا از تایید کامنت اطمینان دارید ؟"}
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
            onClick={isActive == "true" ? handleDisable : handleConfirm}
            autoFocus
          >
            {isActive ? "بله غیر فعال شود" : "بله فعال شود"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmComment;
