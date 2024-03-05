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
import moment from "moment-jalaali";

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
  const [date, setDate] = useState(moment().unix());
  const [send, setSend] = useState("in-person");
  const [data, setData] = useState({
    description: "",
    loading: false,
    setNewAddress: false,
    newAddress: "",
  });

  function handleChangeDate(value) {
    setDate(value.unix);

    console.log(date);
  }

  const handleChangeSend = (event) => {
    setSend(event.target.value);
  };

  const handleChangeNewAddress = (event) => {
    setData({ ...data, setNewAddress: event.target.value });
    console.log(data);
  };

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (cart.length === 0 || payment.totalPrice == "0") router.push("/shop");
  }, []);

  const handleNewPayment = async () => {
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
      address:
        data.setNewAddress == "true" ? data.newAddress : userData.address,
      customer_phone: userData.phoneNumber,
      delivery_type: send,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/new`,
      requestOptions
    )
      .then((response) => {
        if (response.status == 201) {
          const data = response.json();

          data.then((data) => {
            // console.log(" data !!!!!!!!!!!!", data[0].track_id);
            setData({ ...data, loading: true });

            router.push(`https://gateway.zibal.ir/start/${data[0].track_id}`);
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
                  color: "#444",
                }}
                id="controlled-radio-buttons-group"
              >
                انتخاب نحوه دریافت :
              </FormLabel>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={send}
                onChange={handleChangeSend}
              >
                <FormControlLabel
                  value={"in-person"}
                  control={<Radio />}
                  label="تحویل حضوری مرسوله از انبار ما"
                />
                <FormControlLabel
                  value={"snap"}
                  control={<Radio />}
                  label="ارسال با اسنپ (مخصوص تهران)"
                />

                <FormControlLabel
                  value={"shipping"}
                  control={<Radio />}
                  label="ارسال از طریق باربری(مخصوص شهرستان)"
                />

                <FormControlLabel
                  value={"posting"}
                  control={<Radio />}
                  label="ارسال از طریق پست یا تیپاکس"
                />
              </RadioGroup>
            </FormControl>

            <Divider
              sx={{
                my: 4,
                borderWidth: "3px",
              }}
            />
          </Grid>

          {send == "snap" ? (
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
                  defaultValue={Date.now()}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-left"
                  onChange={handleChangeDate}
                />
              </Grid>

              <Grid xs={12} md={6} item>
                {" "}
                <Typography
                  component={"div"}
                  variant="body1"
                  color={"primary"}
                  sx={{
                    my: 4,
                  }}
                >
                  توجه :هزینه ارسال بر عهده مشتری میباشد. تحویل بار غیر حضوری
                  بین ساعات 9 صبح تا 18 عصر انجام می پذیرد.
                </Typography>
              </Grid>
            </Grid>
          ) : send == "in-person" ? (
            <Typography
              component={"div"}
              variant="body1"
              color={"primary"}
              sx={{
                my: 4,
              }}
            >
              توجه : تحویل مرسوله حضوری همه روزه بین ساعات 11 صبح تا 18 عصر
              انجام می پذیرد
            </Typography>
          ) : send == "shipping" ? (
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
                  defaultValue={Date.now()}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-left"
                  onChange={handleChangeDate}
                />

                <Typography
                  component={"div"}
                  variant="body1"
                  color={"primary"}
                  sx={{
                    my: 4,
                  }}
                >
                  توجه : هزینه ارسال تا باربری پس کرایه شده و توسط مشتری پرداخت
                  میگردد.
                </Typography>
              </Grid>

              <Grid xs={12} md={6} item></Grid>
            </Grid>
          ) : send == "posting" ? (
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
                  defaultValue={Date.now()}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-left"
                  onChange={handleChangeDate}
                />

                <Typography
                  component={"div"}
                  variant="body1"
                  color={"primary"}
                  sx={{
                    my: 4,
                  }}
                >
                  .توجه : هزینه پست با مشتری می باشد
                </Typography>
              </Grid>

              <Grid xs={12} md={6} item></Grid>
            </Grid>
          ) : (
            ""
          )}

          <Grid spacing={2} container>
            <Grid xs={12} md={6} item>
              <RtlTextField
                name="description"
                value={data.description}
                required
                multiline
                minRows={7}
                maxRows={7}
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
              </Typography>
              {send != "in-person" ? (
                <FormControl
                  sx={{
                    mt: 1,
                  }}
                >
                  <RadioGroup
                    aria-labelledby="controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={data.setNewAddress}
                    onChange={handleChangeNewAddress}
                    row
                  >
                    <FormControlLabel
                      sx={{
                        m: 0,
                      }}
                      value={false}
                      control={<Radio />}
                      label="آدرس فعلی"
                    />
                    <FormControlLabel
                      sx={{
                        m: 0,
                      }}
                      value={true}
                      control={<Radio />}
                      label="آدرس جدید"
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "darkred",
                    mt: 2,
                  }}
                >
                  یافت آباد جنوبی , خیابان میرهاشمی ,کوچه خرقانیان , بن بست
                  آلاله یک , پلاک 1
                </Typography>
              )}

              {data.setNewAddress == "true" ? (
                <RtlTextField
                  sx={{
                    my: 2,
                  }}
                  name="newAddress"
                  multiline
                  minRows={3}
                  maxRows={3}
                  value={data.newAddress}
                  onChange={handleData}
                  label="آدرس جدید را وارد کنید"
                  type="text"
                />
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "darkred",
                    mt: 2,
                  }}
                >
                  {userData.address}
                  {send == "true" ? userData.address : ""}
                </Typography>
              )}
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
              color="secondary"
              variant="contained"
              sx={{
                mx: "auto",
                my: 4,
                px: 4,
              }}
            >
              پرداخت با درگاه امن &nbsp;
              <Image
                alt="zibal"
                width={"100"}
                height={"50"}
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/zibal.svg`}
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default CheckoutToPayment;
