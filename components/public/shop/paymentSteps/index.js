import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  MenuItem,
  Box,
  FormControl,
  FormLabel,
  Select,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import provincesData from "./provinces.json"; // Adjust path to your JSON file
import styled from "@emotion/styled";
const steps = [
  "روش دریافت محصول",
  "زمان دریافت محصول",
  "آدرس کاربر",
  "نهایی سازی فاکتور",
];

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
export default function PaymentStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setCity("");
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">روش دریافت را انتخاب کنید</FormLabel>
            <RadioGroup
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <FormControlLabel
                value="shipping"
                control={<Radio />}
                label="ارسال پستی"
              />
              <FormControlLabel
                value="in-person"
                control={<Radio />}
                label="دریافت حضوری"
              />
              <FormControlLabel
                value="posting"
                control={<Radio />}
                label="ارسال با پیک"
              />
            </RadioGroup>
          </FormControl>
        );
      case 1:
        return (
          <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <DatePicker
              label="تاریخ دریافت را انتخاب کنید"
              value={deliveryDate}
              onChange={setDeliveryDate}
              renderInput={(params) => <RtlTextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        );
      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Select
              value={province}
              onChange={handleProvinceChange}
              displayEmpty
              inputProps={{ "aria-label": "انتخاب استان" }}
            >
              <MenuItem value="" disabled>
                استان را انتخاب کنید
              </MenuItem>
              {provincesData.map((province) => (
                <MenuItem key={province.id} value={province.label}>
                  {province.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!province}
              displayEmpty
            >
              <MenuItem value="" disabled>
                شهر را انتخاب کنید
              </MenuItem>
              {province &&
                provincesData
                  .find((p) => p.label === province)
                  ?.cities.map((city) => (
                    <MenuItem key={city.id} value={city.label}>
                      {city.label}
                    </MenuItem>
                  ))}
            </Select>

            <RtlTextField
              label="آدرس کامل"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              multiline
              rows={4}
            />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: "right" }}>
            <Typography>
              روش دریافت:{" "}
              {
                {
                  shipping: "ارسال پستی",
                  "in-person": "دریافت حضوری",
                  posting: "ارسال با پیک",
                }[deliveryMethod]
              }
            </Typography>
            <Typography>
              تاریخ دریافت: {deliveryDate?.toLocaleDateString("fa-IR")}
            </Typography>
            <Typography>استان: {province}</Typography>
            <Typography>شهر: {city}</Typography>
            <Typography>آدرس: {address}</Typography>
          </Box>
        );
      default:
        return "مرحله ناشناخته";
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                mr: 2,
                p: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4, mb: 2 }}>{getStepContent(activeStep)}</Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          position: "absolute",
          bottom: 0,
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="contained"
        >
          قبلی
        </Button>

        <Button
          variant="contained"
          onClick={
            activeStep === steps.length - 1
              ? () => (window.location.href = "/payment")
              : handleNext
          }
        >
          {activeStep === steps.length - 1 ? "پرداخت" : "بعدی"}
        </Button>
      </Box>
    </div>
  );
}
