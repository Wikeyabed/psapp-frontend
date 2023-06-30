import { useState, useEffect, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

export default function AlertBar({ openAlert }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
    if (openAlert) {
      setOpen(true);
    }
  }, [openAlert]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", padding: "10px", direction: "ltr !important" }}
        >
          محصول با موفقیت به سبد خرید اضافه شد
        </Alert>
      </Snackbar>
    </Stack>
  );
}
