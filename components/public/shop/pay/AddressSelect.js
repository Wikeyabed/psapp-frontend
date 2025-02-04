import { Grid, Typography, TextField, Autocomplete } from "@mui/material";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

import provinces from "./provinces";
import cities from "./cities";

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

function AddressSelect({ tehran, newAddress, passTheAddress, isFinal }) {
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [exactAddress, setExactAddress] = useState("");

  useEffect(() => {
    if (province) {
      const filteredCities = cities.filter(
        (provinceCity) => provinceCity.province_id === province.id
      );
      setCity(filteredCities);
      setSelectedCity(null); // Reset selected city when province changes
    }
  }, [province]);

  useEffect(() => {
    if (province && selectedCity && exactAddress) {
      const fullAddress = `${province.label}, ${selectedCity.label}, ${exactAddress}`;
      passTheAddress(fullAddress);
    }
  }, [province, selectedCity, exactAddress, passTheAddress]);

  const handleSetProvince = (e, value) => {
    setProvince(value);
  };

  const handleSelectCity = (e, value) => {
    setSelectedCity(value);
  };

  const handleSetExactAddress = (e) => {
    setExactAddress(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      {!tehran && (
        <>
          <Grid item xs={12} md={6}>
            <Autocomplete
              forcePopupIcon={false}
              disablePortal
              disabled={isFinal}
              onChange={handleSetProvince}
              options={provinces}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <RtlTextField
                  {...params}
                  placeholder="انتخاب استان"
                  label="انتخاب استان"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            {province && (
              <Autocomplete
                forcePopupIcon={false}
                disablePortal
                disabled={isFinal}
                onChange={handleSelectCity}
                value={selectedCity}
                options={city}
                getOptionLabel={(option) => option.label}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <RtlTextField {...params} label="انتخاب شهر" />
                )}
              />
            )}
          </Grid>
        </>
      )}

      {newAddress && (
        <Grid item xs={12}>
          <RtlTextField
            sx={{ my: 2 }}
            name="newAddress"
            multiline
            minRows={3}
            maxRows={3}
            value={exactAddress}
            onChange={handleSetExactAddress}
            label="آدرس دقیق را وارد کنید"
            type="text"
          />
        </Grid>
      )}

      {province && selectedCity && exactAddress && (
        <Grid item xs={12}>
          <Typography variant="body1">
            {`${province.label}, ${selectedCity.label}, ${exactAddress}`}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default AddressSelect;
