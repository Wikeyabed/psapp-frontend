import React from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";

import { persianNumber } from "../../../../src/PersianDigits";

function PriceBox({ price, discount = 0, quantity, counter, stack }) {
  return (
    <>
      <Box>
        <Typography color="text.secondary" variant="body2">
          {" "}
          قیمت هر عدد : {persianNumber(price)} ریال
        </Typography>

        <Typography color="text.secondary" variant="body2">
          {" "}
          قیمت هر بسته : {persianNumber(price * stack)} ریال
        </Typography>

        <Typography color="text.secondary" variant="body2">
          تعداد در هر بسته : {persianNumber(stack)} عدد
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 8,
          textAlign: { xs: "center !important" },
          display: { xs: "block", lg: "flex" },
          justifyContent: {
            lg: discount > 0 ? "space-between" : "space-evenly",
          },
        }}
      >
        {discount > 0 ? (
          <Typography
            sx={{
              color: "text.secondary",
              position: "relative",
              display: "inline-block",
              "&:before": {
                transform: "rotate(-8deg)",
                content: '""',
                borderBottom: "2px solid #ff3000",
                width: "95%",
                position: "absolute",
                right: 0,
                top: "50%",
                right: "2.5%",
              },
              "&:after": {
                transform: "rotate(8deg)",
                content: '""',
                borderBottom: "2px solid #ff3000",
                width: "95%",
                position: "absolute",
                right: 0,
                top: "50%",
                right: "2.5%",
              },
            }}
            variant="h6"
          >
            {persianNumber(price * stack * counter)}
            &nbsp;ریال
          </Typography>
        ) : (
          " "
        )}
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: "bold !important",
            typography: { xs: "h6", md: "h5" },
            textAlign: "center",
            my: { xs: 2, lg: 0 },
          }}
        >
          {persianNumber(price * stack * (1 - discount * 0.01) * counter)}
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
    </>
  );
}

export default PriceBox;
