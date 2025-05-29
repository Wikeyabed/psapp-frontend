import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
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
import RefreshIcon from "@mui/icons-material/Refresh";

// استایل‌های سفارشی
const VerificationContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: 0,

  // فقط در دسکتاپ عرض را 100vw کنیم
  [theme.breakpoints.up("md")]: {
    width: "45vw",
    maxWidth: "100vw", // override محدودیت MUI Container
  },
}));

const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  padding: "30px 20px",
  textAlign: "center",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px",
  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.2)",
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "10px",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: "30px 20px",
  marginTop: "-20px",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: "0 5px 25px rgba(0, 0, 0, 0.08)",
  position: "relative",
  zIndex: 1,
  flexGrow: 1,
}));

const StepsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px",
  gap: "10px",
}));

const Step = styled(Box)(({ theme, active }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: active ? "#6366f1" : "#e5e7eb",
  color: active ? "white" : "#9ca3af",
  fontWeight: "bold",
}));

const StepLine = styled(Box)(({ theme }) => ({
  height: "2px",
  backgroundColor: "#e5e7eb",
  flexGrow: 1,
  marginTop: "14px",
}));

const FormGroup = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
}));

const InputLabel = styled(Typography)(({ theme }) => ({
  display: "block",
  marginBottom: "8px",
  fontWeight: 500,
  color: "#4b5563",
}));

const PhoneInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const CountryCode = styled(Box)(({ theme }) => ({
  padding: "15px",
  backgroundColor: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRight: "none",
  borderRadius: "12px 0 0 12px",
  fontSize: "0.9rem",
}));

const PhoneField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0 12px 12px 0",
    backgroundColor: "#f9fafb",
    "& input": {
      padding: "15px",
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
  "&.primary": {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
    },
  },
  "&.outlined": {
    border: "1px solid #6366f1",
    color: "#6366f1",
    "&:hover": {
      backgroundColor: "rgba(99, 102, 241, 0.1)",
    },
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "20px",
  color: "#9ca3af",
  fontSize: "0.8rem",
}));

const CaptchaContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px 0",
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
              dispatch(receiveSms());
              dispatch(setTempNumber(data.phone_number));
              dispatch(
                setNotificationOn({
                  message: "کد ورود به شماره وارد شده ارسال شد",
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

  // const handleSetPhoneNumber = (event) => {
  //       event.target.value.replace(/\D/g, "");

  //   setNumber(parseInt(event.target.value));
  //   let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  //   let result = regex.test(event.target.value);
  //   if (result && result != NaN) {
  //     setIsValid(true);s
  //   } else {
  //     setIsValid(false);
  //   }
  // };

  const handleSetPhoneNumber = (event) => {
    const inputValue = event.target.value;

    // Only allow numeric input (remove all non-digit characters)
    const numericValue = inputValue.replace(/\D/g, "");

    // Update state with the cleaned numeric string (not parsed as number)
    setNumber(numericValue);

        let regex = new RegExp("^(\\+98|0)?9\\d{9}$");

    // Validate Iranian mobile number (must start with 9 and be 10 digits)
    const isValidNumber = regex.test(numericValue);
    setIsValid(isValidNumber || numericValue === "");

    // Optional: Format the display value with spaces as user types
    // return numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
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
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SimpleBottomNavigation />
      </Box>

      <VerificationContainer>
        <Header>
          <Logo>به ایباکس خوش آمدید</Logo>
          <Typography variant="h6">
            {initiated ? "تایید شماره موبایل" : "ثبت نام - مرحله ۱ از ۳"}
          </Typography>
        </Header>

        <FormContainer>
          <StepsContainer>
            <Step active={!initiated}>۱</Step>
            <StepLine />
            <Step active={initiated}>۲</Step>
            <StepLine />
            <Step>۳</Step>
          </StepsContainer>

          {initiated ? (
            <>
              <FormGroup>
                <InputLabel>کد تایید ارسال شده را وارد کنید</InputLabel>
                <MuiOtpInput
                  
                  sx={{
                    direction: "ltr",
                    justifyContent: "center",
                    "& .MuiOtpInput-TextField": {
                      borderRadius: "12px",
                      backgroundColor: "#f9fafb",
                    },
                  }}
                  length={5}
                  value={otp}
                  onChange={handleChange}
                  TextFieldsProps={{
                    type: "tel",
                    inputProps: {
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    },
                  }}
                />
              </FormGroup>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <ActionButton className="primary" onClick={handleVerifyCode}>
                    ثبت کد
                  </ActionButton>
                </Grid>
                <Grid item xs={6}>
                  <ActionButton
                    className="outlined"
                    disabled={isSmsReceived && (seconds > -1 || minutes > 0)}
                    onClick={handleCountDown}
                  >
                    {isSmsReceived ? `${sec}:${min}` : "دریافت دوباره کد"}
                  </ActionButton>
                </Grid>
              </Grid>

              <ActionButton
                className="outlined"
                onClick={handleEditNumber}
                sx={{ mt: 2 }}
              >
                تغییر شماره تماس
              </ActionButton>
            </>
          ) : (
            <>
              <FormGroup>
                <InputLabel>شماره موبایل</InputLabel>
                <TextField
                  fullWidth
                  type="tel"
                  value={number}
                  onChange={handleSetPhoneNumber}
                  placeholder="9123456789"
                  error={!isValid && number.length !== 0}
                  helperText={
                    !isValid && number.length !== 0
                      ? "لطفا شماره موبایل معتبر وارد کنید"
                      : "کد تایید به این شماره ارسال خواهد شد"
                  }
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          px: 2,
                          color: "#6b7280",
                          borderRight: "1px solid #e5e7eb",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        +98
                      </Box>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "#f9fafb",
                      direction: "ltr",
                    },
                    "& input": {
                      textAlign: "right",
                      direction: "ltr",
                    },
                  }}
                />
              </FormGroup>

              <CaptchaContainer>
                <Captcha />
                <TextField
                  fullWidth
                  value={captcha}
                  onChange={handleCaptcha}
                  placeholder="کد امنیتی را وارد کنید"
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "#f9fafb",
                    },
                  }}
                />
              </CaptchaContainer>

              <ActionButton
                className="primary"
                disabled={
                  (isSmsReceived && (seconds > -1 || minutes > 0)) || !isValid
                }
                onClick={handleSendSms}
              >
                {isSmsReceived ? `${sec}:${min}` : "دریافت کد تایید"}
              </ActionButton>
            </>
          )}

          <Typography sx={{ textAlign: "center", mt: 3 }}>
            حساب کاربری دارید؟{" "}
            <Link href="/auth/login" style={{ color: "#6366f1" }}>
              وارد شوید
            </Link>
          </Typography>
        </FormContainer>

        <Footer>کلیه حقوق برای فروشگاه اینترنتی ایباکس محفوظ است © 1404</Footer>
      </VerificationContainer>
    </>
  );
}

export default PhoneVerification;
