import { Button, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getCookie } from "cookies-next";
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

export default function UserProfile() {
  const user = useSelector((state) => state.auth.userInformation);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [info, setInfo] = useState({
    address: user.address,
  });

  const handleSetInfo = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });

    console.log(info);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    console.log(user.address);
    var urlencoded = new URLSearchParams();
    urlencoded.append("address", info.address);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-info/`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch(
          setNotificationOn({
            message: "اطلاعات شما با موفقیت تغییر پیدا کرد",
            color: "success",
          })
        )
      )
      .catch((error) => console.log("error", error));
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
            variant="h6"
            sx={{
              textAlign: "center !important",
            }}
          >
            {" "}
            اطلاعات کاربری{" "}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <RtlTextField
            size="medium"
            value={user.firstName}
            placeholder="نام"
            label="نام"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RtlTextField
            disabled
            value={user.lastName}
            size="medium"
            placeholder="نام خانوادگی"
            label="نام خانوادگی"
          />
        </Grid>

        <Grid item xs={12}>
          <RtlTextField
            label="شماره تماس"
            disabled
            value={user.phoneNumber}
            size="medium"
            type="text"
            placeholder="شماره تماس"
          />
        </Grid>
        <Grid item xs={12}>
          <RtlTextField
            onChange={handleSetInfo}
            defaultValue={info.address}
            multiline
            maxRows={4}
            minRows={4}
            name="address"
            label="آدرس"
            type="textarea"
            placeholder="آدرس"
          />
        </Grid>

        {/*  */}

        <Grid item container xs={12}>
          <Button
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
