import { useState, useEffect } from "react";
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
import AlertBar from "./AlertBar";
import CircularProgress from "@mui/material/CircularProgress";
import Quantity from "./Quantity";
import PersianNumber from "../../../../src/PersianDigits";
export default function ProductCard() {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const handleAlertOpen = () => {
    setAlert(true);
    handleLoading();
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
    return () => {};
  }, [alert]);

  return (
    <Card elevation={2} sx={{ position: "relative", borderRadius: "10px" }}>
      <AlertBar openAlert={alert} />
      <CardMedia
        sx={{
          height: 250,
          backgroundSize: "fill",
          borderBottom: "1px solid #e2e2e2",
        }}
        image={Tape.src}
        title="ایباکس"
      />
      <CardContent>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "20px",
          }}
          gutterBottom
          variant="h6"
          component="div"
        >
          کارتن پستی کد ۱
        </Typography>

        <Typography
          variant="caption"
          color="ButtonText"
          textAlign={"right"}
          component="div"
        >
          موجود در انبار
        </Typography>

        <Typography
          variant="caption"
          color="ButtonText"
          textAlign={"right"}
          component="div"
        >
          کد محصول : k112
        </Typography>

        <Typography
          variant="caption"
          color="ButtonText"
          textAlign={"right"}
          component="div"
        >
          تعداد در هر بسته : 400
        </Typography>

        {/* <Quantity /> */}

        <Typography
          sx={{
            textAlign: "center",
            marginTop: "20px",
            color: "red",
          }}
          variant="h6"
        >
          {" "}
          {/* Price */}
          <Typography
            textAlign={"center"}
            sx={{
              color: "#ed6c02",
            }}
            variant="h6"
          >
            <PersianNumber number={1250000} />
            &nbsp;ریال
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="اضافه کردن به سبد خرید" placement="bottom">
          <Button
            disabled={loading}
            onClick={handleAlertOpen}
            sx={{
              paddingLeft: 5,
              marginRight: "auto",
              borderRadius: "10px",
              backgroundColor: "#274060",

              border: `2px solid ${loading ? "#e2e2e2" : "#1B2845"} `,
              borderBottom: `4px solid ${loading ? "#999" : "#1B2845"}`,
            }}
            size="large"
            color="secondary"
            fullWidth="true"
            variant="contained"
            startIcon={loading ? "" : <AddShoppingCartIcon sx={{ ml: 2 }} />}
          >
            {loading ? (
              <CircularProgress
                size={26.3}
                sx={{
                  color: "#999",
                }}
              />
            ) : (
              "خرید"
            )}
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
