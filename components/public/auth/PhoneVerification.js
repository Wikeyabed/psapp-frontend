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
} from "@mui/material";
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

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  marginTop: 150,
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
  const isSmsReceived = useSelector((state) => state.auth.isSmsReceived);
  const [otp, setOtp] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [number, setNumber] = useState("");
  const [initiated, setInitiated] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);

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

  const handleSendSms = async () => {
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
                color: "success",
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
    setMinutes(0);
    setSeconds(10);
  };

  const handleCountDown = () => {
    dispatch(receiveSms());
    setTimer();
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
      <Grid component={FormControl} container spacing={2}>
        <Card item xs={10} md={3}>
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
                    length={6}
                    value={otp}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid xs={12} container item>
                  <Grid item padding={1} xs={6}>
                    {" "}
                    <Button
                      onClick={handleVerifyCode}
                      size="large"
                      sx={{ p: 2 }}
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
                      sx={{ p: 2 }}
                      fullWidth
                      variant="outlined"
                    >
                      {isSmsReceived ? `${sec} : ${min}` : " دریافت  دوباره کد"}
                    </Button>
                  </Grid>

                  <Grid
                    onClick={handleEditNumber}
                    disabled={isSmsReceived && (seconds > -1 || minutes > 0)}
                    component={Button}
                    variant="text"
                    sx={{
                      cursor: "pointer",
                      fontSize: 14,
                      textAlign: "center",
                      mt: 4,
                      textDecoration: "none",
                      color: "red",
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
                <Grid sx={{ mb: 6 }} item xs={12}>
                  <Typography sx={{ mb: 5 }} variant="h6">
                    شماره موبایل خود را وارد کنید
                  </Typography>
                  <RtlTextField
                    type="number"
                    fullWidth
                    onChange={handleSetPhoneNumber}
                    label="شماره تماس"
                  />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    disabled={
                      (isSmsReceived && (seconds > -1 || minutes > 0)) ||
                      !isValid
                    }
                    onClick={handleSendSms}
                    size="large"
                    sx={{ p: 2 }}
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
                mt: 4,
                textDecoration: "none",
                color: "darkgray",
              }}
              component={Link}
              item
              xs={12}
            >
              حساب کاربری دارید ؟ وارد شوید
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}

export default PhoneVerification;
