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
import { useTheme } from "@mui/material/styles";

// استایل‌های سفارشی با استفاده از تم
const VerificationContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: 0,
  backgroundColor: theme.palette.primary.lightBg,
  [theme.breakpoints.up("md")]: {
    width: "45vw",
    maxWidth: "100vw",
  },
}));

const Header = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.gradient,
  color: theme.palette.primary.textWhite,
  padding: theme.spacing(3, 2.5),
  textAlign: "center",
  borderBottomLeftRadius: theme.palette.primary.borderRadius,
  borderBottomRightRadius: theme.palette.primary.borderRadius,
  boxShadow: theme.shadows[4],
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  marginTop: theme.spacing(-2.5),
  backgroundColor: theme.palette.primary.lightBg,
  borderRadius: theme.palette.primary.borderRadius,
  boxShadow: theme.shadows[3],
  position: "relative",
  zIndex: 1,
  flexGrow: 1,
}));

const InputLabel = styled(Typography)(({ theme }) => ({
  display: "block",
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  color: theme.palette.secondary.text,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.875),
  borderRadius: theme.spacing(1.5),
  fontSize: "1rem",
  fontWeight: 600,
  transition: theme.transitions.create(["transform", "box-shadow"]),
  "&.primary": {
    background: theme.palette.primary.gradient,
    color: theme.palette.primary.textWhite,
    boxShadow: theme.shadows[4],
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[6],
    },
    "&:disabled": {
      background: theme.palette.grey[300],
    },
  },
  "&.outlined": {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  fontSize: "0.8rem",
}));

const CaptchaContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: theme.spacing(2.5, 0),
}));

function PasswordReset() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const tempCaptcha = useSelector((state) => state.auth.tempCaptchaText);
  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: "",
    captcha: "",
  });
  const [isValid, setIsValid] = useState(true);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setLoginInfo((prev) => ({ ...prev, [field]: value }));

    if (field === "phoneNumber") {
      const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
      setIsValid(regex.test("+98" + value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loginInfo.captcha.toLowerCase() !== tempCaptcha?.toLowerCase()) {
      dispatch(
        setNotificationOn({
          message: "متن امنیتی وارد شده اشتباه است",
          color: "error",
        })
      );
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/pw-reset`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            phone_number: "+98" + loginInfo.phoneNumber,
          }),
        }
      );

      if (response.status === 200) {
        await response.json();
        dispatch(
          setNotificationOn({
            message: "رمز عبور جدید برای شما ارسال شد",
            color: "info",
          })
        );
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        dispatch(
          setNotificationOn({
            message: "اطلاعات وارد شده صحیح نمی باشد",
            color: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        setNotificationOn({
          message: "خطا در ارتباط با سرور",
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

        <FormContainer component="form" onSubmit={handleSubmit}>
          <Box mb={3}>
            <InputLabel>شماره موبایل</InputLabel>
            <TextField
              type="tel"
              fullWidth
              value={loginInfo.phoneNumber}
              onChange={handleChange("phoneNumber")}
              placeholder="9123456789"
              error={!isValid && loginInfo.phoneNumber.length > 0}
              helperText={
                !isValid && loginInfo.phoneNumber.length > 0
                  ? "لطفا شماره موبایل معتبر وارد کنید"
                  : "رمز عبور جدید به این شماره ارسال خواهد شد"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ color: "text.secondary" }}
                  >
                    +98
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: theme.spacing(1.5),
                  backgroundColor: "background.default",
                  "& input": {
                    padding: theme.spacing(1.875),
                  },
                },
              }}
            />
          </Box>

          <CaptchaContainer>
            <Captcha />
            <TextField
              fullWidth
              value={loginInfo.captcha}
              onChange={handleChange("captcha")}
              placeholder="کد امنیتی را وارد کنید"
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: theme.spacing(1.5),
                  backgroundColor: "background.default",
                },
              }}
            />
          </CaptchaContainer>

          <ActionButton className="primary" disabled={!isValid} type="submit">
            دریافت رمز عبور جدید
          </ActionButton>

          <Typography textAlign="center" mt={3}>
            حساب کاربری دارید؟{" "}
            <Link href="/auth/login" color="primary">
              وارد شوید
            </Link>
          </Typography>

          <Typography textAlign="center" mt={2}>
            حساب کاربری ندارید؟{" "}
            <Link href="/auth/register" color="primary">
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
