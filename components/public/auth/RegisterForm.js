import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  MenuItem,
  // InputLabel,
} from "@mui/material";
import Link from "../../../src/Link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { userLogin } from "../../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import { setCookie } from "cookies-next";
import { fixPersianNumber } from "../../../src/toEnglishNumber";
import SimpleBottomNavigation from "../layout/navbar/BottomNav";
import provincesData from "./provinces.json";

// استایل‌های سفارشی
const RegisterContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: 0,

  // فقط در دسکتاپ عرض را 100vw کنیم
  [theme.breakpoints.up("md")]: {
    width: "45vw",
    maxWidth: "100vw", // override محدودیت MUI Container
  },
}));

const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  padding: "30px 20px",
  textAlign: "center",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px",
  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.2)",
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "10px",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: "30px 20px",
  marginTop: "-20px",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: "0 5px 25px rgba(0, 0, 0, 0.08)",
  position: "relative",
  zIndex: 1,
  flexGrow: 1,
}));

const StepsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px",
  gap: "10px",
}));

const Step = styled(Box)(({ theme, active }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: active ? "#6366f1" : "#e5e7eb",
  color: active ? "white" : "#9ca3af",
  fontWeight: "bold",
}));

const StepLine = styled(Box)(({ theme }) => ({
  height: "2px",
  backgroundColor: "#e5e7eb",
  flexGrow: 1,
  marginTop: "14px",
}));

const FormGroup = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
}));

const InputLabel = styled(Typography)(({ theme }) => ({
  display: "block",
  marginBottom: "8px",
  fontWeight: 500,
  color: "#4b5563",
}));

const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    "& input": {
      padding: "15px",
    },
  },
}));

const SelectField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    textAlign: "right",
  },
  "& .MuiSelect-select": {
    textAlign: "right",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "15px",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
  },
}));

const ActionLink = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "14px",
  textAlign: "center",
  marginTop: "16px",
  borderRadius: "12px",
  color: "#06b6d4",
  border: "2px solid #06b6d4",
  padding: "8px 16px",
  fontWeight: 600,
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "20px",
  color: "#9ca3af",
  fontSize: "0.8rem",
}));

