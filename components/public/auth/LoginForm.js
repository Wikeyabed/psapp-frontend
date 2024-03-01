/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormGroup,
  Divider,
} from "@mui/material";
import Link from "../../../src/Link";
import { setCookie } from "cookies-next";
import { userLogin } from "../../../redux/reducers/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import Captcha from "./Captcha";
const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  marginTop: 150,
  marginBottom: 150,
  padding: 20,
  borderRadius: "10px",
}));

const Card = styled(Grid)(({ theme }) => ({
  margin: "auto",
}));

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
    let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    let result = regex.test(event.target.value);

    if (result) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleCaptcha = (event) => {
    setLoginInfo({ ...loginInfo, captcha: event.target.value });
    console.log(tempCaptcha);
  };

  const handlePassword = (event) => {
    setLoginInfo({ ...loginInfo, password: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loginInfo.captcha.toLowerCase() == tempCaptcha.toLowerCase()) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      let urlencoded = new URLSearchParams();
      urlencoded.append("phone_number", loginInfo.phoneNumber);
      urlencoded.append("password", loginInfo.password);
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        requestOptions
      ).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            console.log(data);

            // set token to local storage

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
          });
        } else {
          dispatch(
            setNotificationOn({
              message: "نام کاربری یا رمزعبور اشتباه است",
              color: "error",
            })
          );

          setLoginInfo({ ...loginInfo, password: "" });
        }
      });
    } else {
      setLoginInfo({ ...loginInfo, password: "" });
      dispatch(
        setNotificationOn({
          message: "متن امنیتی وارد شده اشتباه است",
          color: "error",
        })
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Card item xs={10} md={3}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Grid component={Item} elevation={4} container>
                <Grid sx={{ mb: 1 }} item xs={12}>
                  <Typography textAlign={"center"} sx={{ mb: 5 }} variant="h5">
                    ورود بـه حساب کـاربـری
                  </Typography>

                  <RtlTextField
                    value={loginInfo.phoneNumber}
                    required
                    fullWidth
                    onChange={handlePhoneNumber}
                    label="شماره تماس"
                  />
                  <RtlTextField
                    value={loginInfo.password}
                    required
                    fullWidth
                    onChange={handlePassword}
                    label="رمز عبور"
                    type="password"
                  />
                </Grid>

                <Grid xs={12} item>
                  {" "}
                  <Divider sx={{ my: 4, width: "95%", mx: "auto" }} />
                </Grid>

                <Grid xs={12} lg={6} item>
                  <Captcha />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <RtlTextField
                    textAlign={"center"}
                    value={loginInfo.captcha}
                    size="medium"
                    required
                    label="متن تصویر"
                    color="info"
                    inputProps={{
                      maxLength: 4,
                    }}
                    // fullWidth
                    onChange={handleCaptcha}
                    type="text"
                    variant="outlined"
                  />
                </Grid>

                <Grid sx={{ mt: 4 }} xs={12} item>
                  <Button
                    disabled={!isValid}
                    sx={{ p: 1 }}
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    ورود
                  </Button>
                </Grid>

                <Grid
                  href="/"
                  sx={{
                    fontSize: 12,
                    textAlign: "center",
                    mt: 4,
                    textDecoration: "none",
                  }}
                  component={Link}
                  item
                  xs={12}
                >
                  بازگشت به فروشگاه
                </Grid>

                <Grid
                  href="/auth/register"
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
                  حساب کاربری ندارید ؟ ثبت نام کنید
                </Grid>
              </Grid>
            </FormGroup>
          </form>
        </Card>
      </Grid>
    </Box>
  );
}

export default LoginForm;
