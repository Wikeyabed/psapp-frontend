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
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
} from "@mui/material";
import Link from "../../../src/Link";

import { userLogin } from "../../../redux/reducers/authSlice";
import {
  startProgress,
  endProgress,
} from "../../../redux/reducers/loadingSlice";
import { useDispatch } from "react-redux";

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

  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: "",
    password: "",
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

  const handlePassword = (event) => {
    setLoginInfo({ ...loginInfo, password: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(startProgress());
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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      requestOptions
    ).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          console.log(data);

          // set token to local storage
          localStorage.setItem("token", data.token);

          dispatch(
            userLogin({
              firstName: data.user.first_name,
              lastName: data.user.last_name,
              phoneNumber: data.user.phone_number,
              address: data.user.address,
              email: data.user.email,
              refer: data.user.refer,
              invoiceIds: data.user.invoices_id,
              shoppingCartIds: data.user.shopping_list_id,
            })
          );
        });

        dispatch(endProgress());
      } else {
        res.text("error");
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Card item xs={10} md={3}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Grid component={Item} elevation={4} container>
                <Grid sx={{ mb: 6 }} item xs={12}>
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
