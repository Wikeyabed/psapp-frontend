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
function ShopSwiperCards({ item }) {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        sx={{ height: 200, width: "100%" }}
        image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${item.images_url[0]}`}
        title="green iguana"
      />
      <CardContent>
        <Tooltip placement="top" title={item.product_name}>
          <Typography
            sx={{
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
          توضیحات بیشتر
        </Button>
      </CardActions>
    </Card>
  );
}

export default ShopSwiperCards;
