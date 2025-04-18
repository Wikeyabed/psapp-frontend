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
import Link from "../../../../src/Link";
import { LoadingButton } from "@mui/lab";
import AddressSelect from "./AddressSelect";

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
    finalize: false,
    setNewAddress: false,
    newAddress: "",
    paymentUrl: "https://www.eebox.ir",
  });

  function handleChangeDate(value) {
    setDate(value.unix);

    console.log(date);
  }

  const handleChangeSend = (event) => {
    setSend(event.target.value);
    // if(event.tar)
  };

  const handleChangeNewAddress = (event) => {
    setData({ ...data, setNewAddress: event.target.value });
    console.log(data);
  };

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (cart.length === 0 || payment.totalPrice == "0") router.push("/");
  }, [data]);

  const passExactAddress = (newAddress) => {
    setData({ ...data, newAddress: newAddress });
    console.log("full address", newAddress);
  };

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

          console.log("payment data :", data);
          data.then((data) => {
            setData({
              ...data,
              loading: true,
            });
            setTimeout(() => {
              setData({
                ...data,
                loading: false,
                finalize: true,
                paymentUrl: `https://gateway.zibal.ir/start/${data[0].track_id}`,
              });
            }, 3000); // console.log(" data !!!!!!!!!!!!", data[0].track_id);
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
                انتخاب نحوه ارسال :
              </FormLabel>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={send}
                onChange={handleChangeSend}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyItems: "center",
                    mb: 1,
                  }}
                >
                  <Image
                    style={{
                      backgroundColor: "#FDC60C",
                      borderRadius: "50px",
                    }}
                    src={"/images/in-person.png"}
                    width={50}
                    height={50}
                  />{" "}
                  <FormControlLabel
                    value={"in-person"}
                    control={<Radio disabled={data.finalize} />}
                    label="تحویل حضوری از انبار ایباکس"
                  />
                </Box>{" "}
                {send == "in-person" ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      borderBottom: "1px solid #444",
                      mb: 4,
                      mr: 10,
                    }}
                  >
                    توجه : تحویل مرسوله حضوری همه روزه بین ساعات 11 صبح تا 18
                    عصر انجام می پذیرد
                  </Typography>
                ) : (
                  ""
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyItems: "center",
                    mb: 1,
                  }}
                >
                  <Image
                    style={{
                      backgroundColor: "#FDC60C",
                      borderRadius: "50px",
                    }}
                    src={"/images/snap.png"}
                    width={50}
                    height={50}
                  />{" "}
                  <FormControlLabel
                    value={"snap"}
                    control={<Radio disabled={data.finalize} />}
                    label="ارسال با اسنپ و تپسی (مخصوص تهران)"
                  />
                </Box>
                {send == "snap" ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      borderBottom: "1px solid #444",
                      mb: 4,
                      mr: 10,
                    }}
                  >
                    توجه :هزینه ارسال بر عهده مشتری میباشد. ارسال بار بین ساعات
                    9 صبح تا 18 عصر انجام می پذیرد.
                  </Typography>
                ) : (
                  ""
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyItems: "center",
                    mb: 1,
                  }}
                >
                  <Image
                    style={{
                      backgroundColor: "#FDC60C",
                      borderRadius: "51px",
                      padding: 10,
                    }}
                    src={"/images/shipping.png"}
                    width={50}
                    height={50}
                  />{" "}
                  <FormControlLabel
                    value={"shipping"}
                    control={<Radio disabled={data.finalize} />}
                    label="ارسال از طریق باربری(مخصوص شهرستان)"
                  />
                </Box>
                {send == "shipping" ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      borderBottom: "1px solid #444",
                      mb: 4,
                      mr: 10,
                    }}
                  >
                    توجه : هزینه ارسال تا باربری پس کرایه شده و توسط مشتری
                    پرداخت میگردد.
                  </Typography>
                ) : (
                  ""
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyItems: "center",
                    mb: 1,
                  }}
                >
                  <Image
                    style={{
                      backgroundColor: "#FDC60C",
                      borderRadius: "50px",
                    }}
                    src={"/images/post.png"}
                    width={50}
                    height={50}
                  />{" "}
                  <FormControlLabel
                    value={"posting"}
                    control={<Radio disabled={data.finalize} />}
                    label="ارسال از طریق پست ایران"
                  />
                </Box>
                {send == "posting" ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      borderBottom: "1px solid #444",

                      mb: 4,
                      mr: 10,
                    }}
                  >
                    توجه : هزینه پست بر عهده مشتری می باشد
                  </Typography>
                ) : (
                  ""
                )}
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
                  انتخاب تاریخ ارسال
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
            </Grid>
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
                  انتخاب تاریخ ارسال
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
                  انتخاب تاریخ ارسال
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

              <Grid xs={12} md={6} item></Grid>
            </Grid>
          ) : (
            ""
          )}

          <Grid spacing={2} container>
            <Grid xs={12} item>
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
                        mb: 4,
                      }}
                      value={false}
                      control={<Radio />}
                      label="آدرس فعلی"
                    />
                    <FormControlLabel
                      sx={{
                        m: 0,
                        mb: 4,
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
                  صالح آباد غربی،شهرک رسالت،خیابان طالقانی،خیابان ۲۰ متری جوادی،
                  بعد از فروشگاه افق کوروش پلاک ۶۲
                </Typography>
              )}

              {send != "in-person" ? (
                <AddressSelect
                  newAddress={data.setNewAddress == "true"}
                  tehran={send == "snap"}
                  passTheAddress={passExactAddress}
                />
              ) : (
                ""
              )}
            </Grid>

            <Typography
              variant="subtitle2"
              sx={{
                color: "darkred",
                mt: 2,
              }}
            >
              {send == "in-person" ? "" : userData.address}
            </Typography>

            <Grid xs={12} item>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "blue",
                  my: 4,
                  mb: 6,
                  mr: 2,
                }}
              >
                <br />
                {send == "posting"
                  ? "در صورت امکان کد پستی خود را در بخش توضیحات وارد نمایید"
                  : ""}
              </Typography>
              <RtlTextField
                name="description"
                focused={true}
                value={data.description}
                disabled={data.finalize}
                required
                multiline
                minRows={7}
                maxRows={7}
                fullWidth
                onChange={handleData}
                label="توضیحات سفارش"
                InputLabelProps={{
                  sx: {
                    mt: -6,
                    fontSize: 19,
                  },
                }}
                type="text"
                variant="filled"
              />
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
            {!data.finalize ? (
              <Button
                onClick={handleNewPayment}
                loading={data.loading}
                color="info"
                disabled={data.loading}
                variant="contained"
                sx={{
                  mx: "auto",
                  my: 4,
                  px: 4,
                }}
              >
                {data.loading ? "لطفا منتظر بمانید..." : "تایید نهایی فاکتور"}
              </Button>
            ) : (
              <Button
                component={"a"}
                href={data.paymentUrl}
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
            )}
          </Grid>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default CheckoutToPayment;
