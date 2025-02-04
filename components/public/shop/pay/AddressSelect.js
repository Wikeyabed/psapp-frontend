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
    if (province !== "" && province !== null) {
      const filteredCities = cities.filter((provinceCity) => {
        return provinceCity.province_id === province.id;
      });
      setCity(filteredCities);
      setSelectedCity(filteredCities[0].label);
      passTheAddress(province.label + "," + selectedCity + "," + exactAddress);
    } else {
      passTheAddress(exactAddress);
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
              disabled={isFinal}
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