function RegisterForm() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const phone_number = useSelector((state) => state.auth.tempSmsNumber);

  const [RegisterInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    passwordR: "",
    firstName: "",
    lastName: "",
    address: "",
    province: "",
    city: "",
  });

  const [isValid, setIsValid] = useState({
    password: false,
    email: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState([]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleProvinceChange = (event) => {
    const provinceName = event.target.value;
    setRegisterInfo({
      ...RegisterInfo,
      province: provinceName,
      city: "",
    });

    const selectedProvince = provincesData.find(
      (p) => p.label === provinceName
    );
    setCities(selectedProvince?.cities || []);
  };

  const handleCityChange = (event) => {
    setRegisterInfo({
      ...RegisterInfo,
      city: event.target.value,
    });
  };

  const handleSetValue = (event) => {
    if (event.target.name === "password") {
      setRegisterInfo({
        ...RegisterInfo,
        [event.target.name]: fixPersianNumber(event.target.value),
      });

      let regex = new RegExp("(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$");
      let result = regex.test(event.target.value);

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

      if (emailResult) {
        setIsValid({ ...isValid, [event.target.name]: true });
      } else {
        setIsValid({ ...isValid, [event.target.name]: false });
      }
    } else {
      setRegisterInfo({
        ...RegisterInfo,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, firstName, lastName, address, province, city } =
      RegisterInfo;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("first_name", firstName);
    urlencoded.append("last_name", lastName);
    urlencoded.append("password", password);
    urlencoded.append("phone_number", phone_number);
    urlencoded.append("gender", "male");
    urlencoded.append("address", `${province}، ${city}، ${address}`);
    urlencoded.append("shopping_list_id", "{}");
    urlencoded.append("refer", id);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      requestOptions
    )
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          res.json().then((data) => {
            dispatch(
              setNotificationOn({
                message: "ثبت نام با موفقیت انجام شد",
                color: "info",
              })
            );
            router.push("/auth/login");
          });
        } else {
          res.json().then((res) =>
            dispatch(
              setNotificationOn({
                message: "اطلاعات وارد شده در سیستم تکراری می‌باشد",
                color: "error",
              })
            )
          );
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SimpleBottomNavigation />
      </Box>

      <RegisterContainer>
        <Header>
          <Logo>به ایباکس خوش آمدید</Logo>
          <Typography variant="h6">ثبت نام - مرحله ۳ از ۳</Typography>
        </Header>

        <FormContainer>
          <StepsContainer>
            <Step active={false}>۱</Step>
            <StepLine />
            <Step active={false}>۲</Step>
            <StepLine />
            <Step active={true}>۳</Step>
          </StepsContainer>

          <form onSubmit={handleSubmit}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/logo3.png`}
                alt="لوگوی فروشگاه"
                width={0}
                height={0}
                sizes="150px"
                style={{
                  width: "150px",
                  height: "auto",
                  borderRadius: "12px",
                }}
              />
            </Box>

            <FormGroup>
              <InputLabel>رمز عبور</InputLabel>
              <InputField
                fullWidth
                name="password"
                value={RegisterInfo.password}
                onChange={handleSetValue}
                type={showPassword ? "text" : "password"}
                error={!isValid.password && RegisterInfo.password.length > 0}
                helperText={
                  !isValid.password
                    ? "رمز عبور باید حداقل 6 کاراکتر و شامل حروف و اعداد باشد"
                    : ""
                }
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
              />
            </FormGroup>

            <FormGroup>
              <InputLabel>تکرار رمز عبور</InputLabel>
              <InputField
                fullWidth
                name="passwordR"
                value={RegisterInfo.passwordR}
                onChange={handleSetValue}
                type="password"
                error={
                  RegisterInfo.password !== RegisterInfo.passwordR &&
                  RegisterInfo.passwordR.length > 0
                }
                helperText={
                  RegisterInfo.password !== RegisterInfo.passwordR
                    ? "تکرار رمز عبور مطابقت ندارد"
                    : ""
                }
              />
            </FormGroup>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <InputLabel>نام</InputLabel>
                  <InputField
                    fullWidth
                    name="firstName"
                    value={RegisterInfo.firstName}
                    onChange={handleSetValue}
                    required
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <InputLabel>نام خانوادگی</InputLabel>
                  <InputField
                    fullWidth
                    name="lastName"
                    value={RegisterInfo.lastName}
                    onChange={handleSetValue}
                    required
                  />
                </FormGroup>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <InputLabel>استان</InputLabel>
                  <SelectField
                    select
                    fullWidth
                    value={RegisterInfo.province}
                    onChange={handleProvinceChange}
                    required
                  >
                    {provincesData.map((province) => (
                      <MenuItem key={province.id} value={province.label}>
                        {province.label}
                      </MenuItem>
                    ))}
                  </SelectField>
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <InputLabel>شهر</InputLabel>
                  <SelectField
                    select
                    fullWidth
                    value={RegisterInfo.city}
                    onChange={handleCityChange}
                    disabled={!RegisterInfo.province}
                    required
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.label}>
                        {city.label}
                      </MenuItem>
                    ))}
                  </SelectField>
                </FormGroup>
              </Grid>
            </Grid>

            <FormGroup>
              <InputLabel>آدرس کامل</InputLabel>
              <InputField
                fullWidth
                multiline
                minRows={4}
                name="address"
                value={RegisterInfo.address}
                onChange={handleSetValue}
                placeholder="خیابان، کوچه، پلاک، واحد و سایر جزئیات"
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={
                !isValid.password ||
                RegisterInfo.password !== RegisterInfo.passwordR ||
                !RegisterInfo.province ||
                !RegisterInfo.city
              }
            >
              ثبت نام
            </SubmitButton>

            <Link href="/" passHref>
              <ActionLink sx={{ mt: 2 }}>بازگشت به فروشگاه</ActionLink>
            </Link>

            <Typography sx={{ textAlign: "center", mt: 2 }}>
              حساب کاربری دارید؟{" "}
              <Link href="/auth/login" style={{ color: "#6366f1" }}>
                وارد شوید
              </Link>
            </Typography>
          </form>
        </FormContainer>

        <Footer>کلیه حقوق برای فروشگاه اینترنتی ایباکس محفوظ است © 1404</Footer>
      </RegisterContainer>
    </>
  );
}

export default RegisterForm;
