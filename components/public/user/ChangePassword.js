import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import { getCookie } from "cookies-next";
import { fixPersianNumber } from "../../../src/toEnglishNumber";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ProfileContainer = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "40px auto",
  borderRadius: 12,
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  overflow: "hidden",
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  textAlign: "center",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 5,
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
  },
}));


export default function ChangePassword() {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    newPasswordR: false,
  });
  const [info, setInfo] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordR: "",
  });

  const handleClickShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSetInfo = (event) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: fixPersianNumber(value),
    });

    if (name === "newPassword") {
      const regex = new RegExp(
        "(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$"
      );
      setIsValid(regex.test(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", getCookie("x-auth-token"));

    const urlencoded = new URLSearchParams();
    urlencoded.append("old_password", info.oldPassword);
    urlencoded.append("new_password", info.newPassword);
    urlencoded.append("new_password_r", info.newPasswordR);

    const requestOptions = {
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
        } else {
          dispatch(
            setNotificationOn({
              message: "رمز عبور فعلی نادرست است",
              color: "error",
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setNotificationOn({
            message: "مشکلی در ارتباط با سرور رخ داده است",
            color: "error",
          })
        );
      });
  };

  const passwordsMatch = info.newPassword === info.newPasswordR;
  const isFormValid = isValid && passwordsMatch && info.oldPassword;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto 16px",
            backgroundColor: "white",
            color: "primary.main",
          }}
        >
          <LockIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" fontWeight={700}>
          تغییر رمز عبور
        </Typography>
        <Typography variant="subtitle1" mt={1}>
          برای امنیت حساب خود، رمز عبور قوی انتخاب کنید
        </Typography>
      </ProfileHeader>

      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <SectionTitle variant="h5">
            <LockIcon fontSize="small" />
            تنظیمات امنیتی
          </SectionTitle>

          <RtlTextField
            fullWidth
            label="رمز عبور فعلی"
            value={info.oldPassword}
            onChange={handleSetInfo}
            name="oldPassword"
            type={showPassword.oldPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("oldPassword")}
                    edge="end"
                  >
                    {showPassword.oldPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RtlTextField
            fullWidth
            label="رمز عبور جدید"
            value={info.newPassword}
            onChange={handleSetInfo}
            name="newPassword"
            type={showPassword.newPassword ? "text" : "password"}
            error={info.newPassword && !isValid}
            helperText={
              info.newPassword && !isValid
                ? "رمز عبور باید حداقل 6 کاراکتر و شامل حروف و اعداد باشد"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("newPassword")}
                    edge="end"
                  >
                    {showPassword.newPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RtlTextField
            fullWidth
            label="تکرار رمز عبور جدید"
            value={info.newPasswordR}
            onChange={handleSetInfo}
            name="newPasswordR"
            type={showPassword.newPasswordR ? "text" : "password"}
            error={info.newPasswordR && !passwordsMatch}
            helperText={
              info.newPasswordR && !passwordsMatch
                ? "رمز عبور و تکرار آن باید یکسان باشند"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("newPasswordR")}
                    edge="end"
                  >
                    {showPassword.newPasswordR ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              تغییر رمز عبور
            </Button>
          </Box>
        </Box>
      </CardContent>
    </ProfileContainer>
  );
}
