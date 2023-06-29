import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tape from "../../../../public/images/tape.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import Quantity from "./Quantity";

export default function ProductCard() {
  return (
    <Card elevation={2} sx={{ position: "relative", borderRadius: "10px" }}>
      {/* Ratting */}
      <Rating
        sx={{ position: "absolute", left: 5, top: 5 }}
        name="size-small"
        defaultValue={5}
        size="small"
      />
      <CardMedia
        sx={{
          height: 180,
          backgroundSize: "fill",
          borderBottom: "1px solid #e2e2e2",
        }}
        image={Tape.src}
        title="ایباکس"
      />
      <CardContent
        sx={
          {
            // backgroundColor: "#f9f9f9",
          }
        }
      >
        <Typography gutterBottom variant="h6" component="div">
          کارتن پستی کد ۱
        </Typography>

        <Typography
          variant="caption"
          color={"ButtonShadow"}
          textAlign={"right"}
          component="div"
        >
          موجود در انبار
        </Typography>

        <Typography
          variant="caption"
          color={"ButtonShadow"}
          textAlign={"right"}
          component="div"
        >
          کد محصول : k112
        </Typography>

        <Typography
          variant="caption"
          color={"ButtonShadow"}
          textAlign={"right"}
          component="div"
        >
          تعداد در هر بسته{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "darkred",
            }}
          >
            400
          </span>{" "}
          عدد
        </Typography>

        <Quantity />
      </CardContent>
      <CardActions>
        <Typography
          mt={2}
          color="secondary"
          variant="body1"
          component="div"
          textAlign="right"
        >
          ۱,۵۰۰ تومان
        </Typography>

        <Tooltip title="اضافه کردن به سبد خرید" placement="right-start">
          <Button
            sx={{
              paddingLeft: 3,
              marginRight: "auto",
              borderRadius: "8px",
            }}
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
