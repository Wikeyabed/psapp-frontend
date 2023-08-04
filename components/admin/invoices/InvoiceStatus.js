import React from "react";
import { Stack, Chip } from "@mui/material";
function InvoiceStatus({ status }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        sx={{ mx: 2 }}
        label={
          status == "1"
            ? "در انتظار تایید"
            : status == "2"
            ? "در حال پردازش"
            : status == "3"
            ? "تکمیل شده"
            : "کنسل شده"
        }
        color={
          status == "1"
            ? "warning"
            : status == "2"
            ? "info"
            : status == "3"
            ? "success"
            : "error"
        }
        variant="filled"
      ></Chip>{" "}
    </Stack>
  );
}

export default InvoiceStatus;
