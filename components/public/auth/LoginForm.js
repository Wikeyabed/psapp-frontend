/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  Container,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "../../../src/Link";
import { setCookie } from "cookies-next";
import { userLogin } from "../../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import Captcha from "./Captcha";
import { fixPersianNumber } from "../../../src/toEnglishNumber";
import SimpleBottomNavigation from "../layout/navbar/BottomNav";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneIcon from "@mui/icons-material/Phone";

const LoginContainer = styled(Container)(({ theme }) => ({
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
  padding: theme.spacing(2.5),
  textAlign: "center",
  borderBottomLeftRadius: theme.palette.primary.borderRadius,
  borderBottomRightRadius: theme.palette.primary.borderRadius,
  boxShadow: theme.shadows[4],
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const LoginForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  marginTop: theme.spacing(-2),
  backgroundColor: theme.palette.primary.lightBg,
  borderRadius: theme.palette.primary.borderRadius,
  boxShadow: theme.shadows[3],
  position: "relative",
  zIndex: 1,
  flexGrow: 1,
}));

const InputLabel = styled(Typography)(({ theme }) => ({
  display: "block",
  marginBottom: theme.spacing(0.75),
  fontWeight: 500,
  color: theme.palette.secondary.text,
}));

const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
    "& input": {
      padding: theme.spacing(1.5),
    },
  },
  width: "100%",
}));

const PasswordContainer = styled(Box)(({ theme }) => ({
  position: "relative",
}));

const TogglePassword = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(1.5),
  top: "50%",
  transform: "translateY(-50%)",
  color: theme.palette.text.secondary,
}));

const RememberMe = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const ForgotPassword = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontSize: "0.7rem",
  fontWeight: 500,
}));

const LoginButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  background: theme.palette.primary.gradient,
  color: theme.palette.primary.textWhite,
  borderRadius: theme.spacing(1.5),
  fontWeight: 600,
  boxShadow: theme.shadows[4],
  transition: theme.transitions.create(["transform", "box-shadow"]),
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
    background: theme.palette.primary.gradient,
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2.5, 0),
  color: theme.palette.text.secondary,
  "&::before, &::after": {
    borderColor: theme.palette.divider,
  },
}));

const SocialLogin = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  width: 45,
  height: 45,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.lightBg,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(["transform", "box-shadow"]),
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.primary.lightBg,
  },
}));

const RegisterLink = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
}));

const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
}));

function LoginPage() {
  const dispatch = useDispatch();
  const tempCaptcha = useSelector((state) => state.auth.tempCaptchaText);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: "",
    password: "",
    captcha: null,
    rememberMe: false,
  });
  const [isValid, setIsValid] = useState(true);

  const handleChange = (field) => (event) => {
    const value =
      field === "rememberMe" ? event.target.checked : event.target.value;
    setLoginInfo((prev) => ({ ...prev, [field]: value }));

    if (field === "phoneNumber") {
      const regex = /^(\+98|0)?9\d{9}$/;
      setIsValid(regex.test(event.target.value));
    }
  };

  const handlePassword = (event) => {
    setLoginInfo((prev) => ({
      ...prev,
      password: fixPersianNumber(event.target.value),
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginInfo.captcha?.toLowerCase() !== tempCaptcha?.toLowerCase()) {
      dispatch(
        setNotificationOn({
          message: "متن امنیتی وارد شده اشتباه است",
          color: "error",
        })
      );
      return;
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("phone_number", loginInfo.phoneNumber);
    urlencoded.append("password", loginInfo.password);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlencoded,
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setCookie("x-auth-token", data.token);

        dispatch(
          userLogin({
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            phoneNumber: data.user.phone_number,
            address: data.user.address,
            email: data.user.email,
            refer: data.user.refer,
            r: data.user.role,
            shoppingCartIds: data.user.shopping_list_id,
          })
        );

        dispatch(
          setNotificationOn({
            message: "شما با موفقیت وارد سیستم شدید",
            color: "info",
          })
        );
      } else {
        dispatch(
          setNotificationOn({
            message: "نام کاربری یا رمز عبور اشتباه است",
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

  const socialIcons = [
    {
      icon: <WhatsAppIcon style={{ color: "#25D366" }} />,
      href: "https://wa.me/989194737478",
    },
    {
      icon: <TelegramIcon style={{ color: "#0088cc" }} />,
      href: "https://t.me/samen_Admin1001",
    },
    ...(isMobile
      ? [
          {
            icon: <PhoneIcon style={{ color: "#34B7F1" }} />,
            href: "tel:09128634399",
          },
        ]
      : []),
  ];

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SimpleBottomNavigation />
      </Box>

      <LoginContainer>
        <Header>
          <Logo>به ایباکس خوش آمدید</Logo>
          <Typography variant="h6">ورود به حساب کاربری</Typography>
        </Header>

        <LoginForm component="form" onSubmit={handleSubmit}>
          <Box mb={2}>
            <InputLabel>شماره موبایل</InputLabel>
            <InputField
              value={loginInfo.phoneNumber}
              onChange={handleChange("phoneNumber")}
              required
              placeholder="09xxxxxxxxx"
              type="tel"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            {!isValid && (
              <Typography variant="caption" color="error">
                لطفا شماره موبایل خود را به درستی وارد نمایید
              </Typography>
            )}
          </Box>

          <Box mb={2}>
            <InputLabel>رمز عبور</InputLabel>
            <PasswordContainer>
              <InputField
                value={loginInfo.password}
                onChange={handlePassword}
                required
                placeholder="رمز عبور خود را وارد کنید"
                type={showPassword ? "text" : "password"}
              />
              <TogglePassword onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </TogglePassword>
            </PasswordContainer>
          </Box>

          <Grid container alignItems="center" mb={2}>
            <Grid item xs={6}>
              <RememberMe>
                <Checkbox
                  size="small"
                  checked={loginInfo.rememberMe}
                  onChange={handleChange("rememberMe")}
                  color="primary"
                />
                <Typography variant="body2">مرا به خاطر بسپار</Typography>
              </RememberMe>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <ForgotPassword href="/auth/reset">
                  رمز عبور را فراموش کرده‌اید؟
                </ForgotPassword>
              </Box>
            </Grid>
          </Grid>

          <Box textAlign="center" mb={2}>
            <Captcha />
          </Box>

          <Box mb={3}>
            <InputLabel>متن تصویر</InputLabel>
            <InputField
              value={loginInfo.captcha}
              onChange={handleChange("captcha")}
              required
              placeholder="متن تصویر را وارد کنید"
              type="text"
            />
          </Box>

          <LoginButton type="submit" disabled={!isValid}>
            ورود به حساب
          </LoginButton>

          <Box textAlign="center" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href="https://www.eebox.ir"
              sx={{
                borderRadius: theme.spacing(1.5),
                padding: theme.spacing(1, 2),
                fontWeight: 600,
              }}
            >
              بازگشت به فروشگاه
            </Button>
          </Box>

          <StyledDivider>یا</StyledDivider>

          <SocialLogin>
            {socialIcons.map((item, index) => (
              <SocialButton
                key={index}
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </SocialButton>
            ))}
          </SocialLogin>

          <RegisterLink>
            حساب کاربری ندارید؟{" "}
            <ForgotPassword href="/auth/register">ثبت نام کنید</ForgotPassword>
          </RegisterLink>
        </LoginForm>

        <Footer>کلیه حقوق برای فروشگاه اینترنتی ایباکس محفوظ است © 1404</Footer>
      </LoginContainer>
    </>
  );
}

export default LoginPage;
