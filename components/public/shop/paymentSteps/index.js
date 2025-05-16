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
  useTheme,
  Container,
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

const StyledStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  "& .MuiStepConnector-root": {
    top: 20,
    left: "calc(-50% + 20px)",
    right: "calc(50% + 20px)",
  },
  "& .MuiStepConnector-line": {
    borderColor: theme.palette.divider,
    borderTopWidth: 2,
  },
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    fontSize: "0.85rem",
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
  "& .MuiStepIcon-root": {
    color: theme.palette.divider,
    "&.Mui-active": {
      color: theme.palette.primary.main,
    },
    "&.Mui-completed": {
      color: theme.palette.success.main,
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& label": {
    transformOrigin: "right !important",
    right: "1.75rem !important",
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
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
  marginBottom: theme.spacing(3),
  borderRadius: "10px",
  "& .MuiSelect-select": {
    textAlign: "right",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

const DeliveryOptionCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  border: `1px solid ${
    selected ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: "12px",
  backgroundColor: selected
    ? theme.palette.primary.light + "15"
    : theme.palette.background.paper,
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
  },
}));

const AddressBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(3),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  boxShadow: "none",
  textTransform: "none",
  fontSize: "0.9rem",
  "&:hover": {
    boxShadow: "none",
  },
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
      description: "مراجعه به آدرس انبار در ساعات کاری",
      icon: "🏢",
    },
    {
      value: "posting",
      label: "ارسال از طریق پست ایران",
      description: "تحویل درب منزل در 3-5 روز کاری",
      icon: "📦",
    },
    {
      value: "snap",
      label: "ارسال از طریق اسنپ و تپسی (تهران و کرج)",
      description: "تحویل در همان روز (فقط تهران و کرج)",
      icon: "🚗",
    },
    {
      value: "shipping",
      label: "ارسال از طریق باربری (سراسر ایران عزیز)",
      description: "تحویل در 2-4 روز کاری در سراسر کشور",
      icon: "🚛",
    },
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 4,
                textAlign: "right",
              }}
            >
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
                    control={<Radio color="primary" sx={{ mr: 1 }} />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography variant="h5" sx={{ ml: 2 }}>
                          {method.icon}
                        </Typography>
                        <Box>
                          <Typography fontWeight={600}>
                            {method.label}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {method.description}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ width: "100%", m: 0 }}
                  />
                </DeliveryOptionCard>
              ))}
            </RadioGroup>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.error.main,
                mb: 4,
                textAlign: "center",
              }}
            >
              توجه: ارسال سفارشات در روزهای جمعه امکان پذیر نمی باشد
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "14px",
                p: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
              }}
            >
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
                  padding: "14px",
                  minWidth: 260,
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
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.action.selected,
                  px: 2,
                  py: 1,
                  borderRadius: "6px",
                }}
              >
                تاریخ انتخابی شما: {moment.unix(date).format("jYYYY/jMM/jDD")}
              </Typography>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 4,
                textAlign: "right",
              }}
            >
              اطلاعات آدرس تحویل
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
              <FormLabel
                component="legend"
                sx={{
                  mb: 2,
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              >
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
                  label={
                    <Typography variant="body1" fontWeight={500}>
                      آدرس ثبت شده
                    </Typography>
                  }
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: "8px",
                    backgroundColor:
                      addressType === "registered"
                        ? theme.palette.primary.light + "15"
                        : "transparent",
                    border: `1px solid ${
                      addressType === "registered"
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    m: 0,
                  }}
                />
                <FormControlLabel
                  value="new"
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="body1" fontWeight={500}>
                      آدرس جدید
                    </Typography>
                  }
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: "8px",
                    backgroundColor:
                      addressType === "new"
                        ? theme.palette.primary.light + "15"
                        : "transparent",
                    border: `1px solid ${
                      addressType === "new"
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    m: 0,
                  }}
                />
              </RadioGroup>
            </FormControl>

            {addressType === "registered" ? (
              <AddressBox>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1.5,
                    color: theme.palette.text.primary,
                  }}
                >
                  آدرس ثبت شده شما:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                  }}
                >
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

                <StyledTextField
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
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: "14px",
              p: 4,
              boxShadow: theme.shadows[1],
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: theme.palette.primary.main,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              خلاصه سفارش
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", mb: 1.5 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    minWidth: "120px",
                  }}
                >
                  روش دریافت:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {
                    deliveryMethods.find((m) => m.value === deliveryMethod)
                      ?.label
                  }
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", mb: 1.5 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    minWidth: "120px",
                  }}
                >
                  تاریخ دریافت:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {moment.unix(date).format("jYYYY/jMM/jDD")}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    minWidth: "120px",
                    mb: 1.5,
                  }}
                >
                  آدرس تحویل:
                </Typography>
                {addressType === "registered" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                    }}
                  >
                    {userData.address}
                  </Typography>
                ) : (
                  <Box sx={{ pl: 2 }}>
                    <Box sx={{ display: "flex", mb: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          minWidth: "60px",
                        }}
                      >
                        استان:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {province}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          minWidth: "60px",
                        }}
                      >
                        شهر:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {city}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          minWidth: "60px",
                        }}
                      >
                        آدرس:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {address}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        );
      default:
        return "مرحله ناشناخته";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          pb: 10,
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 4 }, pt: 3 }}>
          <StyledStepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StyledStepLabel>{label}</StyledStepLabel>
              </Step>
            ))}
          </StyledStepper>
        </Box>

        <Box
          sx={{
            px: { xs: 2, sm: 4 },
            pb: 4,
            minHeight: "400px",
          }}
        >
          {getStepContent(activeStep)}
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            py: 2,
            px: { xs: 2, sm: 4 },
            backgroundColor: theme.palette.background.paper,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ActionButton
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{
              borderWidth: "1.5px",
              "&:hover": {
                borderWidth: "1.5px",
              },
            }}
          >
            مرحله قبل
          </ActionButton>

          <ActionButton
            variant="contained"
            onClick={
              activeStep === steps.length - 1
                ? () => (window.location.href = "/payment")
                : handleNext
            }
          >
            {activeStep === steps.length - 1
              ? "پرداخت و تکمیل سفارش"
              : "مرحله بعد"}
          </ActionButton>
        </Box>
      </Paper>
    </Container>
  );
}
