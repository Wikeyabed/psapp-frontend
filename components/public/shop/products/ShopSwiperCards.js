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
import { useEffect, useState } from "react";
import Quantity from "../productPage/Quantity";
import { useSelector } from "react-redux";
function ShopSwiperCards({ item, variants }) {
  const [activeQuantity, setActiveQuantity] = useState(false);
  const products = useSelector((state) => state.product.products);
  const handleActiveQuantity = () => {
    setActiveQuantity(true);
  };

  // const productVariants = allVariants.filter((variant) => {
  //   if (variant != undefined) {
  //     return item.info.product_id == variant.variant_product_id;
  //   }
  // });

  useEffect(() => {
    console.log("!!!!HELOOOO", item);
  }, []);

  return (
    <Card
      sx={{
        width: 300,
        position: "relative",
        mx: "auto",
        // border: "1px solid ",
        boxShadow: "0 0 5px 0.5px #593F62",
        borderBottom: "2px solid #593F62",
        borderRadius: 5,
      }}
    >
      <Link
        href={`/products/${item.info.product_id}?variant=${item.variants[0].variant_uuid}&category=${item.info.category}`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${item.info.images_url[0]}`}
          width={0}
          height={0}
          loading="eager"
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt={item.info.product_name}
        />
      </Link>

      {item.variants[0].variant_discount != "0" ? (
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
            {persianNumber(item.variants[0].variant_discount)}% -
          </Typography>
        </Box>
      ) : (
        ""
      )}

      <CardContent
        sx={{
          borderTop: "2px dotted #ccc",
          background: "linear-gradient(to top, #f1f1f1,#fff)",
          paddingBottom: 5,
        }}
      >
        <Link
          style={{
            textDecoration: "none",
          }}
          href={`/products/${item.info.product_id}?variant=${item.variants[0].variant_uuid}&category=${item.info.category}`}
        >
          <Tooltip
            placement="top"
            title={item.info.product_name + " " + item.variants[0].variant_name}
          >
            <Typography
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                minHeight: 85,
                textAlign: "center !important",
                fontSize: "18px",
                color: "#000",
              }}
              variant="h6"
              fontWeight={"bold"}
            >
              {item.info.product_name + " " + item.variants[0].variant_name}
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
          کد محصول: {item.info.product_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          تعداد در هر بسته : {item.variants[0].variant_stack}
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            mt: 1,
            height: 30,
          }}
          variant="h6"
          color="lightPrimary.main"
        >
          {item.variants[0].variant_discount > 0 ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  textDecorationColor: "red",
                  color: "#444",
                }}
              >
                {persianNumber(Math.round(item.variants[0].variant_price))} ریال
              </span>
              <br />
            </>
          ) : (
            ""
          )}
          {persianNumber(
            Math.round(
              item.variants[0].variant_price *
                (1 - item.variants[0].variant_discount * 0.01)
            )
          )}{" "}
          ریال
        </Typography>
      </CardContent>
      {/* <Divider
        sx={{
          backgroundColor: "#ccc",
        }}
      /> */}
      <CardActions
        sx={{
          padding: 2,
          background: "linear-gradient(to bottom, #fff, #fff,#ccc)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {activeQuantity ? (
          <>
            <Quantity
              productId={item.info.product_id}
              product_name={item.info.product_name}
              variant_name={item.variants[0].variant_name}
              stack={item.variants[0].variant_stack}
              images_url={item.info.images_url}
              quantity={item.variants[0].variant_quantity}
              discount={item.variants[0].variant_discount}
              price={item.variants[0].variant_price}
              showDetails={false}
              product_uuid={item.variants[0].variant_uuid}
            />
          </>
        ) : (
          <Button
            disabled={item.variants[0].variant_quantity < 1}
            fullWidth
            sx={{
              color: "#fff",
              padding: "13px",
              borderRadius: "25px",
            }}
            onClick={handleActiveQuantity}
            variant="contained"
            color="primary"
            size="medium"
          >
            {item.variants[0].variant_quantity > 0 ? "خرید" : "ناموجود"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ShopSwiperCards;
