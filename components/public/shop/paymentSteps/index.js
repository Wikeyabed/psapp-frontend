import { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  Fade,
  FormHelperText,
} from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import provincesData from "./provinces.json";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Professional but friendly color palette
const colors = {
  primary: "#4361ee",
  secondary: "#6c757d",
  success: "#4cc9f0",
  error: "#f72585",
  warning: "#f8961e",
  info: "#4895ef",
  dark: "#212529",
  light: "#f8f9fa",
  background: "#ffffff",
};

const steps = [
  "روش دریافت محصول",
  "زمان دریافت محصول",
  "آدرس کاربر",
  "نهایی سازی فاکتور",
];

const StyledStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(4, 0, 3),
  backgroundColor: "transparent",
  "& .MuiStepConnector-root": {
    top: 24,
    left: "calc(-50% + 24px)",
    right: "calc(50% + 24px)",
  },
  "& .MuiStepConnector-line": {
    borderColor: colors.secondary,
    borderTopWidth: 3,
    borderTopStyle: "dotted",
    opacity: 0.3,
  },
  "& .MuiStepConnector-active, & .MuiStepConnector-completed": {
    "& .MuiStepConnector-line": {
      borderColor: colors.primary,
      borderTopStyle: "solid",
      opacity: 1,
    },
  },
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: `${colors.secondary}`,
    "&.Mui-active": {
      color: colors.primary,
      fontWeight: 700,
    },
    "&.Mui-completed": {
      color: colors.success,
    },
  },
  "& .MuiStepIcon-root": {
    color: colors.background,
    border: `2px solid ${colors.secondary}`,
    borderRadius: "50%",
    width: 32,
    height: 32,
    "&.Mui-active": {
      color: "white",
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    "&.Mui-completed": {
      color: "white",
      borderColor: colors.success,
      backgroundColor: colors.success,
    },
  },
  "& .MuiStepIcon-text": {
    fill: colors.dark,
    fontWeight: 700,
    fontSize: "0.8rem",
    "&.Mui-active": {
      fill: "white",
    },
    "&.Mui-completed": {
      fill: "white",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  marginBottom: theme.spacing(2),
  "& label": {
    transformOrigin: "right !important",
    right: "1.75rem !important",
    color: `${colors.secondary}`,
    fontSize: "0.9rem",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: error ? colors.error : colors.secondary,
      borderWidth: 1.5,
      opacity: 0.6,
    },
    "&:hover fieldset": {
      borderColor: error ? colors.error : colors.primary,
      opacity: 1,
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? colors.error : colors.primary,
      borderWidth: 2,
      boxShadow: `0 0 0 3px ${
        error ? colors.error + "20" : colors.primary + "20"
      }`,
      opacity: 1,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "0.95rem",
    padding: theme.spacing(1.75, 2),
  },
  "& .MuiFormHelperText-root": {
    textAlign: "right",
    marginRight: 0,
    marginLeft: 0,
    fontSize: "0.8rem",
  },
}));

const StyledSelect = styled(Select)(({ theme, error }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: "12px",
  transition: "all 0.3s ease",
  "& .MuiSelect-select": {
    textAlign: "right",
    padding: theme.spacing(1.75, 2),
    fontSize: "0.95rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? colors.error : colors.secondary,
    borderWidth: 1.5,
    opacity: 0.6,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? colors.error : colors.primary,
    opacity: 1,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? colors.error : colors.primary,
    borderWidth: 2,
    boxShadow: `0 0 0 3px ${
      error ? colors.error + "20" : colors.primary + "20"
    }`,
    opacity: 1,
  },
}));

const DeliveryOptionCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  border: `2px solid ${selected ? colors.primary : colors.secondary}`,
  borderRadius: "16px",
  backgroundColor: selected
    ? `${colors.primary}08`
    : theme.palette.background.paper,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  opacity: selected ? 1 : 0.8,
  "&:hover": {
    borderColor: colors.primary,
    boxShadow: `0 4px 12px ${colors.secondary}10`,
    transform: "translateY(-2px)",
    opacity: 1,
  },
  "& .MuiRadio-root": {
    color: colors.secondary,
    "&.Mui-checked": {
      color: colors.primary,
    },
  },
}));

const AddressBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `2px solid ${colors.secondary}`,
  borderRadius: "16px",
  backgroundColor: `${colors.light}`,
  marginBottom: theme.spacing(3),
  transition: "all 0.3s ease",
  opacity: 0.9,
  "&:hover": {
    opacity: 1,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: theme.spacing(1.75, 4),
  fontWeight: 600,
  boxShadow: "none",
  textTransform: "none",
  fontSize: "0.95rem",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "none",
    transform: "translateY(-1px)",
  },
  "&.MuiButton-contained": {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.info})`,
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.info})`,
      boxShadow: `0 4px 12px ${colors.primary}30`,
    },
  },
  "&.MuiButton-outlined": {
    borderWidth: "2px",
    "&:hover": {
      borderWidth: "2px",
      backgroundColor: `${colors.light}`,
    },
  },
  "&.Mui-disabled": {
    opacity: 0.7,
  },
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(1.5),
  "& .label": {
    fontWeight: 600,
    minWidth: "140px",
    color: colors.dark,
  },
  "& .value": {
    color: colors.secondary,
    flex: 1,
  },
}));

const StepValidationMessage = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  borderRadius: "8px",
  backgroundColor: `${colors.error}10`,
  borderLeft: `4px solid ${colors.error}`,
  marginBottom: theme.spacing(3),
  "& svg": {
    marginLeft: theme.spacing(1),
    color: colors.error,
  },
}));

