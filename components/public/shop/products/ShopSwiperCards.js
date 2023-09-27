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
function ShopSwiperCards({ item }) {
  return (
    <Card sx={{ width: 300, position: "relative" }}>
      <Link href={`/shop/${item.product_id}`}>
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
      {item.discount > 0 ? (
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
            {persianNumber(item.discount)}% -
          </Typography>
        </Box>
      ) : (
        ""
      )}

      <CardContent>
        <Tooltip placement="top" title={item.product_name}>
          <Typography
            href={`/shop/${item.product_id}`}
            component={Link}
            sx={{
              textDecoration: "none",
              cursor: "pointer",
            }}
            gutterBottom
            variant="body1"
            fontWeight={"bold"}
          >
            {truncate(item.product_name, 28)}
          </Typography>
        </Tooltip>

        <Typography variant="body2" color="text.secondary">
          کد محصول: {item.product_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          تعداد در هر بسته : {item.stack}
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            my: 1,
          }}
          variant="h6"
          color="primary.blue"
        >
          {persianNumber(item.price)} ریال
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
