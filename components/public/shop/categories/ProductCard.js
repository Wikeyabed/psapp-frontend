import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Tooltip, Box } from "@mui/material";
import { truncate } from "../../../../src/tranculate";
import { persianNumber } from "../../../../src/PersianDigits";
import Image from "next/image";
import theme from "../../../../src/theme";
import Link from "../../../../src/Link";
import { useState } from "react";
import Quantity from "../productPage/Quantity";
function ShopSwiperCards({
  productName,
  productCode,
  variant_uuid,
  variant_name,
  price,
  stack,
  imageUrl,
  discount,
  quantity,
  stock,
  product_uuid,
  category,
}) {
  const [activeQuantity, setActiveQuantity] = useState(false);

  const handleActiveQuantity = () => {
    setActiveQuantity(true);
  };

  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      <Link href={`/products/${productCode}?product=${productName}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl[0]}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt={productName}
        />
      </Link>

      {discount > 0 ? (
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
            {persianNumber(discount)}% -
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
          href={`/products/${productCode}?category=${productName}`}
        >
          <Tooltip placement="top" title={productName}>
            <Typography
              sx={{
                cursor: "pointer",
                minHeight: 115,
                textAlign: "center",
                fontSize: "18px",
              }}
              gutterBottom
              variant="h6"
              fontWeight={"bold"}
            >
              {productName + "-" + variant_name}
            </Typography>
          </Tooltip>
        </Link>
        <Typography variant="body2" color="text.secondary">
          کد محصول: {productCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          تعداد در هر بسته : {stack}
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
          {discount > 0 ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  textDecorationColor: "red",
                  color: "#444",
                }}
              >
                {persianNumber(Math.round(price))} ریال
              </span>
              <br />
            </>
          ) : (
            ""
          )}
          {persianNumber(Math.round(price * (1 - discount * 0.01)))} ریال
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
              productId={productCode}
              variant_uuid={variant_uuid}
              product_name={productName}
              variant_name={variant_name}
              images_url={imageUrl}
              stack={stack}
              quantity={quantity}
              discount={discount}
              price={price}
              showDetails={false}
              product_uuid={product_uuid}
            />
          </>
        ) : (
          <Button
            disabled={stock < 0 || stock == 0}
            fullWidth
            onClick={handleActiveQuantity}
            variant="contained"
            color="primary"
            size="medium"
          >
            {stock * 1 > 0 ? "خرید" : "ناموجود"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ShopSwiperCards;
