/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "../../../src/Link";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import Captcha from "./Captcha";
import SimpleBottomNavigation from "../layout/navbar/BottomNav";
import { useRouter } from "next/router";

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

const FormGroup = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
}));

const InputLabel = styled(Typography)(({ theme }) => ({
  display: "block",
  marginBottom: "8px",
  fontWeight: 500,
  color: "#4b5563",
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

function PasswordReset() {
  const dispatch = useDispatch();
  const router = useRouter();
  const tempCaptcha = useSelector((state) => state.auth.tempCaptchaText);
  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: "",
    captcha: "",
  });
  const [isValid, setIsValid] = useState(true);

  const handlePhoneNumber = (event) => {
    setLoginInfo({ ...loginInfo, phoneNumber: event.target.value });
    let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    let result = regex.test("+98" + event.target.value);
    setIsValid(result);
  };

  const handleCaptcha = (event) => {
    setLoginInfo({ ...loginInfo, captcha: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loginInfo.captcha.toLowerCase() == tempCaptcha.toLowerCase()) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      let urlencoded = new URLSearchParams();
      urlencoded.append("phone_number", "+98" + loginInfo.phoneNumber);
      let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/pw-reset`,
        requestOptions
      ).then((res) => {
        if (res.status == 200) {
          res.json().then(() => {
            dispatch(
              setNotificationOn({
                message: "رمز عبور جدید برای شما ارسال شد",
                color: "info",
              })
            );
            setTimeout(() => {
              router.push("/auth/login");
            }, 2000);
          });
        } else {
          dispatch(
            setNotificationOn({
              message: "اطلاعات وارد شده صحیح نمی باشد",
              color: "error",
            })
          );
          setLoginInfo({ ...loginInfo, phoneNumber: "" });
        }
      });
    } else {
      setLoginInfo({ ...loginInfo, phoneNumber: "" });
      dispatch(
        setNotificationOn({
          message: "متن امنیتی وارد شده اشتباه است",
          color: "error",
        })
      );
    }
  };

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SimpleBottomNavigation />
      </Box>

      <VerificationContainer>
        <Header>
          <Logo>به ایباکس خوش آمدید</Logo>
          <Typography variant="h6">بازیابی رمز عبور</Typography>
        </Header>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <InputLabel>شماره موبایل</InputLabel>
              <TextField
                type="tel"
                fullWidth
                value={loginInfo.phoneNumber}
                onChange={handlePhoneNumber}
                placeholder="9123456789"
                error={!isValid && loginInfo.phoneNumber.length !== 0}
                helperText={
                  !isValid && loginInfo.phoneNumber.length !== 0
                    ? "لطفا شماره موبایل معتبر وارد کنید"
                    : "رمز عبور جدید به این شماره ارسال خواهد شد"
                }
                InputProps={{
                  // تغییر از startAdornment به endAdornment
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ fontSize: "0.95rem", color: "#374151" }}
                    >
                      +98
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                    direction: "rtl", // اضافه کردن برای راست‌چین شدن ورودی
                    "& input": {
                      padding: "15px",
                    },
                  },
                }}
              />
            </FormGroup>

            <CaptchaContainer>
              <Captcha />
              <TextField
                fullWidth
                value={loginInfo.captcha}
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

            <ActionButton className="primary" disabled={!isValid} type="submit">
              دریافت رمز عبور جدید
            </ActionButton>
          </form>

          <Typography sx={{ textAlign: "center", mt: 3 }}>
            حساب کاربری دارید؟{" "}
            <Link href="/auth/login" style={{ color: "#6366f1" }}>
              وارد شوید
            </Link>
          </Typography>

          <Typography sx={{ textAlign: "center", mt: 2 }}>
            حساب کاربری ندارید؟{" "}
            <Link href="/auth/register" style={{ color: "#6366f1" }}>
              ثبت نام کنید
            </Link>
          </Typography>
        </FormContainer>

        <Footer>کلیه حقوق برای فروشگاه اینترنتی ایباکس محفوظ است © 1404</Footer>
      </VerificationContainer>
    </>
  );
}

export default PasswordReset;
