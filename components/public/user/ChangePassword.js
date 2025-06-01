import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import { fixPersianNumber } from "../../../src/toEnglishNumber";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [info, setInfo] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordR: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    newPasswordR: false,
  });

  const [isValid, setIsValid] = useState(false);
  const passwordsMatch = info.newPassword === info.newPasswordR;
  const isFormValid = isValid && passwordsMatch && info.oldPassword;

  const handleSetInfo = (event) => {
    const { name, value } = event.target;
    const fixedValue = fixPersianNumber(value);
    setInfo((prev) => ({ ...prev, [name]: fixedValue }));

    if (name === "newPassword") {
      const regex = new RegExp(
        "(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$"
      );
      setIsValid(regex.test(fixedValue));
    }
  };

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("token", getCookie("x-auth-token"));

    const body = new URLSearchParams({
      old_password: info.oldPassword,
      new_password: info.newPassword,
      new_password_r: info.newPasswordR,
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-password/`,
        {
          method: "PUT",
          headers,
          body,
        }
      );

      if (res.status === 200 || res.status === 201) {
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
    } catch (error) {
      dispatch(
        setNotificationOn({
          message: "مشکلی در ارتباط با سرور رخ داده است",
          color: "error",
        })
      );
    }
  };

  const passwordInput = (label, name, value, show, error, helperText) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={handleSetInfo}
      type={show ? "text" : "password"}
      error={!!error}
      helperText={helperText}
      sx={{ mb: 2 }}
      dir="rtl"
      InputLabelProps={{ style: { right: 20, left: "unset" } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => handleClickShowPassword(name)}>
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: isMobile ? 2 : 4 }}>
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          borderRadius: isMobile ? 2 : 4,
          p: isMobile ? 2 : 4,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Avatar sx={{ bgcolor: "#6366f1", width: 64, height: 64 }}>
            <LockIcon fontSize="large" />
          </Avatar>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
            تغییر رمز عبور
          </Typography>
          <Typography variant="body2" color="red">
            برای امنیت بیشتر، از رمز عبور قوی استفاده کنید
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          {passwordInput(
            "رمز عبور فعلی",
            "oldPassword",
            info.oldPassword,
            showPassword.oldPassword
          )}
          {passwordInput(
            "رمز عبور جدید",
            "newPassword",
            info.newPassword,
            showPassword.newPassword,
            info.newPassword && !isValid,
            info.newPassword && !isValid
              ? "رمز عبور باید حداقل ۶ کاراکتر و ترکیبی از عدد و حرف باشد"
              : ""
          )}
          {passwordInput(
            "تکرار رمز عبور جدید",
            "newPasswordR",
            info.newPasswordR,
            showPassword.newPasswordR,
            info.newPasswordR && !passwordsMatch,
            info.newPasswordR && !passwordsMatch
              ? "تکرار رمز عبور مطابقت ندارد"
              : ""
          )}

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              type="submit"
              variant="contained"
              disabled={!isFormValid}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                bgcolor: "#6366f1",
                "&:hover": { bgcolor: "#4f4fcc" },
              }}
            >
              تغییر رمز عبور
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
