/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormGroup,
  Container,
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

const Item = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "16px",
  backgroundColor: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  padding: theme.spacing(3),
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginBottom: theme.spacing(2),
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center",
  "& label": {
    transformOrigin: "right",
    textAlign: "right",
    right: "1.75rem",
    left: "unset",
  },
}));

function LoginForm() {
  const dispatch = useDispatch();
  const tempCaptcha = useSelector((state) => state.auth.tempCaptchaText);

  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: "",
    password: "",
    captcha: null,
  });
  const [isValid, setIsValid] = useState(true);

  const handlePhoneNumber = (event) => {
    setLoginInfo({ ...loginInfo, phoneNumber: event.target.value });
    const regex = /^(\+98|0)?9\d{9}$/;
    setIsValid(regex.test(event.target.value));
  };

  const handlePassword = (event) => {
    setLoginInfo({ ...loginInfo, password: fixPersianNumber(event.target.value) });
  };

  const handleCaptcha = (event) => {
    setLoginInfo({ ...loginInfo, captcha: event.target.value });
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, requestOptions);
      if (response.status === 200) {
        const data = await response.json();
        setCookie("x-auth-token", data.token);

        dispatch(userLogin({
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          phoneNumber: data.user.phone_number,
          address: data.user.address,
          email: data.user.email,
          refer: data.user.refer,
          r: data.user.role,
          shoppingCartIds: data.user.shopping_list_id,
        }));

        dispatch(setNotificationOn({
          message: "شما با موفقیت وارد سیستم شدید",
          color: "info",
        }));
      } else {
        dispatch(setNotificationOn({
          message: "نام کاربری یا رمز عبور اشتباه است",
          color: "error",
        }));
        setLoginInfo({ ...loginInfo, password: "" });
      }
    } else {
      dispatch(setNotificationOn({
        message: "متن امنیتی وارد شده اشتباه است",
        color: "error",
      }));
      setLoginInfo({ ...loginInfo, password: "" });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, background: "linear-gradient(135deg, #6366f1, #06b6d4)", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <SimpleBottomNavigation />
        </Box>
        <Grid container>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormGroup>
              <Item
                xs={12}
                md={8}
                lg={6}
                sx={{ mx: "auto", mt: 5 }}
                container
              >
                <Grid item xs={12}>
                  <Box textAlign="center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/logo3.png`}
                      width={100}
                      height={100}
                      alt="logo"
                      style={{ objectFit: "contain" }}
                    />
                    <Typography variant="h6" sx={{ mt: 2, mb: 4, color: "#6366f1" }}>
                      ورود به حساب کاربری
                    </Typography>
                  </Box>
                  <RtlTextField
                    value={loginInfo.phoneNumber}
                    onChange={handlePhoneNumber}
                    required
                    label="شماره موبایل"
                    type="tel"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                  {!isValid && (
                    <Typography variant="caption" color="error">
                      لطفا شماره موبایل خود را به درستی وارد نمایید
                    </Typography>
                  )}
                  <RtlTextField
                    value={loginInfo.password}
                    onChange={handlePassword}
                    required
                    label="رمز عبور"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box textAlign="center">
                    <Captcha />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <RtlTextField
                    value={loginInfo.captcha}
                    onChange={handleCaptcha}
                    required
                    label="متن تصویر"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    disabled={!isValid}
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ p: 1.5, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
                  >
                    ورود
                  </Button>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <Grid item xs={6} component={Link} href="/">
                    <Box
                      sx={{
                        textAlign: "center",
                        fontSize: 14,
                        borderRadius: 5,
                        color: "#ec9d50",
                        border: "2px solid #ec9d50",
                        py: 1,
                        cursor: "pointer",
                      }}
                    >
                      بازگشت به فروشگاه
                    </Box>
                  </Grid>
                  <Grid item xs={6} component={Link} href="/auth/reset">
                    <Box
                      sx={{
                        textAlign: "center",
                        fontSize: 14,
                        borderRadius: 5,
                        color: "#ec9d50",
                        border: "2px solid #ec9d50",
                        py: 1,
                        cursor: "pointer",
                      }}
                    >
                      رمز عبور جدید
                    </Box>
                  </Grid>
                  <Grid item xs={12} component={Link} href="/auth/register">
                    <Box
                      sx={{
                        textAlign: "center",
                        fontSize: 14,
                        mt: 2,
                        borderRadius: 10,
                        color: "#75502f",
                        border: "2px solid #75502f",
                        py: 2,
                        cursor: "pointer",
                      }}
                    >
                      حساب کاربری ندارید؟ ثبت‌نام کنید
                    </Box>
                  </Grid>
                </Grid>
              </Item>
            </FormGroup>
          </form>
        </Grid>
      </Container>
    </Box>
  );
}

export default LoginForm;