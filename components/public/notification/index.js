import { useState, useEffect, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationOff } from "../../../redux/reducers/notificationSlice";
import { Typography } from "@mui/material";

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
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={notification.showNotification}
        sx={{
          mt: "80px",
        }}
      >
        <Alert
          severity={notification.color}
          sx={{
            width: "100%",
            padding: "10px 5px ",
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
