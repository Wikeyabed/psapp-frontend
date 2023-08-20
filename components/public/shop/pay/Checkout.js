import {
  Button,
  Grid,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  TextField,
  Box,
} from "@mui/material";
import PublicLayout from "../../layout";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { persianNumber } from "../../../../src/PersianDigits";
import { getCookie } from "cookies-next";
import shortUUID from "short-uuid";

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginBottom: 5,
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    overflow: "unset",
  },
}));

function CheckoutToPayment() {
  const userData = useSelector((state) => state.auth.userInformation);
  const payment = useSelector((state) => state.order);
  const cart = useSelector((state) => state.product.shoppingCart);

  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [send, setSend] = useState(false);
  const [data, setData] = useState({
    description: "",
    loading: false,
  });

  function handleChangeDate(value) {
    setDate(value);
  }

  const handleChangeSend = (event) => {
    setSend(event.target.value);
    console.log(typeof send);
  };

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (cart.length === 0 || payment.totalPrice == "0") router.push("/shop");
  }, []);

  const handleNewPayment = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      description: data.description,
      products: payment.products,
      finished_price: payment.totalPrice,
      order_id: shortUUID.generate(),
      customer_name: userData.firstName + " " + userData.lastName,
      delivery_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/new`, requestOptions)
      .then((response) => {
        if (response.status == 201) {
          const data = response.json();
          data.then((data) => {
            setData({ ...data, loading: true });
            console.log(data);
            router.push(data[0].transaction_url);
          });
        }
      })

      .catch((error) => console.log("error", error.message));
  };

  return (
    <PublicLayout>
      <Grid container justifyContent={"center"}>
        <Grid
          component={Paper}
          sx={{
            p: 4,
            minHeight: 600,
            display: "inline-block",
          }}
          item
          xs={12}
          md={8}
          lg={6}
          container
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textAlign: "center",
              }}
            >
              تکمیل فرم سفارش
            </Typography>
          </Grid>

          <Grid xs={12}>
            <FormControl>
              <FormLabel
                sx={{
                  mb: 1,
                }}
                id="controlled-radio-buttons-group"
              >
                انتخاب نحوه دریافت
              </FormLabel>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={send}
                onChange={handleChangeSend}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="حضوری"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="ارسال با پیک"
                />
              </RadioGroup>
            </FormControl>

            <Divider
              sx={{
                my: 4,
              }}
            />
          </Grid>
          {send == "true" ? (
            <Grid container>
              <Grid
                xs={12}
                md={6}
                sx={{
                  direction: "rtl !important",
                }}
                item
              >
                <Typography
                  sx={{
                    mb: 4,
                  }}
                >
                  انتخاب تاریخ دریافت
                </Typography>
                <DatePicker
                  style={{
                    textAlign: "center !important",
                    padding: "20px 10px",
                    minWidth: 250,
                  }}
                  minDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
                  maxDate={new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)}
                  value={date}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-left"
                  onChange={handleChangeDate}
                />

                <Typography
                  component={"div"}
                  variant="caption"
                  color={"Highlight"}
                  sx={{
                    my: 4,
                  }}
                >
                  توجه : تحویل بار غیر حضوری بین ساعات 9 صبح تا 18 عصر انجام می
                  پذیرد
                </Typography>
              </Grid>

              <Grid xs={12} md={6} item></Grid>
            </Grid>
          ) : (
            <Typography
              component={"div"}
              variant="caption"
              color={"Highlight"}
              sx={{
                my: 4,
              }}
            >
              توجه : تحویل بار حضوری همه روزه بین ساعات 11 صبح تا 18 عصر انجام
              می پذیرد
            </Typography>
          )}

          <Grid spacing={2} container>
            <Grid xs={12} md={6} item>
              <RtlTextField
                name="description"
                value={data.description}
                required
                multiline
                minRows={4}
                maxRows={6}
                fullWidth
                onChange={handleData}
                label="توضیحات سفارش"
                type="text"
              />
            </Grid>

            <Grid xs={12} md={6} item>
              <Typography
                sx={{
                  width: "100%",
                }}
                component={"div"}
                color={"ButtonText"}
                variant="subtitle1"
              >
                آدرس دریافت مرسوله :{" "}
                <Typography
                  sx={{
                    color: "darkred",
                    mt: 2,
                  }}
                  variant="subtitle2"
                >
                  {" "}
                  {send == "true"
                    ? userData.address
                    : "یافت آباد جنوبی , خیابان میرهاشمی ,کوچه خرقانیان , بن بست آلاله یک , پلاک 1"}
                </Typography>
              </Typography>
            </Grid>

            <Grid display={"flex"} xs={12} item>
              <Typography
                component={"div"}
                textAlign={"center"}
                variant="h6"
                color={"GrayText"}
              >
                مبلغ نهایی فاکتور :
                <Box
                  sx={{
                    color: "darkred",
                  }}
                  component={"span"}
                >
                  {" "}
                  {persianNumber(payment.totalPrice)} ریال
                </Box>
              </Typography>
            </Grid>

            <Button
              disabled={data.loading}
              onClick={handleNewPayment}
              color="info"
              variant="contained"
              sx={{
                mx: "auto",
                my: 4,
              }}
            >
              پرداخت با درگاه امن &nbsp;
              <Image
                alt="idpay"
                width={"100"}
                height={"50"}
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/idpay.svg`}
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default CheckoutToPayment;
