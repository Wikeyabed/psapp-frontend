import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import { persianNumber } from "../../../../src/PersianDigits";

import Link from "../../../../src/Link";

export default function ProductCard({
  productName,
  productCode,
  price,
  quantity,
  imageUrl,
}) {
  return (
    <Card elevation={2} sx={{ position: "relative", borderRadius: "10px" }}>
      <CardMedia
        sx={{
          height: 250,
          backgroundSize: "fill",
          borderBottom: "1px solid #e2e2e2",
        }}
        image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl}`}
        title="ایباکس"
      />
      <CardContent>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "20px",
          }}
          gutterBottom
          variant="h6"
          component="div"
        >
          {productName}
        </Typography>

        <Typography
          variant="caption"
          color="ButtonText"
          textAlign={"right"}
          component="div"
        >
          موجود در انبار
        </Typography>

        <Typography
          variant="caption"
          color="ButtonText"
          textAlign={"right"}
          component="div"
        >
          کد محصول : {productCode}
        </Typography>

        <Typography
          variant="caption"
          color="ButtonText"
          textAlign={"right"}
          component="div"
        >
          تعداد در هر بسته : {quantity}
        </Typography>

        {/* <Quantity /> */}

        {/* Price */}
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "20px",
            color: "red",
          }}
          variant="h6"
        >
          {persianNumber(price)}
          &nbsp;ریال
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="اضافه کردن به سبد خرید" placement="bottom">
          <Button
            href={`/shop/${productCode}/`}
            component={Link}
            sx={{
              paddingLeft: 5,
              marginRight: "auto",
              borderRadius: "10px",
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "lightPrimary.main",
              borderBottom: "4px solid",
              borderBottomColor: "lightPrimary.main",
            }}
            size="large"
            color="primary"
            fullWidth
            variant="contained"
            startIcon={<AddShoppingCartIcon sx={{ ml: 2 }} />}
          >
            خرید
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
