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
} from "@mui/material";
import PublicLayout from "../../layout";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styled from "@emotion/styled";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

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

function CheckoutToPayment({ totalPrice, linkToPayment }) {
  const userData = useSelector((state) => state.auth.userInformation);
  const [date, setDate] = useState(new Date());
  const [send, setSend] = useState(true);
  const [data, setData] = useState({
    description: "",
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
            <Grid display={"flex"} xs={12} md={6} item>
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

            <Grid display={"flex"} xs={12} md={6} item>
              <RtlTextField
                disabled
                name="address"
                value={userData.address}
                required
                multiline
                minRows={4}
                maxRows={6}
                fullWidth
                onChange={handleData}
                label="آدرس شما"
                type="text"
              />
            </Grid>

            <Grid display={"flex"} xs={12} item>
              <Typography textAlign={"center"} variant="h6" color={"GrayText"}>
                مبلغ نهایی فاکتور : {totalPrice}
              </Typography>
            </Grid>

            <Button
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
