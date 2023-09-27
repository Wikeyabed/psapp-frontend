import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Tooltip, Box } from "@mui/material";
import { truncate } from "../../../../src/tranculate";
import { persianNumber } from "../../../../src/PersianDigits";
import Image from "next/image";
import theme from "../../../../src/theme";
import Link from "../../../../src/Link";
function ShopSwiperCards({
  productName,
  productCode,
  price,
  stack,
  imageUrl,
  discount,
}) {
  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      <Link href={`/products/${productCode}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl}`}
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
        <Tooltip placement="top" title={productName}>
          <Typography
            sx={{
              cursor: "pointer",
            }}
            gutterBottom
            variant="body1"
            fontWeight={"bold"}
          >
            {truncate(productName, 28)}
          </Typography>
        </Tooltip>

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
          }}
          variant="h6"
          color="primary.blue"
        >
          {persianNumber(price)} ریال
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
        <Button variant="outlined" size="small">
          خرید
        </Button>
        <Button color="info" variant="contained" size="small">
          اضافه کردن
        </Button>
      </CardActions>
    </Card>
  );
}

export default ShopSwiperCards;
