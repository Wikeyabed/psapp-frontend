import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  useMediaQuery,
  Container,
} from "@mui/material";
import Image from "next/image";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useDispatch, useSelector } from "react-redux";
import Link from "../../../src/Link";
import {
  receiveSms,
  requestSmsAgain,
  verifySms,
  setTempNumber,
} from "../../../redux/reducers/authSlice";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import Captcha from "./Captcha";
import SimpleBottomNavigation from "../layout/navbar/BottomNav";

const Item = styled(Grid)(({ theme }) => ({
  textAlign: "center",

  padding: 20,
  borderRadius: "10px",
}));

const Card = styled(Grid)(({ theme }) => ({
  margin: "auto",
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginTop: 5,
  marginBottom: 5,
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",
  // display: "block",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    overflow: "unset",
  },
}));

function PhoneVerification() {
  const dispatch = useDispatch();
  const tempCaptcha = useSelector((state) => state.auth.tempCaptchaText);
  const isSmsReceived = useSelector((state) => state.auth.isSmsReceived);
  const [otp, setOtp] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [number, setNumber] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [initiated, setInitiated] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds != 0 && isSmsReceived) {
        setSeconds(seconds - 1);
      } else if (minutes == 0 && seconds == 0) {
        dispatch(requestSmsAgain());
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds, isSmsReceived]);

  const handleCaptcha = (event) => {
    setCaptcha(event.target.value);
  };
  const handleSendSms = async () => {
    if (captcha.toLowerCase() == tempCaptcha) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("phone_number", number);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
        credentials: "include",
      };

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sms_send`,
        requestOptions
      )
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            const sms = response.json();

            sms.then((data) => {
              setInitiated(true);
              console.log(data);
              dispatch(receiveSms());
              dispatch(setTempNumber(data.phone_number));
              dispatch(
                setNotificationOn({
                  message: "کد ورود به ایباکس به شماره وارد شده ارسال شد",
                  color: "info",
                })
              );
            });
          } else {
            dispatch(requestSmsAgain());
            setInitiated(false);
            dispatch(
              setNotificationOn({
                message: "شماره شما قبلا در سیستم وارد شده است",
                color: "warning",
              })
            );
          }
        })

        .catch((error) => console.log("error", error));
    } else {
      dispatch(
        setNotificationOn({
          message: "متن امنیتی وارد شده اشتباه است",
          color: "error",
        })
      );
    }
  };

  const handleVerifyCode = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("otp", otp);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sms_verify`, requestOptions)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          dispatch(verifySms());

          dispatch(
            setNotificationOn({
              message: "کد ورودی صحیح می باشد",
              color: "success",
            })
          );
          // return response.json();
        } else {
          dispatch(
            setNotificationOn({
              message: "کد ورودی صحیح نمی باشد",
              color: "error",
            })
          );
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleSetPhoneNumber = (event) => {
    setNumber(parseInt(event.target.value));

    let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    let result = regex.test(event.target.value);

    console.log(number);
    if (result) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const setTimer = () => {
    setMinutes(1);
    setSeconds(0);
  };

  const handleCountDown = () => {
    dispatch(receiveSms());
    setTimer();
    handleSendSms();
  };

  const handleEditNumber = () => {
    dispatch(requestSmsAgain());
    setInitiated(false);
  };
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const min = minutes < 10 ? `0${minutes}` : minutes;
  const sec = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container component={FormControl} container spacing={2}>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <SimpleBottomNavigation />
        </Box>
        <Card
          container
          xs={12}
          md={8}
          lg={6}
          sx={{
            mx: "auto",
            padding: 1,
            border: "1px solid #ccc",
            boxShadow: "0px 0px 10px 0px #ccc",
            borderRadius: 5,
            padding: 2,
            mt: 5,
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/logo3.png`}
              width={50}
              height={0}
              sizes="100vh"
              alt="ایباکس"
              style={{
                width: "100px",
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Box>
          <Grid component={Item} elevation={4} container>
            {initiated ? (
              <>
                <Grid sx={{ mb: 6 }} item xs={12}>
                  <Typography sx={{ mb: 5 }} variant="h6">
                    کد دریافتی را وارد کنید
                  </Typography>
                  <MuiOtpInput
                    sx={{
                      direction: "ltr !important",
                      textAlign: "left !important",
                    }}
                    length={5}
                    datatype="number"
                    value={otp}
                    onChange={handleChange}
                    TextFieldsProps={{
                      type: "number",
                      inputProps: {
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                    }}
                  />
                </Grid>

                <Grid xs={12} container item>
                  <Grid item padding={1} xs={6}>
                    {" "}
                    <Button
                      onClick={handleVerifyCode}
                      size="large"
                      sx={{ px: 1, py: 2 }}
                      fullWidth
                      variant="contained"
                    >
                      ثبت کد
                    </Button>
                  </Grid>
                  <Grid item padding={1} xs={6}>
                    <Button
                      disabled={isSmsReceived && (seconds > -1 || minutes > 0)}
                      onClick={handleCountDown}
                      size="large"
                      sx={{ px: 1, py: 2 }}
                      fullWidth
                      variant="outlined"
                    >
                      {isSmsReceived ? `${sec} : ${min}` : " دریافت دوباره کد"}
                    </Button>
                  </Grid>

                  <Grid
                    onClick={handleEditNumber}
                    component={Button}
                    variant="text"
                    sx={{
                      fontSize: 14,
                      textAlign: "center",
                      mt: 2,
                      textDecoration: "none",
                      color: "primary",
                      border: "2px solid #75502f",
                      borderRadius: 5,
                      px: 1,
                      py: 2,
                      mb: 2,
                    }}
                    item
                    xs={12}
                  >
                    تغییر شماره تماس
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid sx={{ mb: 3 }} item xs={12}>
                  <Typography textAlign={"center"} sx={{ mb: 5 }} variant="h6">
                    شماره موبایل خود را وارد کنید
                  </Typography>
                  <RtlTextField
                    TextFieldsProps={{
                      type: "number",
                      inputProps: {
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                    }}
                    type="number"
                    fullWidth
                    onChange={handleSetPhoneNumber}
                    label="شماره موبایل"
                  />
                  <Typography
                    variant="caption"
                    color={"error"}
                    sx={{
                      marginRight: 1,
                    }}
                  >
                    {!isValid && number.length != 11
                      ? "لطفا شماره موبایل خود را به درستی وارد نمایید"
                      : ""}
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={6} sx={{ mb: 1 }}>
                  <Captcha />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <RtlTextField
                    textAlign={"center"}
                    value={captcha}
                    size="medium"
                    required
                    label="متن تصویر"
                    color="info"
                    inputProps={{
                      maxLength: 4,
                    }}
                    TextFieldsProps={{
                      type: "number",
                      inputProps: {
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                    }}
                    type="number"
                    // fullWidth
                    onChange={handleCaptcha}
                    variant="outlined"
                  />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    disabled={
                      (isSmsReceived && (seconds > -1 || minutes > 0)) ||
                      !isValid
                    }
                    onClick={handleSendSms}
                    size="medium"
                    sx={{ p: 2, borderRadius: 10 }}
                    fullWidth
                    variant="contained"
                  >
                    {isSmsReceived ? `${sec} : ${min}` : "دریافت کد"}
                  </Button>

                  {/* */}
                </Grid>
              </>
            )}

            <Grid
              href="/auth/login"
              sx={{
                fontSize: 14,
                textAlign: "center",
                mt: 2,
                textDecoration: "none",
                color: "primary",
                border: "2px solid #75502f",
                borderRadius: 10,
                px: 1,
                py: 2,
                mb: 2,
              }}
              component={Link}
              item
              xs={12}
            >
              حساب کاربری دارید ؟ وارد شوید
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}

export default PhoneVerification;
