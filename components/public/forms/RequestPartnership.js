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
} from "@mui/material";
import Link from "../../../src/Link";

import {
  startProgress,
  endProgress,
} from "../../../redux/reducers/loadingSlice";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import PublicLayout from "../layout/index";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",

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

function RequestPartnership() {
  const dispatch = useDispatch();

  const [formInfo, setFormInfo] = useState({
    phoneNumber: "",
    title: "",
    description: "",
    name: "",
  });

  const [isValid, setIsValid] = useState(true);

  const handlePhoneNumber = (event) => {
    setFormInfo({ ...formInfo, phoneNumber: event.target.value });
    let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    let result = regex.test(event.target.value);

    if (result) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSetData = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("person_name", formInfo.name);
    urlencoded.append("request_type", "1");
    urlencoded.append("request_title", formInfo.title);
    urlencoded.append("request_description", formInfo.description);
    urlencoded.append("phone_number", formInfo.phoneNumber);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/requests/add`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(
          setNotificationOn({
            message: "درخواست شما با موفقیت ارسال شد",
            color: "info",
          })
        );
        setFormInfo({
          phoneNumber: "",
          title: "",
          description: "",
          name: "",
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <PublicLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Card item xs={11} md={3.5}>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Grid component={Item} elevation={4} container>
                  <Grid sx={{ mb: 6 }} item xs={12}>
                    <Typography
                      textAlign={"center"}
                      sx={{ mb: 5 }}
                      variant="h5"
                    >
                      فرم درخواست همکاری
                    </Typography>

                    <RtlTextField
                      value={formInfo.phoneNumber}
                      required
                      fullWidth
                      onChange={handlePhoneNumber}
                      label="شماره تماس"
                    />
                    <RtlTextField
                      value={formInfo.name}
                      required
                      name="name"
                      fullWidth
                      onChange={handleSetData}
                      label="نام و نام خانوادگی"
                      type="text"
                    />
                    <RtlTextField
                      value={formInfo.title}
                      required
                      name="title"
                      fullWidth
                      onChange={handleSetData}
                      label="موضوع"
                      type="text"
                    />

                    <RtlTextField
                      value={formInfo.description}
                      required
                      name="description"
                      multiline
                      minRows={10}
                      fullWidth
                      onChange={handleSetData}
                      label="توضیحات"
                      type="text"
                    />
                  </Grid>

                  <Grid xs={12} item>
                    <Button
                      disabled={
                        !isValid ||
                        formInfo.title == "" ||
                        formInfo.description == ""
                      }
                      sx={{ p: 1 }}
                      fullWidth
                      type="submit"
                      variant="contained"
                    >
                      ثبت درخواست
                    </Button>
                  </Grid>
                </Grid>
              </FormGroup>
            </form>
          </Card>
        </Grid>
      </Box>
    </PublicLayout>
  );
}

export default RequestPartnership;
