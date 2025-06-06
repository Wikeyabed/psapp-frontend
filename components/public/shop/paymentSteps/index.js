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
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import LocalShipping from "@mui/icons-material/LocalShipping";
import LocalPostOffice from "@mui/icons-material/LocalPostOffice";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import Storefront from "@mui/icons-material/Storefront";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import provincesData from "./provinces.json";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// پالت رنگی بر اساس راهنمای سبک فروشگاه
const colors = {
  primary: "#6366f1", // آبی-بنفش
  secondary: "#06b6d4", // فیروزه‌ای
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  dark: "#1e293b",
  light: "#f8fafc",
  background: "#ffffff",
};

const steps = [
  "روش دریافت محصول",
  "زمان دریافت محصول",
  "آدرس کاربر",
  "نهایی سازی فاکتور",
];
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.primary,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.success,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderColor: `${colors.secondary}60`,
    borderRadius: 1,
  },
}));
const StyledStepper = styled(Stepper)(({ theme }) => ({
  // direction: "rtl",
  backgroundColor: "transparent",
  padding: theme.spacing(4, 0, 3),
  "& .MuiStepLabel-label": {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#334155",
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: "#6366f1",
    fontWeight: 700,
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: "#10b981",
  },
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: `${colors.secondary}`,
    marginTop: theme.spacing(1),
    "&.Mui-active": {
      color: colors.primary,
      fontWeight: 700,
    },
    "&.Mui-completed": {
      color: colors.success,
    },
  },
  "& .MuiStepIcon-root": {
    color: "transparent",
    border: `2px solid ${colors.secondary}`,
    borderRadius: "50%",
    width: 32,
    height: 32,
    fontSize: "1rem",
    "&.Mui-active": {
      color: colors.primary,
      borderColor: colors.primary,
      backgroundColor: "white",
      "& .MuiStepIcon-text": {
        fill: colors.primary,
        fontWeight: 700,
      },
    },
    "&.Mui-completed": {
      color: colors.success,
      borderColor: colors.success,
      backgroundColor: "white",
      "& .MuiStepIcon-text": {
        fill: colors.success,
      },
    },
  },
  "& .MuiStepIcon-text": {
    fill: colors.secondary,
    fontWeight: 700,
    fontSize: "0.9rem",
  },
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  marginBottom: theme.spacing(2),
  "& label": {
    transformOrigin: "right !important",
    right: "1.75rem !important",
    color: `${colors.dark}`,
    fontSize: "0.9rem",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: error ? colors.error : colors.primary,
      borderWidth: 1.5,
      opacity: 0.4,
    },
    "&:hover fieldset": {
      borderColor: error ? colors.error : colors.primary,
      opacity: 0.8,
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
    borderColor: error ? colors.error : colors.primary,
    borderWidth: 1.5,
    opacity: 0.4,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? colors.error : colors.primary,
    opacity: 0.8,
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
  marginBottom: theme.spacing(3),
  border: `2px solid ${selected ? colors.primary : colors.secondary}20`,
  borderRadius: "16px",
  backgroundColor: selected
    ? `${colors.primary}08`
    : theme.palette.background.paper,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  opacity: selected ? 1 : 0.9,
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 6px 16px ${colors.secondary}15`,
    opacity: 1,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "2.5rem",
    marginLeft: theme.spacing(2),
    color: selected ? colors.primary : colors.secondary,
  },
}));

const AddressBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `2px solid ${colors.primary}`,
  borderRadius: "12px",
  backgroundColor: `${colors.light}`,
  marginBottom: theme.spacing(3),
  transition: "all 0.3s ease",
  opacity: 0.9,
  boxShadow: `0 2px 8px ${colors.primary}10`,
  "&:hover": {
    opacity: 1,
    boxShadow: `0 4px 12px ${colors.primary}20`,
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
  minHeight: "48px",
  "&:hover": {
    boxShadow: "none",
    transform: "translateY(-2px)",
  },
  "&.MuiButton-contained": {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    color: "white",
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
      boxShadow: `0 4px 12px ${colors.primary}40`,
    },
  },
  "&.MuiButton-outlined": {
    borderWidth: "2px",
    borderColor: colors.primary,
    color: colors.primary,
    "&:hover": {
      borderWidth: "2px",
      backgroundColor: `${colors.primary}08`,
    },
  },
  "&.Mui-disabled": {
    opacity: 0.6,
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
    color: colors.dark,
    flex: 1,
    opacity: 0.9,
  },
}));

const StepValidationMessage = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  borderRadius: "12px",
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
  // const stepIndex =direction === "ltr" ? steps.length - 1 - activeStep : activeStep;
  const userData = useSelector((state) => state.auth.userInformation);
  const [activeStep, setActiveStep] = useState(0);
  const stepIndex = activeStep;
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [date, setDate] = useState(moment().unix());
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    deliveryMethod: false,
    date: false,
    province: false,
    city: false,
    address: false,
  });
  // استایل‌های جدید را اینجا اضافه کنید
  const StepIconContainer = styled("div")(({ active, completed }) => ({
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: completed ? "#10b981" : active ? "#6366f1" : "#e2e8f0",
    color: completed || active ? "#fff" : "#475569",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "1rem",
    border: `2px solid ${
      completed ? "#10b981" : active ? "#6366f1" : "#cbd5e1"
    }`,
    boxShadow: active ? "0 0 0 4px rgba(99, 102, 241, 0.2)" : "none",
  }));

  const StepLabelText = styled(Typography)(({ active, completed }) => ({
    fontSize: "0.85rem",
    fontWeight: active ? 700 : 600,
    color: completed ? "#10b981" : active ? "#6366f1" : "#64748b",
    marginTop: 8,
    textAlign: "center",
  }));

  const CustomStepLabel = ({ label, active, completed, icon }) => (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <StepIconContainer active={active} completed={completed}>
        {completed ? <CheckIcon fontSize="small" /> : icon}
      </StepIconContainer>
      <StepLabelText active={active} completed={completed}>
        {label}
      </StepLabelText>
    </Box>
  );

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
    const newFieldErrors = {
      deliveryMethod: false,
      date: false,
      province: false,
      city: false,
      address: false,
    };

    switch (step) {
      case 0:
        if (!deliveryMethod) {
          newFieldErrors.deliveryMethod = true;
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
          newFieldErrors.date = true;
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
            newFieldErrors.province = true;
            setStepErrors((prev) => ({
              ...prev,
              2: "لطفا استان را انتخاب کنید",
            }));
            isValid = false;
          }
          if (!city) {
            newFieldErrors.city = true;
            setStepErrors((prev) => ({
              ...prev,
              2: "لطفا شهر را انتخاب کنید",
            }));
            isValid = false;
          }
          if (!address) {
            newFieldErrors.address = true;
            setStepErrors((prev) => ({
              ...prev,
              2: "لطفا آدرس را وارد کنید",
            }));
            isValid = false;
          }
        } else if (!userData.address) {
          setStepErrors((prev) => ({
            ...prev,
            2: "شما آدرس ثبت شده ای ندارید. لطفا آدرس جدید وارد کنید",
          }));
          isValid = false;
        } else {
          setStepErrors((prev) => ({ ...prev, 2: false }));
        }
        break;
      default:
        break;
    }

    setFieldErrors(newFieldErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) {
      // اسکرول به بالای فرم برای نمایش خطاها
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setSuccess("مرحله با موفقیت تکمیل شد");
      setLoading(false);
      // اسکرول به بالای مرحله جدید
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
      label: "تحویل حضوری از انبار",
      description: "مراجعه به آدرس انبار در ساعات کاری (9 صبح تا 5 بعدازظهر)",
      icon: <Storefront fontSize="large" />,
      color: colors.primary,
      benefits: ["تحویل فوری", "امکان بازدید از محصول", "پشتیبانی حضوری"],
    },
    {
      value: "posting",
      label: "ارسال از طریق پست",
      description: "تحویل درب منزل در 3-5 روز کاری",
      icon: <LocalPostOffice fontSize="large" />,
      color: colors.info,
      benefits: ["پوشش سراسری", "امکان پیگیری مرسوله", "تحویل درب منزل"],
    },
    {
      value: "snap",
      label: "ارسال با اسنپ/تپسی",
      description: "تحویل در همان روز (فقط تهران و کرج)",
      icon: <DirectionsCar fontSize="large" />,
      color: colors.success,
      benefits: ["تحویل سریع (2-4 ساعت)", "پیگیری لحظه‌ای", "خدمات VIP"],
    },
    {
      value: "shipping",
      label: "ارسال با باربری",
      description: "تحویل در 2-4 روز کاری در سراسر کشور",
      icon: <LocalShipping fontSize="large" />,
      color: colors.warning,
      benefits: [
        "مناسب برای سفارشات حجیم",
        "هزینه مقرون به صرفه",
        "پشتیبانی تلفنی",
      ],
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
                      control={<Radio sx={{ mr: 1 }} />}
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
                              sx={{ color: colors.dark, opacity: 0.7 }}
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
                    stepErrors[1] ? colors.error : colors.primary
                  }`,
                  borderRadius: "12px",
                  p: 3,
                  backgroundColor: colors.background,
                  boxShadow: `0 4px 12px ${colors.primary}20`,
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
                      fieldErrors.date ? colors.error : colors.secondary
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
                {fieldErrors.date && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.error,
                      mt: 1,
                      textAlign: "center",
                    }}
                  >
                    لطفا تاریخ دریافت را انتخاب کنید
                  </Typography>
                )}
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
                    control={<Radio />}
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
                          : colors.primary
                      }`,
                      m: 0,
                      flex: 1,
                      opacity: addressType === "registered" ? 1 : 0.7,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
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
                        addressType === "new" ? colors.primary : colors.primary
                      }`,
                      m: 0,
                      flex: 1,
                      opacity: addressType === "new" ? 1 : 0.7,
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
                      color: colors.dark,
                      lineHeight: 1.8,
                      opacity: 0.9,
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
                      error={fieldErrors.province}
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
                    {fieldErrors.province && (
                      <FormHelperText error>
                        لطفا استان را انتخاب کنید
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth>
                    <StyledSelect
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setFieldErrors((prev) => ({ ...prev, city: false }));
                      }}
                      disabled={!province}
                      displayEmpty
                      error={fieldErrors.city}
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
                    {fieldErrors.city && (
                      <FormHelperText error>
                        لطفا شهر را انتخاب کنید
                      </FormHelperText>
                    )}
                  </FormControl>

                  <StyledTextField
                    label="آدرس کامل"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, address: false }));
                    }}
                    multiline
                    rows={4}
                    placeholder="خیابان، کوچه، پلاک، واحد، کدپستی و سایر جزئیات"
                    error={fieldErrors.address}
                    helperText={
                      fieldErrors.address ? "لطفا آدرس را وارد کنید" : ""
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
                borderRadius: "12px",
                p: 4,
                boxShadow: `0 4px 20px ${colors.primary}10`,
                border: `1px solid ${colors.primary}20`,
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
                    borderColor: colors.primary,
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
                    borderColor: colors.primary,
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
                        color: colors.dark,
                        lineHeight: 1.8,
                        opacity: 0.9,
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
                  backgroundColor: `${colors.primary}08`,
                  borderLeft: `4px solid ${colors.primary}`,
                }}
                icon={
                  <CheckCircleOutlineIcon
                    sx={{ color: colors.primary }}
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
    <Container
      maxWidth="md"
      sx={{
        py: 0,
        mt: 0,
        minHeight: "calc(100vh - 64px)",
        px: { xs: 0, sm: 2 }, // اضافه کردن padding افقی برای موبایل
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 0, sm: "20px" }, // حذف border-radius برای موبایل
          overflow: "hidden",
          position: "relative",
          pb: 10,
          background: colors.background,
          boxShadow: { xs: "none", sm: `0 8px 32px ${colors.secondary}10` }, // حذف سایه برای موبایل
          border: { xs: "none", sm: `1px solid ${colors.secondary}20` }, // حذف border برای موبایل
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px", // کاهش ارتفاع برای موبایل
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.info})`,
          },
        }}
      >
        <Box sx={{ px: { xs: 3, sm: 6 }, pt: 4 }}>
          <StyledStepper
  activeStep={activeStep}
  alternativeLabel
  connector={<CustomConnector />}
  sx={{ 
    direction: "rtl",
    padding: { xs: theme.spacing(2, 0, 1), sm: theme.spacing(4, 0, 3) } // کاهش padding برای موبایل
  }}
>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={() => (
                    <CustomStepLabel
                      label={label}
                      active={activeStep === index}
                      completed={activeStep > index}
                      icon={index + 1}
                    />
                  )}
                />
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
          {getStepContent(stepIndex)}
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
            gap: 2,
          }}
        >
          <ActionButton
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            variant="outlined"
            sx={{
              minWidth: "120px",
              borderColor: colors.secondary,
              color: colors.dark,
              "&:hover": {
                borderColor: colors.primary,
                color: colors.primary,
              },
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
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.info})`,
              "&:hover": {
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.info})`,
                boxShadow: `0 4px 12px ${colors.primary}30`,
              },
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
            boxShadow: `0 4px 12px ${colors.primary}20`,
            alignItems: "center",
            borderRadius: "12px",
          }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
}
