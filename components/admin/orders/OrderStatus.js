import React from "react";
import { Stack, Chip } from "@mui/material";
function OrderStatus({ status }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        sx={{ mx: 2 }}
        label={
          status == "1"
            ? "پرداخت انجام نشده است"
            : status == "2"
            ? "پرداخت ناموفق بوده است"
            : status == "7"
            ? "انصراف از پرداخت"
            : status == "10"
            ? "پرداخت با موفقیت انجام شد"
            : status == "11"
            ? "در حال پردازش"
            : status == "20"
            ? "تکمیل شده"
            : "کنسل شده"
        }
        color={
          status == "1"
            ? "warning"
            : status == "20" || status == "11"
            ? "info"
            : status == "10"
            ? "success"
            : "error"
        }
        variant="filled"
      ></Chip>{" "}
    </Stack>
  );
}

export default OrderStatus;
