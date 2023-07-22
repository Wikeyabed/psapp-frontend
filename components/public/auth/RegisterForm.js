/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import * as persianRex from "persian-rex";

import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormGroup,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Link from "../../../src/Link";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  // display: "block",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    overflow: "unset",
  },
}));

function RegisterForm() {
  const dispatch = useDispatch();

  const [RegisterInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    passwordR: "",
    firstName: "",
    lastName: "",
    address: "",
  });

  const [isValid, setIsValid] = useState({
    password: false,
    email: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSetValue = (event) => {
    if (event.target.name === "password") {
      setRegisterInfo({
        ...RegisterInfo,
        [event.target.name]: event.target.value,
      });

      let regex = new RegExp("(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$");
      let result = regex.test(event.target.value);
      console.log("in passowrd", result);

      if (result) {
        setIsValid({ ...isValid, [event.target.name]: true });
      } else {
        setIsValid({ ...isValid, [event.target.name]: false });
      }
    } else if (event.target.name === "email") {
      setRegisterInfo({
        ...RegisterInfo,
        email: event.target.value,
      });
      let emailRegEx = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      let emailResult = emailRegEx.test(event.target.value);
      console.log("in email", emailResult);

      if (emailResult) {
        setIsValid({ ...isValid, [event.target.name]: true });
      } else {
        setIsValid({ ...isValid, [event.target.name]: false });
      }
    }

    // else if (
    //   event.target.name == "firstName" ||
    //   event.target.name == "lastName"
    // ) {
    //   if (persianRex.text.test(event.target.value)) {
    //     setRegisterInfo({
    //       ...RegisterInfo,
    //       [event.target.name]: event.target.value,
    //     });
    //   } else {
    //   }

    //   console.log(RegisterInfo);
    //   // }
    else {
      setRegisterInfo({
        ...RegisterInfo,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(startProgress());
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    urlencoded.append("phone_number", RegisterInfo.phoneNumber);
    urlencoded.append("password", RegisterInfo.password);
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
                    ثـبـت نــام
                  </Typography>

                  <RtlTextField
                    value={RegisterInfo.email}
                    required
                    name="email"
                    color={isValid.email ? "success" : ""}
                    error={!isValid.email && RegisterInfo.email.length > 0}
                    fullWidth
                    onChange={handleSetValue}
                    label="ایمیل"
                    helperText={
                      !isValid.email && RegisterInfo.email.length > 0
                        ? "لطفا ایمیل معتبر وارد کنید"
                        : ""
                    }
                  />
                  <RtlTextField
                    value={RegisterInfo.password}
                    required
                    error={
                      !isValid.password && RegisterInfo.password.length > 0
                    }
                    color={isValid.password ? "success" : ""}
                    name="password"
                    fullWidth
                    onChange={handleSetValue}
                    label="رمز عبور"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      !isValid.password && RegisterInfo.email.length > 0
                        ? "رمز عبور باید حداقل 6 کاراکتر و شامل حروف و اعداد باشد"
                        : ""
                    }
                  />

                  <RtlTextField
                    value={RegisterInfo.passwordR}
                    error={RegisterInfo.password != RegisterInfo.passwordR}
                    color={
                      RegisterInfo.password == RegisterInfo.passwordR
                        ? "success"
                        : ""
                    }
                    required
                    name="passwordR"
                    fullWidth
                    onChange={handleSetValue}
                    label="تکرار رمز عبور"
                    type={showPassword ? "text" : "password"}
                    helperText={
                      RegisterInfo.password == RegisterInfo.passwordR
                        ? ""
                        : "تکرار رمز عبور اشتباه میباشد"
                    }
                  />
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <RtlTextField
                        value={RegisterInfo.firstName}
                        required
                        name="firstName"
                        fullWidth
                        onChange={handleSetValue}
                        label="نام"
                        type="text"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <RtlTextField
                        value={RegisterInfo.lastName}
                        required
                        name="lastName"
                        fullWidth
                        onChange={handleSetValue}
                        label="نام خانوادگی"
                        type="text"
                      />
                    </Grid>
                  </Grid>

                  <RtlTextField
                    value={RegisterInfo.address}
                    required
                    name="address"
                    multiline
                    minRows={4}
                    fullWidth
                    onChange={handleSetValue}
                    label="آدرس"
                    type="text"
                  />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    disabled={!isValid.password && isValid.email}
                    sx={{ p: 1 }}
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    ثبت نام
                  </Button>
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
            </FormGroup>
          </form>
        </Card>
      </Grid>
    </Box>
  );
}

export default RegisterForm;
