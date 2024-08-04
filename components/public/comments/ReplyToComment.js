import {
  IconButton,
  Tooltip,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  TextField,
} from "@mui/material";
import { ReplyAll } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Link from "../../../src/Link";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
function ReplyToComment({ userId, parentId, postId, postType, userName }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSetComment = (e) => {
    setComment(e.target.value);
  };
  const handleConfirm = () => {
    dispatch(
      setNotificationOn({
        message: "دیدگاه شما ثبت شد و پس از تایید مدیریت نمایش داده خواهد شد.",
        color: "info",
      })
    );

    setComment("");
    setTimeout(() => {
      handleClose();
    }, 1500);
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", userName);
    urlencoded.append("post_type", postType);
    urlencoded.append("post_id", postId);
    urlencoded.append("content", comment);
    urlencoded.append("is_reply", "true");
    urlencoded.append("parent_comment_id", parentId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/add`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setOpen(false);
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
      <Button
        sx={{ borderRadius: 20 }}
        size="small"
        color="secondary"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <ReplyAll
          sx={{
            ml: 0.5,
          }}
          fontSize="small"
        />
        پاسخ
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
          id="alert-dialog-title"
        >
          {"پاسخ به دیدگاه"}
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: { xs: "320px !important", md: "400px !important" },
          }}
        >
          <DialogContentText id="alert-dialog-description">
            {isLoggedIn ? (
              <TextField
                required
                name="address"
                multiline
                minRows={4}
                fullWidth
                onChange={handleSetComment}
                placeholder="توضیحات ..."
                variant="outlined"
                type="text"
              />
            ) : (
              <Button
                component={Link}
                href={"/auth/login"}
                color="info"
                sx={{
                  py: 2,
                  width: "100%",
                  my: 3,
                }}
                variant="contained"
              >
                لطفا برای ثبت دیدگاه وارد شوید
              </Button>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {" "}
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleConfirm}
              autoFocus
              disabled={comment == ""}
            >
              ثبت پاسخ
            </Button>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReplyToComment;
