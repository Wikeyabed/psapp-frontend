import {
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider,
  Box,
  Avatar,
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import { updateAddress } from "../../../redux/reducers/authSlice";
import provincesData from "./provinces.json";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Person2 } from "@mui/icons-material";


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




export default function UserProfile() {
  const user = useSelector((state) => state.auth.userInformation);
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [info, setInfo] = useState({
    province: "",
    city: "",
    detailedAddress: "",
  });

  const parseAddress = (fullAddress) => {
    if (!fullAddress) return { province: "", city: "", detailedAddress: "" };

    const parts = fullAddress.split("،").map((part) => part.trim());
    let province = "";
    let city = "";
    let detailedAddress = "";

    if (parts.length > 0) {
      province = provincesData.find((p) => parts[0] === p.label)?.label || "";
    }

    if (province && parts.length > 1) {
      const provinceData = provincesData.find((p) => p.label === province);
      city =
        provinceData?.cities.find((c) => parts[1] === c.label)?.label || "";
    }

    if (parts.length > 2) {
      detailedAddress = parts.slice(2).join("، ");
    }

    return { province, city, detailedAddress };
  };

  useEffect(() => {
    if (user?.address && isLoading) {
      const { province, city, detailedAddress } = parseAddress(user.address);
      setInfo({
        province,
        city,
        detailedAddress,
      });
      setIsLoading(false);

      if (province) {
        const selectedProvince = provincesData.find(
          (p) => p.label === province
        );
        setCities(selectedProvince?.cities || []);
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (info.province && !isLoading) {
      const selectedProvince = provincesData.find(
        (p) => p.label === info.province
      );
      setCities(selectedProvince?.cities || []);

      if (
        info.city &&
        !selectedProvince?.cities.some((c) => c.label === info.city)
      ) {
        setInfo((prev) => ({ ...prev, city: "" }));
      }
    }
  }, [info.province, isLoading]);

  const handleSetInfo = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleProvinceChange = (event) => {
    setInfo({
      ...info,
      province: event.target.value,
      city: "",
    });
  };

  const handleCityChange = (event) => {
    setInfo({
      ...info,
      city: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fullAddress =
      `${info.province}، ${info.city}، ${info.detailedAddress}`.trim();

    const myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("address", fullAddress);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-info/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(updateAddress(fullAddress));
        dispatch(
          setNotificationOn({
            message: "اطلاعات شما با موفقیت به‌روزرسانی شد",
            color: "success",
          })
        );
        setIsEditing(false);
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography variant="h6">در حال بارگذاری اطلاعات کاربری...</Typography>
      </Box>
    );
  }

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
          <Person2 fontSize="large" />
        </Avatar>
        <Typography variant="h4" fontWeight={700}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" mt={1}>
          {user.phoneNumber}
        </Typography>
      </ProfileHeader>

      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <SectionTitle variant="h5">
            <EditIcon fontSize="small" />
            اطلاعات شخصی
          </SectionTitle>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RtlTextField
                fullWidth
                label="نام"
                value={user.firstName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RtlTextField
                fullWidth
                label="نام خانوادگی"
                value={user.lastName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <RtlTextField
                fullWidth
                label="شماره تماس"
                value={user.phoneNumber}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <SectionTitle variant="h5">
            <EditIcon fontSize="small" />
            اطلاعات آدرس
          </SectionTitle>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>استان</InputLabel>
                <RtlTextField
                  select
                  value={info.province}
                  onChange={handleProvinceChange}
                  label="استان"
                  name="province"
                  disabled={!isEditing}
                >
                  <MenuItem value="">
                    <em>انتخاب استان</em>
                  </MenuItem>
                  {provincesData.map((province) => (
                    <MenuItem key={province.id} value={province.label}>
                      {province.label}
                    </MenuItem>
                  ))}
                </RtlTextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>شهر</InputLabel>
                <RtlTextField
                  select
                  value={info.city}
                  onChange={handleCityChange}
                  label="شهر"
                  name="city"
                  disabled={!info.province || !isEditing}
                >
                  <MenuItem value="">
                    <em>انتخاب شهر</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.label}>
                      {city.label}
                    </MenuItem>
                  ))}
                </RtlTextField>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <RtlTextField
                fullWidth
                multiline
                rows={4}
                label="آدرس کامل"
                value={info.detailedAddress}
                onChange={handleSetInfo}
                name="detailedAddress"
                disabled={!isEditing}
                placeholder="خیابان، کوچه، پلاک، واحد و سایر جزئیات"
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => setIsEditing(false)}
                  sx={{ borderRadius: 2, py: 2 }}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={
                    <CheckCircleIcon
                      sx={{
                        ml: 2,
                      }}
                    />
                  }
                  sx={{ borderRadius: 2, py: 2 }}
                >
                  ذخیره تغییرات
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={
                  <EditIcon
                    sx={{
                      ml: 2,
                    }}
                  />
                }
                onClick={() => setIsEditing(true)}
                sx={{ borderRadius: 2, py: 2 }}
              >
                ویرایش اطلاعات
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </ProfileContainer>
  );
}
