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
  Collapse,
  Input,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const [checked, setChecked] = useState("");

  const handleChange = (index) => {
    if (index == checked) {
      setChecked("");
    } else {
      setChecked(index);
    }
  };

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
    urlencoded.append("request_type", "2");
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
          <Card item xs={11} md={4.5}>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Grid component={Item} elevation={4} container>
                  <Grid sx={{ mb: 6 }} item xs={12}>
                    <Typography
                      textAlign={"center"}
                      sx={{ mb: 5 }}
                      variant="h5"
                    >
                      سفارش تولید
                    </Typography>{" "}
                    <Typography
                      component={"div"}
                      textAlign={"right"}
                      sx={{ mb: 3 }}
                      variant="body2"
                    >
                      شما کاربران عزیز میتوانید جهت ثبت سفارش تولید کارتن ، چاپ
                      روی چسب پهن و چاپ روی نایلون حبابدار از طریق فرم زیر اقدام
                      نمایید. سفارش شما توسط تیم پشتیبانی ایباکس بررسی شده و در
                      اسرع وقت با شما تماس گرفته می شود.
                    </Typography>
                    <Box
                      onClick={() => handleChange("box")}
                      sx={{
                        my: 2,
                        background:
                          "linear-gradient(to bottom, #2F2235, #543d5e , #7B6D8D )",
                        color: "#fff",
                        p: 1,
                        borderRadius: "10px",
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        سفارش تولید کارتن
                      </Typography>
                      <span
                        style={{
                          position: "absolute",
                          left: "5px",
                          top: "5px",
                          color: "#000",
                          borderRadius: "20px",
                          cursor: "pointer",
                          width: 50,
                          textAlign: "center",
                        }}
                      >
                        {checked === "box" ? (
                          <ExpandLessIcon
                            color="warning"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        ) : (
                          <ExpandMoreIcon
                            color="warning"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        )}
                      </span>
                    </Box>
                    <Collapse orientation="vertical" in={checked === "box"}>
                      {" "}
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3, color: "primary.main" }}
                        variant="body1"
                      >
                        {" "}
                        لطفا توجه داشته باشید، تولید کارتن مخصوص کارخانه جات ،
                        تولیدی ها و .... بوده و سفارشات تولید کم پذیرفته نمیشود.
                      </Typography>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3 }}
                        variant="body1"
                      >
                        {" "}
                        برای ثبت صحیح سفارش تولید کارتن اطلاعاتی نظیر:{" "}
                      </Typography>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3 }}
                        variant="body2"
                      >
                        ابعاد کارتن: طول عرض ارتفاع
                        <br />
                        تعداد لایه: 3 لایه 5 لایه
                        <br />
                        وضعیت چاپ: چاپدار و بدون چاپ
                        <br />
                        <br />
                        <Typography
                          component={"div"}
                          textAlign={"right"}
                          sx={{ mb: 3 }}
                          variant="body1"
                        >
                          را در بخش توضیحات وارد نمایید.
                        </Typography>
                      </Typography>
                    </Collapse>
                    {/* <Divider
                      sx={{
                        my: 1,
                      }}
                    /> */}
                    <Box
                      onClick={() => handleChange("tape")}
                      sx={{
                        my: 2,
                        background:
                          "linear-gradient(to bottom, #2F2235, #543d5e , #7B6D8D )",
                        color: "#fff",
                        p: 1,
                        borderRadius: "10px",
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        سفارش چاپ روی چسب پهن
                      </Typography>
                      <span
                        style={{
                          position: "absolute",
                          left: "5px",
                          top: "5px",
                          color: "#000",
                          borderRadius: "20px",
                          cursor: "pointer",
                          width: 50,
                          textAlign: "center",
                        }}
                      >
                        {checked === "tape" ? (
                          <ExpandLessIcon
                            color="warning"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        ) : (
                          <ExpandMoreIcon
                            color="warning"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        )}
                      </span>
                    </Box>
                    <Collapse orientation="vertical" in={checked === "tape"}>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3, color: "primary.main" }}
                        variant="body1"
                      >
                        لطفا توجه داشته باشید، حداقل سفارش چاپ 1 رنگ روی چسب پهن
                        180 حلقه می باشد و سفارشات چاپ 2 رنگ و 3 رنگ حداقل 2000
                        حلقه می باشد.
                      </Typography>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3 }}
                        variant="body1"
                      >
                        {" "}
                        برای ثبت صحیح سفارش چاپ روی چسب پهن اطلاعاتی نظیر:{" "}
                      </Typography>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3 }}
                        variant="body2"
                      >
                        تعداد رنگ چاپ: مثال: 3 رنگ <br />
                        تعداد:مثال: 180 حلقه
                        <br />
                        رنگ یا رنگ های مورد نظر: مثال: قرمز-آبی-مشکی <br />
                        <br />
                        <Typography
                          component={"div"}
                          textAlign={"right"}
                          sx={{ mb: 3 }}
                          variant="body1"
                        >
                          را در بخش توضیحات وارد نمایید.
                        </Typography>{" "}
                      </Typography>
                    </Collapse>
                    {/* <Divider
                      sx={{
                        my: 1,
                      }}
                    /> */}
                    <Box
                      onClick={() => handleChange("bubble")}
                      sx={{
                        my: 2,
                        background:
                          "linear-gradient(to bottom, #2F2235, #543d5e , #7B6D8D )",
                        color: "#fff",
                        p: 1,
                        borderRadius: "10px",
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        سفارش چاپ روی نایلون حبابدار{" "}
                      </Typography>
                      <span
                        style={{
                          position: "absolute",
                          left: "5px",
                          top: "5px",
                          color: "#000",
                          borderRadius: "20px",
                          cursor: "pointer",
                          width: 50,
                          textAlign: "center",
                        }}
                      >
                        {checked === "bubble" ? (
                          <ExpandLessIcon
                            color="warning"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        ) : (
                          <ExpandMoreIcon
                            color="warning"
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        )}
                      </span>
                    </Box>
                    <Collapse orientation="vertical" in={checked === "bubble"}>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3, color: "primary.main" }}
                        variant="body1"
                      >
                        لطفا توجه داشته باشید، حداقل سفارش چاپ روی نایلون
                        حبابدار 500 کیلوگرم می باشد.
                      </Typography>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3 }}
                        variant="body1"
                      >
                        {" "}
                        برای ثبت صحیح سفارش چاپ روی نایلون حبابدار اطلاعاتی
                        نظیر:{" "}
                      </Typography>
                      <Typography
                        component={"div"}
                        textAlign={"right"}
                        sx={{ mb: 3 }}
                        variant="body2"
                      >
                        تعداد رنگ چاپ: مثال: 3 رنگ <br />
                        مقدار :مثال: 500 کیلوگرم <br />
                        رنگ یا رنگ های مورد نظر: مثال: قرمز-آبی-مشکی <br />
                        <br />
                        <Typography
                          component={"div"}
                          textAlign={"right"}
                          sx={{ mb: 3 }}
                          variant="body1"
                        >
                          را در بخش توضیحات وارد نمایید.
                        </Typography>
                      </Typography>
                    </Collapse>
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
