import {
  Button,
  Grid,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  TextField,
  Box,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import PublicLayout from "../../layout";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { persianNumber } from "../../../../src/PersianDigits";
import { getCookie } from "cookies-next";
import shortUUID from "short-uuid";
import moment from "moment-jalaali";
import Link from "../../../../src/Link";
import { LoadingButton } from "@mui/lab";
import provinces from "./provinces";
import cities from "./cities";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

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
    right: "2rem !important",
    overflow: "unset",
  },
}));
function AddressSelect({ tehran, newAddress }) {
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [exactAddress, setExactAdress] = useState(null);

  const handleSetProvince = (e, value) => {
    setProvince(value);
  };

  const handleSelectCity = (e, value) => {
    setSelectedCity(value.label);
  };

  const handleSetExactAddress = (e) => {
    setExactAdress(e.target.value);
  };

  useEffect(() => {
    console.log("city", city);

    if (province !== "" && province !== null) {
      const filteredCities = cities.filter((provinceCity) => {
        return provinceCity.province_id === province.id;
      });
      setCity(filteredCities);
      setSelectedCity(filteredCities[0].label);
    }
  }, [province]);

  return (
    <Grid container>
      {tehran ? (
        ""
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <Autocomplete
              forcePopupIcon={false}
              disablePortal
              onChange={handleSetProvince}
              options={provinces}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <RtlTextField
                  {...params}
                  placeholder="انتخاب استان"
                  label={"انتخاب استان"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            {" "}
            {province !== "" && province !== null ? (
              <Autocomplete
                forcePopupIcon={false}
                disablePortal
                disabled={city == null && province == null}
                onChange={handleSelectCity}
                value={
                  selectedCity !== null && province !== null ? selectedCity : ""
                }
                options={city}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <RtlTextField {...params} label="انتخاب شهر" />
                )}
              />
            ) : (
              ""
            )}
          </Grid>
        </>
      )}

      {newAddress ? (
        <RtlTextField
          sx={{
            my: 2,
          }}
          name="newAddress"
          multiline
          minRows={3}
          maxRows={3}
          value={exactAddress}
          onChange={handleSetExactAddress}
          label="آدرس دقیق را وارد کنید"
          type="text"
        />
      ) : (
        ""
      )}

      {province !== null && exactAddress !== null && selectedCity !== null ? (
        <Typography
          sx={{
            my: 2,
          }}
          variant="body1"
        >
          {province.label + "," + selectedCity + "," + exactAddress}
        </Typography>
      ) : (
        ""
      )}
    </Grid>
  );
}

export default AddressSelect;