export default function PaymentStepper() {
  const theme = useTheme();
  const userData = useSelector((state) => state.auth.userInformation);
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [date, setDate] = useState(moment().unix());
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("registered");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [stepErrors, setStepErrors] = useState({
    0: false,
    1: false,
    2: false,
  });

  useEffect(() => {
    if (error || success) {
      setOpenSnackbar(true);
      const timer = setTimeout(() => {
        setOpenSnackbar(false);
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const validateStep = (step) => {
    let isValid = true;

    switch (step) {
      case 0:
        if (!deliveryMethod) {
          setStepErrors((prev) => ({
            ...prev,
            0: "لطفا روش دریافت را انتخاب کنید",
          }));
          isValid = false;
        } else {
          setStepErrors((prev) => ({ ...prev, 0: false }));
        }
        break;
      case 1:
        if (!date) {
          setStepErrors((prev) => ({
            ...prev,
            1: "لطفا تاریخ دریافت را انتخاب کنید",
          }));
          isValid = false;
        } else {
          setStepErrors((prev) => ({ ...prev, 1: false }));
        }
        break;
      case 2:
        if (addressType === "new") {
          if (!province) {
            setStepErrors((prev) => ({
              ...prev,
              2: "لطفا استان را انتخاب کنید",
            }));
            isValid = false;
          } else if (!city) {
            setStepErrors((prev) => ({
              ...prev,
              2: "لطفا شهر را انتخاب کنید",
            }));
            isValid = false;
          } else if (!address) {
            setStepErrors((prev) => ({ ...prev, 2: "لطفا آدرس را وارد کنید" }));
            isValid = false;
          } else {
            setStepErrors((prev) => ({ ...prev, 2: false }));
          }
        } else if (!userData.address) {
          setStepErrors((prev) => ({
            ...prev,
            2: "شما آدرس ثبت شده ای ندارید",
          }));
          isValid = false;
        } else {
          setStepErrors((prev) => ({ ...prev, 2: false }));
        }
        break;
      default:
        break;
    }

    return isValid;
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) return;

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setSuccess("مرحله با موفقیت تکمیل شد");
      setLoading(false);
    }, 800);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setCity("");
  };

  function handleChangeDate(value) {
    setDate(value.unix);
    if (stepErrors[1]) setStepErrors((prev) => ({ ...prev, 1: false }));
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setError(null);
    setSuccess(null);
  };

  const deliveryMethods = [
    {
      value: "in-person",
      label: "تحویل حضوری سفارش از انبار ایباکس",
      description: "مراجعه به آدرس انبار در ساعات کاری",
      icon: "🏢",
      color: colors.primary,
    },
    {
      value: "posting",
      label: "ارسال از طریق پست ایران",
      description: "تحویل درب منزل در 3-5 روز کاری",
      icon: "📦",
      color: colors.info,
    },
    {
      value: "snap",
      label: "ارسال از طریق اسنپ و تپسی (تهران و کرج)",
      description: "تحویل در همان روز (فقط تهران و کرج)",
      icon: "🚗",
      color: colors.success,
    },
    {
      value: "shipping",
      label: "ارسال از طریق باربری (سراسر ایران عزیز)",
      description: "تحویل در 2-4 روز کاری در سراسر کشور",
      icon: "🚛",
      color: colors.warning,
    },
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: colors.dark,
                  mb: 4,
                  textAlign: "right",
                }}
              >
                لطفا روش دریافت محصول خود را انتخاب کنید
              </Typography>

              {stepErrors[0] && (
                <StepValidationMessage>
                  <ErrorOutlineIcon />
                  <Typography variant="body2" sx={{ color: colors.error }}>
                    {stepErrors[0]}
                  </Typography>
                </StepValidationMessage>
              )}

              <RadioGroup
                value={deliveryMethod}
                onChange={(e) => {
                  setDeliveryMethod(e.target.value);
                  if (stepErrors[0])
                    setStepErrors((prev) => ({ ...prev, 0: false }));
                }}
              >
                {deliveryMethods.map((method) => (
                  <DeliveryOptionCard
                    key={method.value}
                    selected={deliveryMethod === method.value}
                    onClick={() => {
                      setDeliveryMethod(method.value);
                      if (stepErrors[0])
                        setStepErrors((prev) => ({ ...prev, 0: false }));
                    }}
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
                          <Typography
                            variant="h4"
                            sx={{ ml: 2, color: method.color }}
                          >
                            {method.icon}
                          </Typography>
                          <Box>
                            <Typography
                              fontWeight={700}
                              sx={{ color: colors.dark }}
                            >
                              {method.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: colors.secondary }}
                            >
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
          </Fade>
        );
      case 1:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Alert
                severity="warning"
                sx={{
                  mb: 4,
                  borderRadius: "12px",
                  textAlign: "right",
                  backgroundColor: `${colors.warning}08`,
                  borderLeft: `4px solid ${colors.warning}`,
                }}
                icon={
                  <ErrorOutlineIcon
                    sx={{ color: colors.warning }}
                    fontSize="inherit"
                  />
                }
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  توجه: ارسال سفارشات در روزهای جمعه و تعطیلات رسمی امکان پذیر
                  نمی باشد
                </Typography>
              </Alert>

              {stepErrors[1] && (
                <StepValidationMessage sx={{ display: "inline-flex", mb: 4 }}>
                  <ErrorOutlineIcon />
                  <Typography variant="body2" sx={{ color: colors.error }}>
                    {stepErrors[1]}
                  </Typography>
                </StepValidationMessage>
              )}

              <Box
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: `2px solid ${
                    stepErrors[1] ? colors.error : colors.secondary
                  }`,
                  borderRadius: "16px",
                  p: 3,
                  backgroundColor: colors.background,
                  boxShadow: `0 4px 12px ${colors.secondary}10`,
                  opacity: stepErrors[1] ? 1 : 0.9,
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <DatePicker
                  placeholder="انتخاب تاریخ تحویل"
                  mapDays={({ date }) => {
                    let isWeekend = [6].includes(date.weekDay.index);
                    if (isWeekend)
                      return {
                        disabled: true,
                        style: { color: colors.error },
                      };
                  }}
                  weekStartDayIndex={7}
                  highlightToday={true}
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    minWidth: 280,
                    fontSize: "1.1rem",
                    borderRadius: "12px",
                    border: `2px solid ${
                      stepErrors[1] ? colors.error : colors.secondary
                    }`,
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
                  variant="body1"
                  sx={{
                    mt: 3,
                    color: colors.primary,
                    backgroundColor: `${colors.primary}10`,
                    px: 3,
                    py: 1.5,
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  تاریخ انتخابی شما: {moment.unix(date).format("jYYYY/jMM/jDD")}
                </Typography>
              </Box>
            </Box>
          </Fade>
        );
      case 2:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: colors.dark,
                  mb: 4,
                  textAlign: "right",
                }}
              >
                اطلاعات آدرس تحویل
              </Typography>

              {stepErrors[2] && (
                <StepValidationMessage>
                  <ErrorOutlineIcon />
                  <Typography variant="body2" sx={{ color: colors.error }}>
                    {stepErrors[2]}
                  </Typography>
                </StepValidationMessage>
              )}

              <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
                <FormLabel
                  component="legend"
                  sx={{
                    mb: 2,
                    color: colors.dark,
                    fontWeight: 600,
                    fontSize: "1rem",
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
                    if (stepErrors[2])
                      setStepErrors((prev) => ({ ...prev, 2: false }));
                  }}
                  row
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="registered"
                    control={<Radio color="primary" />}
                    label={
                      <Typography variant="body1" fontWeight={600}>
                        آدرس ثبت شده
                      </Typography>
                    }
                    sx={{
                      px: 3,
                      py: 2,
                      borderRadius: "12px",
                      backgroundColor:
                        addressType === "registered"
                          ? `${colors.primary}08`
                          : "transparent",
                      border: `2px solid ${
                        addressType === "registered"
                          ? colors.primary
                          : colors.secondary
                      }`,
                      m: 0,
                      flex: 1,
                      opacity: addressType === "registered" ? 1 : 0.8,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio color="primary" />}
                    label={
                      <Typography variant="body1" fontWeight={600}>
                        آدرس جدید
                      </Typography>
                    }
                    sx={{
                      px: 3,
                      py: 2,
                      borderRadius: "12px",
                      backgroundColor:
                        addressType === "new"
                          ? `${colors.primary}08`
                          : "transparent",
                      border: `2px solid ${
                        addressType === "new"
                          ? colors.primary
                          : colors.secondary
                      }`,
                      m: 0,
                      flex: 1,
                      opacity: addressType === "new" ? 1 : 0.8,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>

              {addressType === "registered" ? (
                <AddressBox>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: colors.dark,
                    }}
                  >
                    آدرس ثبت شده شما:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.secondary,
                      lineHeight: 1.8,
                    }}
                  >
                    {userData.address || "شما آدرس ثبت شده ای ندارید"}
                  </Typography>
                </AddressBox>
              ) : (
                <>
                  <FormControl fullWidth>
                    <StyledSelect
                      value={province}
                      onChange={handleProvinceChange}
                      displayEmpty
                      inputProps={{ "aria-label": "انتخاب استان" }}
                      error={stepErrors[2] && stepErrors[2].includes("استان")}
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
                    {stepErrors[2] && stepErrors[2].includes("استان") && (
                      <FormHelperText error>{stepErrors[2]}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth>
                    <StyledSelect
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (stepErrors[2] && stepErrors[2].includes("شهر")) {
                          setStepErrors((prev) => ({ ...prev, 2: false }));
                        }
                      }}
                      disabled={!province}
                      displayEmpty
                      error={stepErrors[2] && stepErrors[2].includes("شهر")}
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
                    {stepErrors[2] && stepErrors[2].includes("شهر") && (
                      <FormHelperText error>{stepErrors[2]}</FormHelperText>
                    )}
                  </FormControl>

                  <StyledTextField
                    label="آدرس کامل"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (stepErrors[2] && stepErrors[2].includes("آدرس")) {
                        setStepErrors((prev) => ({ ...prev, 2: false }));
                      }
                    }}
                    multiline
                    rows={4}
                    placeholder="خیابان، کوچه، پلاک، واحد، کدپستی و سایر جزئیات"
                    error={stepErrors[2] && stepErrors[2].includes("آدرس")}
                    helperText={
                      stepErrors[2] && stepErrors[2].includes("آدرس")
                        ? stepErrors[2]
                        : ""
                    }
                  />
                </>
              )}
            </Box>
          </Fade>
        );
      case 3:
        return (
          <Fade in={true} timeout={500}>
            <Box
              sx={{
                backgroundColor: colors.light,
                borderRadius: "16px",
                p: 4,
                boxShadow: `0 4px 20px ${colors.secondary}10`,
                border: `1px solid ${colors.secondary}20`,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: colors.primary,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                خلاصه سفارش
              </Typography>

              <Box sx={{ mb: 3 }}>
                <SummaryItem>
                  <Typography variant="subtitle1" className="label">
                    روش دریافت:
                  </Typography>
                  <Typography variant="body1" className="value">
                    {
                      deliveryMethods.find((m) => m.value === deliveryMethod)
                        ?.label
                    }
                  </Typography>
                </SummaryItem>

                <Divider
                  sx={{
                    my: 2,
                    borderColor: colors.secondary,
                    opacity: 0.2,
                  }}
                />

                <SummaryItem>
                  <Typography variant="subtitle1" className="label">
                    تاریخ دریافت:
                  </Typography>
                  <Typography variant="body1" className="value">
                    {moment.unix(date).format("jYYYY/jMM/jDD")}
                  </Typography>
                </SummaryItem>

                <Divider
                  sx={{
                    my: 2,
                    borderColor: colors.secondary,
                    opacity: 0.2,
                  }}
                />

                <Box>
                  <Typography
                    variant="subtitle1"
                    className="label"
                    sx={{ mb: 2 }}
                  >
                    آدرس تحویل:
                  </Typography>
                  {addressType === "registered" ? (
                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.secondary,
                        lineHeight: 1.8,
                      }}
                    >
                      {userData.address}
                    </Typography>
                  ) : (
                    <Box sx={{ pl: 2 }}>
                      <SummaryItem>
                        <Typography variant="body1" className="label">
                          استان:
                        </Typography>
                        <Typography variant="body1" className="value">
                          {province}
                        </Typography>
                      </SummaryItem>
                      <SummaryItem>
                        <Typography variant="body1" className="label">
                          شهر:
                        </Typography>
                        <Typography variant="body1" className="value">
                          {city}
                        </Typography>
                      </SummaryItem>
                      <SummaryItem>
                        <Typography variant="body1" className="label">
                          آدرس:
                        </Typography>
                        <Typography variant="body1" className="value">
                          {address}
                        </Typography>
                      </SummaryItem>
                    </Box>
                  )}
                </Box>
              </Box>

              <Alert
                severity="info"
                sx={{
                  borderRadius: "12px",
                  backgroundColor: `${colors.info}08`,
                  borderLeft: `4px solid ${colors.info}`,
                }}
                icon={
                  <CheckCircleOutlineIcon
                    sx={{ color: colors.info }}
                    fontSize="inherit"
                  />
                }
              >
                <Typography variant="body2">
                  پس از پرداخت، سفارش شما ثبت و پیگیری آن از طریق پنل کاربری
                  امکان پذیر خواهد بود.
                </Typography>
              </Alert>
            </Box>
          </Fade>
        );
      default:
        return "مرحله ناشناخته";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          pb: 10,
          background: colors.background,
          boxShadow: `0 8px 32px ${colors.secondary}10`,
          border: `1px solid ${colors.secondary}20`,
        }}
      >
        <Box sx={{ px: { xs: 3, sm: 6 }, pt: 4 }}>
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
            px: { xs: 3, sm: 6 },
            pb: 4,
            minHeight: "450px",
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
            py: 3,
            px: { xs: 3, sm: 6 },
            backgroundColor: colors.background,
            borderTop: `1px solid ${colors.secondary}20`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ActionButton
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            variant="outlined"
            sx={{
              minWidth: "120px",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "مرحله قبل"}
          </ActionButton>

          <ActionButton
            variant="contained"
            onClick={
              activeStep === steps.length - 1
                ? () => (window.location.href = "/payment")
                : handleNext
            }
            disabled={loading}
            sx={{
              minWidth: "120px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeStep === steps.length - 1 ? (
              "پرداخت و تکمیل سفارش"
            ) : (
              "مرحله بعد"
            )}
          </ActionButton>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={error ? "error" : "success"}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            minWidth: "300px",
            boxShadow: `0 4px 12px ${colors.secondary}20`,
            alignItems: "center",
          }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
}
