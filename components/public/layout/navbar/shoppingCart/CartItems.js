import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { Badge } from "@mui/material";

import { useSelector } from "react-redux";

export default function CartItems() {
  const cartItems = useSelector((state) => state.product.shoppingCart);
  return (
    <Box
      sx={{
        width: { xs: "400px", md: "500px" },
        overflow: "hidden",
      }}
    >
      {cartItems.map((product, i) => {
        return (
          <div key={i}>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                position: "relative",
                borderRadius: 0,
                borderBottom: "1px solid #ccc",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 140 }}
                image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.images_url[0]}`}
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {product.product_name}

                    <Badge
                      sx={{ color: "#fff", padding: "10px" }}
                      badgeContent={`x${product.cart_quantity / product.stack}`}
                      color="info"
                    ></Badge>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                  >
                    تعداد کل : {product.cart_quantity}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="secondary"
                    component="div"
                    sx={{
                      position: "absolute",
                      left: 10,
                      bottom: 25,
                    }}
                  >
                    مبلغ هر عدد : {product.price}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="secondary"
                    component="div"
                    sx={{
                      position: "absolute",
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    مبلغ کل : {product.price * product.cart_quantity}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </div>
        );
      })}

      <Box>
        <Typography
          variant="h5"
          sx={{
            direction: "ltr",
            textAlign: "center",
            mt: 2,
          }}
        >
          {/* 120000 : مبلغ نهایی */}
        </Typography>
      </Box>
    </Box>
  );
}
