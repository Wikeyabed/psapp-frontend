import {
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import { updateAddress } from "../../../redux/reducers/authSlice";
import provincesData from "./provinces.json"; // Make sure to import your provinces data

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

const RtlSelect = styled(Select)(({ theme }) => ({
  textAlign: "right",
  "& .MuiSelect-select": {
    textAlign: "right",
  },
  marginTop: 5,
  marginBottom: 5,
}));

export default function UserProfile() {
  const user = useSelector((state) => state.auth.userInformation);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [cities, setCities] = useState([]);

  // Parse existing address to extract province and city if available
  const initialAddress = user.address || "";
  const initialProvince =
    provincesData.find((p) => initialAddress.includes(p.label))?.label || "";
  const initialCity = initialProvince
    ? provincesData
        .find((p) => p.label === initialProvince)
        ?.cities.find((c) => initialAddress.includes(c.label))?.label || ""
    : "";

  const [info, setInfo] = useState({
    address: initialAddress.split("،").slice(2).join("،").trim() || "", // Remove province and city from address
    province: initialProvince,
    city: initialCity,
  });

  useEffect(() => {
    if (info.province) {
      const selectedProvince = provincesData.find(
        (p) => p.label === info.province
      );
      setCities(selectedProvince?.cities || []);
    }
  }, [info.province]);

  const handleSetInfo = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleProvinceChange = (event) => {
    const provinceName = event.target.value;
    setInfo({
      ...info,
      province: provinceName,
      city: "", // Reset city when province changes
    });

    const selectedProvince = provincesData.find(
      (p) => p.label === provinceName
    );
    setCities(selectedProvince?.cities || []);
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
      `${info.province}، ${info.city}، ${info.address}`.trim();

    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", info.address);
    urlencoded.append("city", info.city);
    urlencoded.append("province", info.province);

    var requestOptions = {
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
            message: "اطلاعات شما با موفقیت تغییر پیدا کرد",
            color: "success",
          })
        );
      })
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
            اطلاعات کاربری
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <RtlTextField
            focused
            size="medium"
            InputLabelProps={{ shrink: true }}
            value={user.firstName}
            placeholder="نام"
            label="نام"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RtlTextField
            focused
            disabled
            InputLabelProps={{ shrink: true }}
            value={user.lastName}
            size="medium"
            placeholder="نام خانوادگی"
            label="نام خانوادگی"
          />
        </Grid>

        <Grid item xs={12}>
          <RtlTextField
            focused={user.phoneNumber}
            InputLabelProps={{ shrink: true }}
            label="شماره تماس"
            disabled
            value={user.phoneNumber}
            size="medium"
            type="text"
            placeholder="شماره تماس"
          />
        </Grid>

        {/* Province and City Select Fields */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="province-label">استان</InputLabel>
            <RtlTextField
              select
              labelId="province-label"
              value={info.province}
              onChange={handleProvinceChange}
              label="استان"
              name="province"
            >
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
            <InputLabel id="city-label">شهر</InputLabel>
            <RtlTextField
              select
              labelId="city-label"
              value={info.city}
              onChange={handleCityChange}
              label="شهر"
              name="city"
              disabled={!info.province}
            >
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
            defaultValue={user.address}
            onChange={handleSetInfo}
            value={info.address}
            multiline
            maxRows={4}
            minRows={4}
            InputLabelProps={{ shrink: true }}
            name="address"
            label="آدرس کامل"
            type="textarea"
            placeholder="خیابان، کوچه، پلاک، واحد و سایر جزئیات"
          />
        </Grid>

        <Grid item container xs={12}>
          <Button
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 4 }}
            variant="contained"
          >
            اعمال تغییرات
          </Button>
        </Grid>
      </Grid>

      <Grid item md={3}></Grid>
    </Grid>
  );
}
