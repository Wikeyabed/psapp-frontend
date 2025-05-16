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
  Paper,
  Divider,
  useTheme
} from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import provincesData from "./provinces.json";
import styled from "@emotion/styled";

const steps = [
  "روش دریافت محصول",
  "زمان دریافت محصول",
  "آدرس کاربر",
  "نهایی سازی فاکتور",
];

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: theme.palette.text.secondary,
    "&.Mui-active": {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
    "&.Mui-completed": {
      color: theme.palette.success.main,
    },
  },
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  minWidth: "100%",
  direction: "rtl",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: "12px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: "1px",
  },
}));

const DeliveryOptionCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: "12px",
  backgroundColor: selected ? theme.palette.primary.light + "20" : theme.palette.background.paper,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
  },
}));

const AddressBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(2),
}));

export default function PaymentStepper() {
  const theme = useTheme();
  const userData = useSelector((state) => state.auth.userInformation);
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("in-person");
  const [date, setDate] = useState(moment().unix());
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("registered");

  const handleNext = () => {
    if (activeStep === 2) {
      if (addressType === "new" && (!province || !city || !address)) {
        alert("لطفا تمامی فیلدهای آدرس جدید را پر کنید");
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setCity("");
  };

  function handleChangeDate(value) {
    setDate(value.unix);
  }

  const deliveryMethods = [
    {
      value: "in-person",
      label: "تحویل حضوری سفارش از انبار ایباکس",
      description: "مراجعه به آدرس انبار در ساعات کاری"
    },
    {
      value: "posting",
      label: "ارسال از طریق پست ایران",
      description: "تحویل درب منزل در 3-5 روز کاری"
    },
    {
      value: "snap",
      label: "ارسال از طریق اسنپ و تپسی (تهران و کرج)",
      description: "تحویل در همان روز (فقط تهران و کرج)"
    },
    {
      value: "shipping",
      label: "ارسال از طریق باربری (سراسر ایران عزیز)",
      description: "تحویل در 2-4 روز کاری در سراسر کشور"
    }
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, mb: 3 }}>
              لطفا روش دریافت محصول خود را انتخاب کنید
            </Typography>
            <RadioGroup
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              {deliveryMethods.map((method) => (
                <DeliveryOptionCard 
                  key={method.value} 
                  selected={deliveryMethod === method.value}
                  onClick={() => setDeliveryMethod(method.value)}
                >
                  <FormControlLabel
                    value={method.value}
                    control={<Radio color="primary" />}
                    label={
                      <Box>
                        <Typography fontWeight={600}>{method.label}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {method.description}
                        </Typography>
                      </Box>
                    }
                    sx={{ width: "100%", alignItems: "flex-start" }}
                  />
                </DeliveryOptionCard>
              ))}
            </RadioGroup>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: theme.palette.error.main, mb: 3 }}>
              توجه: ارسال سفارشات در روزهای جمعه امکان پذیر نمی باشد
            </Typography>
            <Box sx={{ 
              display: "inline-block",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "12px",
              p: 1,
              backgroundColor: theme.palette.background.paper
            }}>
              <DatePicker
                placeholder="انتخاب تاریخ تحویل"
                mapDays={({ date }) => {
                  let isWeekend = [6].includes(date.weekDay.index);
                  if (isWeekend)
                    return {
                      disabled: true,
                      style: { color: theme.palette.error.main },
                    };
                }}
                weekStartDayIndex={7}
                highlightToday={true}
                style={{
                  textAlign: "center",
                  padding: "16px",
                  minWidth: 250,
                  fontSize: "1rem",
                }}
                minDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
                maxDate={new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)}
                defaultValue={Date.now()}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-left"
                onChange={handleChangeDate}
                disableDay={(date) => date.weekDay.index === 6}
              />
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
              تاریخ انتخابی شما: {moment.unix(date).format("jYYYY/jMM/jDD")}
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, mb: 3 }}>
              اطلاعات آدرس تحویل
            </Typography>
            
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 1, color: theme.palette.text.primary }}>
                نوع آدرس
              </FormLabel>
              <RadioGroup
                value={addressType}
                onChange={(e) => {
                  setAddressType(e.target.value);
                  if (e.target.value === "new") {
                    setProvince("");
                    setCity("");
                    setAddress("");
                  }
                }}
                row
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value="registered"
                  control={<Radio color="primary" />}
                  label="آدرس ثبت شده"
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    backgroundColor: addressType === "registered" ? 
                      theme.palette.primary.light + "20" : "transparent",
                    border: `1px solid ${addressType === "registered" ? 
                      theme.palette.primary.main : theme.palette.divider}`
                  }}
                />
                <FormControlLabel
                  value="new"
                  control={<Radio color="primary" />}
                  label="آدرس جدید"
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    backgroundColor: addressType === "new" ? 
                      theme.palette.primary.light + "20" : "transparent",
                    border: `1px solid ${addressType === "new" ? 
                      theme.palette.primary.main : theme.palette.divider}`
                  }}
                />
              </RadioGroup>
            </FormControl>

            {addressType === "registered" ? (
              <AddressBox>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  آدرس ثبت شده شما:
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {userData.address || "شما آدرس ثبت شده ای ندارید"}
                </Typography>
              </AddressBox>
            ) : (
              <>
                <StyledSelect
                  value={province}
                  onChange={handleProvinceChange}
                  displayEmpty
                  inputProps={{ "aria-label": "انتخاب استان" }}
                >
                  <MenuItem value="" disabled>
                    <em>استان را انتخاب کنید</em>
                  </MenuItem>
                  {provincesData.map((province) => (
                    <MenuItem key={province.id} value={province.label}>
                      {province.label}
                    </MenuItem>
                  ))}
                </StyledSelect>

                <StyledSelect
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!province}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>شهر را انتخاب کنید</em>
                  </MenuItem>
                  {province &&
                    provincesData
                      .find((p) => p.label === province)
                      ?.cities.map((city) => (
                        <MenuItem key={city.id} value={city.label}>
                          {city.label}
                        </MenuItem>
                      ))}
                </StyledSelect>

                <RtlTextField
                  label="آدرس کامل"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="خیابان، کوچه، پلاک، واحد، کدپستی و سایر جزئیات"
                />
              </>
            )}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ 
            backgroundColor: theme.palette.background.default,
            borderRadius: "12px",
            p: 3,
            boxShadow: theme.shadows[1]
          }}>
            <Typography variant="h6" sx={{ mb: 3, color: theme.palette.primary.main }}>
              خلاصه سفارش
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                روش دریافت:
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {deliveryMethods.find(m => m.value === deliveryMethod)?.label}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                تاریخ دریافت:
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {moment.unix(date).format("jYYYY/jMM/jDD")}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                آدرس تحویل:
              </Typography>
              {addressType === "registered" ? (
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {userData.address}
                </Typography>
              ) : (
                <>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    استان: {province}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    شهر: {city}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    آدرس: {address}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        );
      default:
        return "مرحله ناشناخته";
    }
  };

  return (
    <Box sx={{ 
      position: "relative", 
      height: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      p: 3,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "16px",
      boxShadow: theme.shadows[3]
    }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        sx={{ 
          mb: 4,
          "& .MuiStepConnector-line": {
            borderColor: theme.palette.divider
          }
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StyledStepLabel>{label}</StyledStepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ 
        minHeight: "400px",
        mb: 8,
        p: { xs: 1, sm: 3 },
        backgroundColor: theme.palette.background.paper,
        borderRadius: "12px"
      }}>
        {getStepContent(activeStep)}
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          justifyContent: "space-between",
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{
            px: 4,
            borderRadius: "8px",
            fontWeight: 600
          }}
        >
          مرحله قبل
        </Button>

        <Button
          variant="contained"
          onClick={
            activeStep === steps.length - 1
              ? () => (window.location.href = "/payment")
              : handleNext
          }
          sx={{
            px: 4,
            borderRadius: "8px",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none"
            }
          }}
        >
          {activeStep === steps.length - 1 ? "پرداخت و تکمیل سفارش" : "مرحله بعد"}
        </Button>
      </Box>
    </Box>
  );
}