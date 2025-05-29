/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
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
import Image from "next/image";
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
  [theme.breakpoints.up("md")]: {
    width: "45vw",
    maxWidth: "100vw",
  },
}));

const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  padding: "20px 20px",
  textAlign: "center",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px",
  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.2)",
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "8px",
}));

const LoginForm = styled(Box)(({ theme }) => ({
  padding: "20px",
  marginTop: "-15px",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: "0 5px 25px rgba(0, 0, 0, 0.08)",
  position: "relative",
  zIndex: 1,
  flexGrow: 1,
}));

const FormGroup = styled(Box)(({ theme }) => ({
  marginBottom: "15px",

}));

const InputLabel = styled(Typography)(({ theme }) => ({
  display: "block",
  marginBottom: "6px",
  fontWeight: 500,
  color: "#4b5563",
}));

const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    "& input": {
      padding: "12px",
    },
  },
  width: "100%",
}));

const PasswordContainer = styled(Box)(({ theme }) => ({
  position: "relative",
}));

const TogglePassword = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#9ca3af",
}));

const RememberForgot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
}));

const RememberMe = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const ForgotPassword = styled(Link)(({ theme }) => ({
  color: "#6366f1",
  textDecoration: "none",
  fontSize: "0.7rem",
}));

const LoginButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  borderRadius: "12px",
  fontSize: "0.95rem",
  fontWeight: 600,
  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
  transition: "all 0.3s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: "20px 0",
  color: "#9ca3af",
  "&::before, &::after": {
    content: '""',
    flex: 1,
    borderBottom: "1px solid #e5e7eb",
  },
  "&::before": {
    marginLeft: "10px",
  },
  "&::after": {
    marginRight: "10px",
  },
}));

const SocialLogin = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  marginBottom: "20px",
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  color: "#4b5563",
  transition: "all 0.3s",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
}));

const RegisterLink = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: "15px",
  color: "#4b5563",
  fontSize: "0.7rem",
}));

const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "15px",
  color: "#9ca3af",
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

  const handlePhoneNumber = (event) => {
    setLoginInfo({ ...loginInfo, phoneNumber: event.target.value });
    const regex = /^(\+98|0)?9\d{9}$/;
    setIsValid(regex.test(event.target.value));
  };

  const handlePassword = (event) => {
    setLoginInfo({
      ...loginInfo,
      password: fixPersianNumber(event.target.value),
    });
  };

  const handleCaptcha = (event) => {
    setLoginInfo({ ...loginInfo, captcha: event.target.value });
  };

  const handleRememberMe = (event) => {
    setLoginInfo({ ...loginInfo, rememberMe: event.target.checked });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginInfo.captcha?.toLowerCase() === tempCaptcha?.toLowerCase()) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("phone_number", loginInfo.phoneNumber);
      urlencoded.append("password", loginInfo.password);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlencoded,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        requestOptions
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
        setLoginInfo({ ...loginInfo, password: "" });
      }
    } else {
      dispatch(
        setNotificationOn({
          message: "متن امنیتی وارد شده اشتباه است",
          color: "error",
        })
      );
      setLoginInfo({ ...loginInfo, password: "" });
    }
  };

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
          <FormGroup>
            <InputLabel>شماره موبایل</InputLabel>
            <InputField
              value={loginInfo.phoneNumber}
              onChange={handlePhoneNumber}
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
          </FormGroup>

          <FormGroup>
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
          </FormGroup>

          <Grid container>
            <Grid xs={6}>
              {" "}
              <RememberMe>
                <FormControlLabel
                sx={{
                  mr :0
                }}
                  control={
                    <Checkbox
                       size="small"
                      sx={{
                    fontSize:5
                  }}
                    checked={loginInfo.rememberMe}
                      onChange={handleRememberMe}
                      color="primary"
                    />
                  }
                  label="مرا به خاطر بسپار"
                />
              </RememberMe>
            </Grid>
            <Grid xs={6} sx={{
              mt :1
            }}>
              {" "}
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <ForgotPassword href="/auth/reset">
                  رمز عبور را فراموش کرده‌اید؟
                </ForgotPassword>
                <RegisterLink>
                  حساب کاربری ندارید؟{" "}
                  <Link
                    href="/auth/register"
                    style={{ color: "#6366f1", fontWeight: 500 }}
                  >
                    ثبت نام کنید
                  </Link>
                </RegisterLink>
              </Box>
            </Grid>
            <Grid xs={12}></Grid>
          </Grid>

          <RememberForgot></RememberForgot>

          <FormGroup>
            <Box textAlign="center">
              <Captcha />
            </Box>
          </FormGroup>

          <FormGroup>
            <InputLabel>متن تصویر</InputLabel>
            <InputField
              value={loginInfo.captcha}
              onChange={handleCaptcha}
              required
              placeholder="متن تصویر را وارد کنید"
              type="text"
            />
          </FormGroup>

          <LoginButton type="submit" disabled={!isValid}>
            ورود به حساب
          </LoginButton>

          <Box textAlign="center" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href="https://www.eebox.ir"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: "12px",
                padding: "8px 16px",
                fontWeight: 600,
                fontSize: "0.95rem",
                textTransform: "none",
              }}
            >
              بازگشت به فروشگاه
            </Button>
          </Box>

          <StyledDivider>یا</StyledDivider>

          <SocialLogin>
            <SocialButton
              component="a"
              href="https://wa.me/98128634399"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon style={{ color: "#25D366" }} />
            </SocialButton>

            <SocialButton
              component="a"
              href="https://t.me/samen_Admin1001"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon style={{ color: "#0088cc" }} />
            </SocialButton>

            {isMobile && (
              <SocialButton component="a" href="tel:09194737478">
                <PhoneIcon style={{ color: "#34B7F1" }} />
              </SocialButton>
            )}
          </SocialLogin>
        </LoginForm>

        <Footer>کلیه حقوق برای فروشگاه اینترنتی ایباکس محفوظ است © 1404</Footer>
      </LoginContainer>
    </>
  );
}

export default LoginPage;
