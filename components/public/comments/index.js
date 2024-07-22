import { useState, useEffect, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationOff } from "../../../redux/reducers/notificationSlice";
import { Typography, Grid, Box } from "@mui/material";

export default function Comments() {
  //   const notification = useSelector((state) => state.notification);
  //   const dispatch = useDispatch();

  useEffect(() => {});

  return (
    <>
      <Grid
        item
        sx={{
          backgroundColor: "#f9f9f9",
          p: 2,
          height: 200,
          borderRadius: 2,
          mb: 1,
        }}
        xs={8}
      >
        Comments
      </Grid>
      <Grid
        item
        sx={{
          backgroundColor: "#f9f9f9",
          p: 2,
          MinHeight: 200,
          borderRadius: 2,
          mb: 1,
        }}
        xs={8}
      >
        عبدالله گفته :
        <br />
        <br />
        این یک کامنت تست است
        <Box
          sx={{
            width: "100%",
            height: 150,
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 2,
            mb: 1,
            mt: 2,
          }}
        >
          fff
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 150,
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 2,
            mb: 1,
            mt: 2,
          }}
        >
          fff
        </Box>
      </Grid>
    </>
  );
}
