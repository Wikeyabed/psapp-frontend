import React from "react";
import { Stack, Chip } from "@mui/material";
function OrderStatus({ status }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        sx={{ mx: 2 }}
        label={
          status == "1"
            ? "پرداخت و تایید شده"
            : status == "2"
            ? "پرداخت شده - تایید نشده"
            : status == "3"
            ? "انصراف از پرداخت"
            : status == "4"
            ? "شماره کارت نامعتبر می باشد"
            : status == "5"
            ? "‌موجودی حساب کافی نمی‌باشد."
            : status == "-2"
            ? "خطای داخلی"
            : "کنسل شده"
        }
        color={
          status == "1"
            ? "success"
            : status == "2" || status == "3"
            ? "warning"
            : "error"
        }
        variant="filled"
      ></Chip>{" "}
    </Stack>
  );
}

export default OrderStatus;
