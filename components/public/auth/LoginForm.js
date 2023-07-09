/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useSWR from "swr";
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
  FormGroup,
} from "@mui/material";

import Link from "../../../src/Link";

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
  // display: "block",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    overflow: "unset",
  },
}));

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);

  const handlePhoneNumber = (event) => {
    var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    var result = regex.test(event.target.value);

    if (result) {
      setIsValid(true);
      setLoginInfo({ ...loginInfo, phoneNumber: event.target.value });
    } else {
      setIsValid(false);
      setLoginInfo({ ...loginInfo, phoneNumber: "" });
    }
  };

  const handlePassword = (event) => {
    setLoginInfo({ ...loginInfo, password: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("phone_number", loginInfo.phoneNumber);
    urlencoded.append("password", loginInfo.password);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch("http://localhost:3000/api/v1/auth/login", requestOptions).then(
      (res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            console.log(data);
            localStorage.setItem("token", data.token);
          });
        } else {
          res.text("error");
        }
      }
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Card item xs={10} md={3}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Grid component={Item} elevation={4} container>
                <Grid sx={{ mb: 6 }} item xs={12}>
                  <Typography sx={{ mb: 5 }} variant="h6">
                    ورود به حساب کاربری
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

                <Grid xs={6} item>
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
                <Grid xs={6} item>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={
                      <Typography variant="caption">
                        مرا به خاطر بسپار
                      </Typography>
                    }
                  />
                </Grid>

                <Grid
                  href="/shop"
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
