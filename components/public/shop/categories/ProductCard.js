import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Tooltip } from "@mui/material";
import { truncate } from "../../../../src/tranculate";
import { persianNumber } from "../../../../src/PersianDigits";
import Image from "next/image";
function ShopSwiperCards({ productName, productCode, price, stack, imageUrl }) {
  return (
    <Card>
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${imageUrl}`}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt={productName}
      />
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
