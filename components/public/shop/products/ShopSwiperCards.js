import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Badge, Tooltip } from "@mui/material";
import { truncate } from "../../../../src/tranculate";
import { persianNumber } from "../../../../src/PersianDigits";
import Image from "next/image";
import Link from "../../../../src/Link";
import theme from "../../../../src/theme";
import { useState } from "react";
import Quantity from "../productPage/Quantity";
import AddToCart from "../productPage/AddToCart";
import { useSelector } from "react-redux";
function ShopSwiperCards({ item, variants }) {
  const [activeQuantity, setActiveQuantity] = useState(false);
  const allVariants = useSelector((state) => state.product.allVariants);
  const handleActiveQuantity = () => {
    setActiveQuantity(true);
  };

  const thisProductFirstVariant = allVariants.filter((variant) => {
    item.product_id == variant.variant_product_id;
  });
  return (
    <Card sx={{ width: 300, position: "relative", mx: "auto" }}>
      {console.log("only this product", thisProductFirstVariant)}

      <Link href={`/products/${item.product_id}`}>
        {" "}
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${item.images_url[0]}`}
          width={0}
          height={0}
          loading="eager"
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt={item.product_name}
        />
      </Link>
      {thisProductFirstVariant[0].variant_discount > 0 ? (
        <Box
          component={"span"}
          sx={{
            position: "absolute",
            top: "-62px",
            right: "-62px",
            backgroundColor: theme.palette.primary.success,
            color: "#fff",
            transform: "rotate(-45deg)",
            borderRadius: "5px",
            // boxShadow: "inset 0px 2px 10px 1px rgba(0,0,0,0.50)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            textAlign: "center",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            pl: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              transform: "rotate(45deg)",
              mr: 1,
            }}
            textAlign={"center"}
          >
            {persianNumber(thisProductFirstVariant[0].discount)}% -
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <CardContent>
        <Link
          style={{
            textDecoration: "none",
          }}
          href={`/products/${item.product_id}`}
        >
          <Tooltip
            placement="top"
            title={
              item.product_name + " " + thisProductFirstVariant[0].variant_name
            }
          >
            <Typography
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                minHeight: 55,
                textAlign: "center !important",
                fontSize: "18px",
              }}
              variant="h6"
              fontWeight={"bold"}
            >
              {item.product_name +
                " " +
                thisProductFirstVariant[0].variant_name}
            </Typography>
          </Tooltip>
        </Link>

        <Typography
          sx={{
            mt: 1,
          }}
          variant="body2"
          color="text.secondary"
        >
          کد محصول: {item.product_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          تعداد در هر بسته : {thisProductFirstVariant[0].variant_stack}
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            my: 1,
            height: 30,
          }}
          variant="body1"
          color="lightPrimary.main"
        >
          {thisProductFirstVariant[0].variant_discount > 0 ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  textDecorationColor: "red",
                  color: "#444",
                }}
              >
                {persianNumber(
                  Math.round(thisProductFirstVariant[0].variant_price)
                )}{" "}
                ریال
              </span>
              <br />
            </>
          ) : (
            ""
          )}
          {persianNumber(
            Math.round(
              thisProductFirstVariant[0].variant_price *
                (1 - thisProductFirstVariant[0].variant_discount * 0.01)
            )
          )}{" "}
          ریال
        </Typography>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          padding: 2,

          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {activeQuantity ? (
          <>
            <Quantity
              productId={item.product_id}
              stack={thisProductFirstVariant[0].variant_stack}
              quantity={thisProductFirstVariant[0].variant_quantity}
              discount={thisProductFirstVariant[0].variant_discount}
              price={thisProductFirstVariant[0].variant_price}
              showDetails={false}
              product_uuid={thisProductFirstVariant[0].variant_uuid}
            />
          </>
        ) : (
          <Button
            disabled={thisProductFirstVariant[0].variant_quantity < 1}
            fullWidth
            sx={{
              color: "#fff",
            }}
            onClick={handleActiveQuantity}
            variant="contained"
            color="primary"
            size="medium"
          >
            {thisProductFirstVariant[0].variant_quantity > 0
              ? "خرید"
              : "ناموجود"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ShopSwiperCards;
