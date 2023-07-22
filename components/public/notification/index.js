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
    setTimeout(() => {
      dispatch(setNotificationOff());
    }, 2000);
  });

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={notification.showNotification}>
        <Alert
          severity={notification.color}
          sx={{
            width: "100%",
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              pr: "10px",
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
