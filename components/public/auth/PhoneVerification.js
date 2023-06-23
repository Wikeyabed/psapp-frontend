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

import Link from "../../../src/Link";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  marginTop: 150,
  padding: 20,
}));

const Card = styled(Grid)(({ theme }) => ({
  margin: "auto",
  backgroundColor: theme.palette.primary.lightBg,
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
  const [otp, setOtp] = useState("");
  const [sms, setSms] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    console.log("effectisnsg");
    const interval = setInterval(() => {
      if (seconds > 0 && sms) {
        setSeconds(seconds - 1);
      } else {
        setSms(false);
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
  }, [seconds, sms]);

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(15);
  };

  const handleCountDown = () => {
    setSms(true);
    setInitiated(true);
    resendOTP();
  };

  const handleEditNumber = () => {
    setSms(false);
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
          <Grid component={Item} container>
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
                  <Grid padding={1} xs={6}>
                    {" "}
                    <Button
                      //   onClick={handleCountDown}
                      size="large"
                      sx={{ p: 2 }}
                      fullWidth
                      variant="contained"
                    >
                      ثبت کد
                    </Button>
                  </Grid>
                  <Grid padding={1} xs={6}>
                    <Button
                      disabled={sms && (seconds > -1 || minutes > 0)}
                      onClick={handleCountDown}
                      size="large"
                      sx={{ p: 2 }}
                      fullWidth
                      variant="outlined"
                    >
                      {sms ? `${sec} : ${min}` : " دریافت  دوباره کد"}
                    </Button>
                  </Grid>

                  <Grid
                    onClick={handleEditNumber}
                    disabled={sms && (seconds > -1 || minutes > 0)}
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
                  <RtlTextField type="number" fullWidth label="شماره تماس" />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    disabled={sms && (seconds > -1 || minutes > 0)}
                    onClick={handleCountDown}
                    size="large"
                    sx={{ p: 2 }}
                    fullWidth
                    variant="contained"
                  >
                    {sms ? `${sec} : ${min}` : "دریافت کد"}
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
