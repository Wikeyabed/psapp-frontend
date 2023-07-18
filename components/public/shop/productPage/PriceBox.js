import React from "react";
import { Box, Typography, Chip } from "@mui/material";

import { persianNumber } from "../../../../src/PersianDigits";

function PriceBox({ price, discount = 0, quantity }) {
  return (
    <Box
      sx={{
        pt: 3,
        display: "flex",
        justifyContent: discount > 0 ? "space-between" : "space-evenly",
      }}
    >
      {discount > 0 ? (
        <Typography
          sx={{
            color: "text.secondary",
            position: "relative",
            display: "inline-block",
            "&:before": {
              transform: "rotate(-10deg)",
              content: '""',
              borderBottom: "1px solid red",
              width: "100%",
              position: "absolute",
              right: 0,
              top: "40%",
            },
            "&:after": {
              transform: "rotate(10deg)",
              content: '""',
              borderBottom: "1px solid red",
              width: "100%",
              position: "absolute",
              right: 0,
              top: "40%",
            },
          }}
          variant="h6"
        >
          {persianNumber(price)}
          &nbsp;ریال
        </Typography>
      ) : (
        " "
      )}
      <Typography
        sx={{
          color: "text.primary",
          fontWeight: "bold !important",
          typography: { xs: "h5", md: "h4" },
        }}
      >
        {price * (1 - discount * 0.01) * quantity}
        &nbsp;ریال
      </Typography>
      <Chip
        sx={{ alignSelf: "flex-end" }}
        label={
          discount > 0 ? `${persianNumber(discount)}% تخفیف` : "پیشنهاد ویژه"
        }
        color={discount > 0 ? "success" : "info"}
        variant="filled"
      />{" "}
    </Box>
  );
}

export default PriceBox;
