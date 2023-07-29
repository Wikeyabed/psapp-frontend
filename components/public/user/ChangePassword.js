import { Button, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
// @refresh reset

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginTop: 5,
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

export default function ChangePassword() {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [info, setInfo] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordR: "",
  });

  const handleSetInfo = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });

    if (event.target.name === "newPassword") {
      setInfo({
        ...info,
        [event.target.name]: event.target.value,
      });

      let regex = new RegExp("(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$");
      let result = regex.test(event.target.value);
      console.log("in passowrd", result);

      if (result) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", localStorage.getItem("token"));
    let urlencoded = new URLSearchParams();
    urlencoded.append("old_password", info.oldPassword);
    urlencoded.append("new_password", info.newPassword);
    urlencoded.append("new_password_r", info.newPasswordR);

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-password/`, requestOptions)
      .then((response) => {
        if (response.status == 201 || response.status == 200) {
          dispatch(
            setNotificationOn({
              message: "رمز عبور شما با موفقیت تغییر کرد",
              color: "success",
            })
          );

          setInfo({ oldPassword: "", newPassword: "", newPasswordR: "" });
        }
      })
      .catch((error) =>
        dispatch(
          setNotificationOn({
            message: "مشکلی رخ داده است",
            color: "error",
          })
        )
      );
  };
  return (
    <Grid container>
      <Grid item md={3}></Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={6}
        container
        sx={{
          mt: 1,
          p: 1,
        }}
        onSubmit={handleSubmit}
        component="form"
      >
        <Grid item xs={12}>
          <Typography
            letiant="h6"
            sx={{
              textAlign: "center !important",
            }}
          >
            {" "}
            تغییر رمز عبور
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <RtlTextField
            onChange={handleSetInfo}
            value={info.oldPassword}
            label="رمز عبور فعلی"
            size="medium"
            name="oldPassword"
            type="password"
            placeholder="رمز عبور فعلی"
          />
        </Grid>

        <Grid item xs={12}>
          <RtlTextField
            value={info.newPassword}
            onChange={handleSetInfo}
            label="رمز عبور جدید"
            color={isValid ? "success" : "error"}
            size="medium"
            name="newPassword"
            type="password"
            placeholder="رمز عبور جدید"
            helperText={
              !isValid
                ? "رمز عبور باید حداقل 6 کاراکتر و شامل حروف و اعداد باشد"
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <RtlTextField
            value={info.newPasswordR}
            onChange={handleSetInfo}
            label="تکرار رمز عبور جدید"
            color={info.newPassword == info.newPasswordR ? "success" : "error"}
            size="medium"
            name="newPasswordR"
            type="password"
            placeholder="تکرار رمز عبور جدید"
            helperText={
              info.password != info.newPasswordR
                ? "رمز عبور و تکرار آن باید برابر باشد"
                : ""
            }
          />
        </Grid>

        {/*  */}

        <Grid item container xs={12}>
          <Button
            disabled={!isValid || info.oldPassword == ""}
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 4 }}
            variant="contained"
          >
            اعمال تفییرات
          </Button>
        </Grid>
      </Grid>

      <Grid item md={3}></Grid>
    </Grid>
  );
}
