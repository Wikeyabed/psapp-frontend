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
  CircularProgress,
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

// ======= Styled Components =======
const ProfileContainer = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "40px auto",
  borderRadius: 12,
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  overflow: "hidden",
  backgroundColor: "#f8fafc",
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
  color: "white",
  padding: theme.spacing(1),
  textAlign: "center",
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  color: "#1e293b",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& svg": {
    color: "#6366f1",
  },
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 5,
  minWidth: "100%",
  direction: "rtl",
  textAlign: "right",
  "& label": {
    transformOrigin: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    fontSize: "0.9rem",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: "12px 24px",
  fontWeight: 600,
  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
  },
}));

const PrimaryButton = styled(ActionButton)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  "&:hover": {
    background: "linear-gradient(135deg, #5659e0, #7c51e8)",
  },
}));

const SecondaryButton = styled(ActionButton)(({ theme }) => ({
  borderColor: "#e2e8f0",
  color: "#64748b",
  "&:hover": {
    borderColor: "#94a3b8",
    backgroundColor: "#f1f5f9",
  },
}));

// ======= Main Component =======
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

  // Parse address into components
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

  // Initialize form data
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

  // Update cities when province changes
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
        <CircularProgress size={60} sx={{ color: "#6366f1" }} />
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
            color: "#6366f1",
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
          {/* Personal Information Section */}
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

          <Divider sx={{ my: 4, borderColor: "#e2e8f0" }} />

          {/* Address Information Section */}
          <SectionTitle variant="h5">
            <EditIcon fontSize="small" />
            اطلاعات آدرس
          </SectionTitle>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ textAlign: "right" }}>استان</InputLabel>
                <RtlTextField
                  select
                  value={info.province}
                  onChange={handleProvinceChange}
                  label=""
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
                <InputLabel sx={{ textAlign: "right" }}>شهر</InputLabel>
                <RtlTextField
                  select
                  value={info.city}
                  onChange={handleCityChange}
                  label=""
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

          {/* Action Buttons */}
          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            {isEditing ? (
              <>
                <SecondaryButton
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                >
                  انصراف
                </SecondaryButton>
                <PrimaryButton
                  type="submit"
                  variant="contained"
                  startIcon={
                    <CheckCircleIcon
                      sx={{
                        ml: 2,
                      }}
                    />
                  }
                >
                  ذخیره تغییرات
                </PrimaryButton>
              </>
            ) : (
              <PrimaryButton
                variant="contained"
                startIcon={
                  <EditIcon
                    sx={{
                      ml: 2,
                    }}
                  />
                }
                onClick={() => setIsEditing(true)}
              >
                ویرایش اطلاعات
              </PrimaryButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </ProfileContainer>
  );
}
