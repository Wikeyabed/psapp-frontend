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
  Avatar,
  Chip,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import provincesData from "./provinces.json";
import styled from "@emotion/styled";
import {
  LocalShipping,
  Store,
  LocalPostOffice,
  TwoWheeler,
  CalendarToday,
  LocationOn,
  Payment,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";

const steps = [
  "روش دریافت محصول",
  "زمان دریافت محصول",
  "آدرس کاربر",
  "نهایی سازی فاکتور",
];

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
    "&.Mui-active": {
      color: theme.palette.primary.main,
    },
    "&.Mui-completed": {
      color: theme.palette.success.main,
    },
  },
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  minWidth: "100%",
  direction: "rtl",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
    color: theme.palette.text.secondary,
    fontSize: "0.9rem",
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
  "& .MuiInputBase-input": {
    fontSize: "0.95rem",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(3),
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
  "& .MuiSelect-select": {
    padding: "12px 14px",
    fontSize: "0.95rem",
  },
}));

const DeliveryOptionCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  border: `2px solid ${
    selected ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: "14px",
  backgroundColor: selected
    ? theme.palette.primary.light + "15"
    : theme.palette.background.paper,
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    borderColor: selected
      ? theme.palette.primary.main
      : theme.palette.primary.light,
    boxShadow: theme.shadows[3],
  },
}));

const AddressBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "14px",
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[1],
}));

const StepIconContainer = styled(Box)(({ theme, active, completed }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: completed
    ? theme.palette.success.main
    : active
    ? theme.palette.primary.main
    : theme.palette.action.disabledBackground,
  color:
    completed || active
      ? theme.palette.common.white
      : theme.palette.text.secondary,
}));

const DeliveryIcon = ({ method }) => {
  const icons = {
    "in-person": <Store color="inherit" fontSize="medium" />,
    posting: <LocalPostOffice color="inherit" fontSize="medium" />,
    snap: <TwoWheeler color="inherit" fontSize="medium" />,
    shipping: <LocalShipping color="inherit" fontSize="medium" />,
  };
  return icons[method] || <Store color="inherit" fontSize="medium" />;
};

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
      label: "تحویل حضوری از انبار ایباکس",
      description: "مراجعه به آدرس انبار در ساعات کاری (9 صبح تا 5 بعدازظهر)",
      icon: <Store color="primary" />,
      color: theme.palette.primary.main,
    },
    {
      value: "posting",
      label: "ارسال از طریق پست پیشتاز",
      description: "تحویل درب منزل در 3-5 روز کاری در سراسر کشور",
      icon: <LocalPostOffice color="secondary" />,
      color: theme.palette.secondary.main,
    },
    {
      value: "snap",
      label: "ارسال از طریق اسنپ و تپسی",
      description: "تحویل در همان روز (فقط تهران و کرج)",
      icon: <TwoWheeler color="info" />,
      color: theme.palette.info.main,
    },
    {
      value: "shipping",
      label: "ارسال از طریق باربری",
      description: "تحویل در 2-4 روز کاری در سراسر کشور",
      icon: <LocalShipping color="warning" />,
      color: theme.palette.warning.main,
    },
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.text.primary,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocalShipping color="primary" />
              روش دریافت محصول خود را انتخاب کنید
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
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: method.color + "20",
                            color: method.color,
                            width: 40,
                            height: 40,
                          }}
                        >
                          <DeliveryIcon method={method.value} />
                        </Avatar>
                        <Box>
                          <Typography fontWeight={600}>
                            {method.label}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {method.description}
                          </Typography>
                          {method.value === "snap" && (
                            <Chip
                              label="تهران و کرج"
                              size="small"
                              sx={{
                                mt: 1,
                                bgcolor: method.color + "20",
                                color: method.color,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    }
                    sx={{
                      width: "100%",
                      alignItems: "flex-start",
                      m: 0,
                    }}
                  />
                </DeliveryOptionCard>
              ))}
            </RadioGroup>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                توجه: ارسال سفارشات در روزهای جمعه و تعطیلات رسمی امکان پذیر نمی
                باشد
              </Typography>
            </Alert>

            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.primary.main,
                }}
              >
                <CalendarToday />
                <Typography variant="subtitle1" fontWeight={600}>
                  انتخاب تاریخ تحویل
                </Typography>
              </Box>

              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "14px",
                  p: 1.5,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: theme.shadows[1],
                }}
              >
                <DatePicker
                  placeholder="تاریخ مورد نظر را انتخاب کنید"
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
                    minWidth: 280,
                    fontSize: "1rem",
                    fontFamily: theme.typography.fontFamily,
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

              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                }}
              >
                تاریخ انتخابی شما:
                <Box
                  component="span"
                  sx={{
                    bgcolor: theme.palette.primary.light + "30",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "6px",
                    mr: 1,
                    fontWeight: 600,
                  }}
                >
                  {moment.unix(date).format("jYYYY/jMM/jDD")}
                </Box>
              </Typography>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.text.primary,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocationOn color="primary" />
              اطلاعات آدرس تحویل
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel
                component="legend"
                sx={{
                  mb: 2,
                  color: theme.palette.text.primary,
                  fontWeight: 500,
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor:
                            addressType === "registered"
                              ? theme.palette.primary.main + "20"
                              : theme.palette.action.disabledBackground,
                          width: 24,
                          height: 24,
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor:
                              addressType === "registered"
                                ? theme.palette.primary.main
                                : theme.palette.action.disabled,
                          }}
                        />
                      </Avatar>
                      <Typography>آدرس ثبت شده</Typography>
                    </Box>
                  }
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderRadius: "10px",
                    backgroundColor:
                      addressType === "registered"
                        ? theme.palette.primary.light + "10"
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor:
                            addressType === "new"
                              ? theme.palette.primary.main + "20"
                              : theme.palette.action.disabledBackground,
                          width: 24,
                          height: 24,
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor:
                              addressType === "new"
                                ? theme.palette.primary.main
                                : theme.palette.action.disabled,
                          }}
                        />
                      </Avatar>
                      <Typography>آدرس جدید</Typography>
                    </Box>
                  }
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderRadius: "10px",
                    backgroundColor:
                      addressType === "new"
                        ? theme.palette.primary.light + "10"
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
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <LocationOn color="primary" fontSize="small" />
                  آدرس ثبت شده شما:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                  }}
                >
                  {userData.address || "شما آدرس ثبت شده ای ندارید"}
                </Typography>
                {!userData.address && (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => setAddressType("new")}
                  >
                    افزودن آدرس جدید
                  </Button>
                )}
              </AddressBox>
            ) : (
              <>
                <StyledSelect
                  value={province}
                  onChange={handleProvinceChange}
                  displayEmpty
                  inputProps={{ "aria-label": "انتخاب استان" }}
                  renderValue={(selected) => selected || "استان را انتخاب کنید"}
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
                  renderValue={(selected) => selected || "شهر را انتخاب کنید"}
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
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Payment color="primary" />
              خلاصه سفارش
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <DeliveryIcon method={deliveryMethod} />
                روش دریافت:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  pr: 4,
                }}
              >
                {deliveryMethods.find((m) => m.value === deliveryMethod)?.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  pr: 4,
                  mt: 0.5,
                }}
              >
                {
                  deliveryMethods.find((m) => m.value === deliveryMethod)
                    ?.description
                }
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <CalendarToday color="primary" fontSize="small" />
                تاریخ دریافت:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  pr: 4,
                }}
              >
                {moment.unix(date).format("jYYYY/jMM/jDD")}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <LocationOn color="primary" fontSize="small" />
                آدرس تحویل:
              </Typography>
              {addressType === "registered" ? (
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    pr: 4,
                    lineHeight: 1.8,
                  }}
                >
                  {userData.address}
                </Typography>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      pr: 4,
                    }}
                  >
                    استان: {province}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      pr: 4,
                    }}
                  >
                    شهر: {city}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      pr: 4,
                      lineHeight: 1.8,
                    }}
                  >
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
    <Box
      sx={{
        position: "relative",
        height: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        p: { xs: 2, sm: 4 },
        backgroundColor: theme.palette.background.paper,
        borderRadius: "16px",
        boxShadow: theme.shadows[4],
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 5,
          "& .MuiStepConnector-line": {
            borderColor: theme.palette.divider,
            borderWidth: 2,
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StyledStepLabel
              StepIconComponent={() => (
                <StepIconContainer
                  active={activeStep === index}
                  completed={activeStep > index}
                >
                  {index + 1}
                </StepIconContainer>
              )}
            >
              {label}
            </StyledStepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          minHeight: "400px",
          mb: 8,
          p: { xs: 2, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: "14px",
        }}
      >
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
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          startIcon={<ArrowBack />}
          sx={{
            px: 4,
            borderRadius: "10px",
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
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
          endIcon={<ArrowForward />}
          sx={{
            px: 4,
            borderRadius: "10px",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {activeStep === steps.length - 1
            ? "پرداخت و تکمیل سفارش"
            : "مرحله بعد"}
        </Button>
      </Box>
    </Box>
  );
}
