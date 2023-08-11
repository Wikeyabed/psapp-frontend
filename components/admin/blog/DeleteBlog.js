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

function DeleteBlog({ blog, fetchBlogs }) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${blog.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setOpen(false);
        console.log(result);
        fetchBlogs();
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
      <Tooltip title="حذف بلاگ">
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>

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
            آیا از حذف بلاگ{" "}
            <span
              style={{
                color: "#111",
              }}
            >
              {` "${blog.title}" `}
            </span>
            اطمینان دارید ؟
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

export default DeleteBlog;
