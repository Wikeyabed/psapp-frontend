import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { persianNumber } from "../../../../../src/PersianDigits";
import Typography from "@mui/material/Typography";

import { Badge } from "@mui/material";

import { useSelector } from "react-redux";
import DeleteFromCart from "./DeleteFromCart";

export default function CartItems() {
  const cartItems = useSelector((state) => state.product.shoppingCart);

  let totalPrice = 0;
  return (
    <Box
      sx={{
        minWidth: { md: "700px" },

        overflow: "hidden",
      }}
    >
      {cartItems.map((product, i) => {
        const discountedPrice = product.price * (1 - product.discount * 0.01);

        totalPrice += discountedPrice * product.cart_quantity;

        return (
          <Box key={i}>
            <Card
              sx={{
                display: "flex",
                position: "relative",
                borderRadius: 0,
                borderBottom: "1px solid #ccc",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 80,

                  position: "absolute",
                  left: 0,
                  bottom: 0,
                }}
                image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.images_url[0]}`}
                alt={product.product_name}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    sx={{
                      mb: 1,
                    }}
                    component="div"
                    variant="body2"
                  >
                    {product.product_name}

                    {/* <Badge
                      sx={{
                        color: "#fff",
                        paddingX: "40px",
                        marginRight: "30px",
                      }}
                      badgeContent={`${persianNumber(
                        (product.cart_quantity * 1) / (product.stack * 1)
                      )} ${"بسته"} `}
                      color="info"
                    /> */}
                    <DeleteFromCart product_uuid={product.product_uuid} />
                  </Typography>

                  <Typography variant="caption" color="#000" component="div">
                    تعداد کل : {product.cart_quantity} عدد
                  </Typography>

                  <Typography
                    variant="caption"
                    color="secondary"
                    component="div"
                  >
                    <span
                      style={{
                        color: "#222",
                      }}
                    >
                      {" "}
                      مبلغ هر عدد :{" "}
                    </span>
                    {persianNumber(discountedPrice)} ریال
                  </Typography>

                  <Typography
                    variant="caption"
                    color="secondary"
                    component="div"
                  >
                    <span
                      style={{
                        color: "#222",
                      }}
                    >
                      {" "}
                      مبلغ کل :{" "}
                    </span>
                    {persianNumber(
                      discountedPrice * product.cart_quantity
                    )}{" "}
                    ریال
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Box>
        );
      })}

      <Box>
        <Typography
          color="Highlight"
          variant="subtitle1"
          sx={{
            direction: "ltr !important",
            textAlign: "center",
            mt: 4,
          }}
        >
          مبلغ نهایی به ریال : {persianNumber(totalPrice * 1)}
        </Typography>
      </Box>
    </Box>
  );
}
