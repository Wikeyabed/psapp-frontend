import { useState, useEffect, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationOff } from "../../../redux/reducers/notificationSlice";
import { Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const Alert = forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      sx={{
        direction: "ltr !important",
      }}
      elevation={1}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

export default function Notification() {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.showNotification) {
      setTimeout(() => {
        dispatch(setNotificationOff());
      }, 2500);
    }
  });

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        sx={{
          zIndex: 5000,
        }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={notification.showNotification}
      >
        <Alert
          severity={notification.color}
          sx={{
            width: "100%",
            padding: "10px 5px ",
            mt: "120px !important",
          }}
        >
          <Typography
            sx={{
              px: "5px",
              fontSize: "12px",
            }}
            variant="subtitle2"
          >
            {notification.message}
          </Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
