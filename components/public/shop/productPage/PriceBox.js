import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import PersianNumber from "../../../../src/PersianDigits";
PersianNumber;

function PriceBox() {
  return (
    <Box
      sx={{
        pt: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
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
        {" "}
        <PersianNumber number={12500} />
        &nbsp;ریال
      </Typography>
      <Typography
        sx={{
          color: "text.primary",
          fontWeight: "bold !important",
          typography: { xs: "h5", md: "h4" },
        }}
      >
        <PersianNumber number={12500} />
        &nbsp;ریال
      </Typography>
      <Chip label="10% تخفیف" color="success" variant="filled" />{" "}
    </Box>
  );
}

export default PriceBox;
