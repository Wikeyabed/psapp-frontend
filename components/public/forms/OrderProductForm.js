/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormGroup,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import PublicLayout from "../layout/index";

// پالت رنگی اصلی
const primaryColors = {
  main: "#6366f1",
  secondary: "#06b6d4",
  light: "#e0e7ff",
  dark: "#4338ca",
};

// استایل‌های سفارشی
const CustomItem = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(10),
  padding: theme.spacing(4),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  direction: "rtl",
  backgroundColor: "#ffffff",
}));

const ResponsiveCard = styled(Grid)(({ theme }) => ({
  margin: "auto",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "80%",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: "100%",
  direction: "ltr",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: primaryColors.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: primaryColors.main,
    },
  },
  "& .MuiInputLabel-root": {
    right: 0,
    // left: 'auto',
    transformOrigin: "right",
    "&.Mui-focused": {
      color: primaryColors.main,
    },
  },
  "& .MuiInputBase-input": {
    textAlign: "right",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  minHeight: "48px",
  borderRadius: "12px",
  background: `linear-gradient(135deg, ${primaryColors.main} 0%, ${primaryColors.secondary} 100%)`,
  color: "white",
  fontWeight: 600,
  fontSize: "1rem",
  padding: theme.spacing(1.5),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    background: `linear-gradient(135deg, ${primaryColors.dark} 0%, ${primaryColors.secondary} 100%)`,
  },
  "&:disabled": {
    background: "#e2e8f0",
    color: "#94a3b8",
  },
}));

const ExpandableSection = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  background: `linear-gradient(135deg, ${primaryColors.main} 0%, ${primaryColors.secondary} 100%)`,
  color: "#ffffff",
  padding: theme.spacing(2),
  borderRadius: "12px",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 4px 12px ${primaryColors.light}`,
  },
}));

function RequestPartnership() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // حالت فرم
  const [formInfo, setFormInfo] = useState({
    phoneNumber: "",
    title: "",
    description: "",
    name: "",
  });

  const [isValid, setIsValid] = useState(true);
  const [expandedSection, setExpandedSection] = useState("");

  /**
   * مدیریت تغییر بخش‌های قابل گسترش
   * @param {string} section - بخش مورد نظر برای گسترش/بستن
   */
  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  /**
   * اعتبارسنجی شماره تلفن
   * @param {Object} event - رویداد تغییر مقدار فیلد
   */
  const handlePhoneNumber = (event) => {
    const value = event.target.value;
    setFormInfo({ ...formInfo, phoneNumber: value });

    // الگوی اعتبارسنجی شماره تلفن ایرانی
    let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    setIsValid(regex.test(value));
  };

  /**
   * به‌روزرسانی سایر فیلدهای فرم
   * @param {Object} event - رویداد تغییر مقدار فیلد
   */
  const handleSetData = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  /**
   * ارسال فرم به سرور
   * @param {Object} event - رویداد ارسال فرم
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("person_name", formInfo.name);
      urlencoded.append("request_type", "2");
      urlencoded.append("request_title", formInfo.title);
      urlencoded.append("request_description", formInfo.description);
      urlencoded.append("phone_number", formInfo.phoneNumber);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/requests/add`,
        requestOptions
      );
      const result = await response.json();

      dispatch(
        setNotificationOn({
          message: "درخواست شما با موفقیت ارسال شد",
          color: "info",
        })
      );

      // ریست فرم پس از ارسال موفق
      setFormInfo({
        phoneNumber: "",
        title: "",
        description: "",
        name: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      dispatch(
        setNotificationOn({
          message: "خطا در ارسال درخواست",
          color: "error",
        })
      );
    }
  };

  return (
    <PublicLayout>
      <Box
        sx={{
          flexGrow: 1,
          py: isMobile ? 2 : 4,
          px: isMobile ? 1 : 3,
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <Grid container justifyContent="center">
          <ResponsiveCard item xs={12} md={8} lg={6}>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <CustomItem elevation={0}>
                  {/* عنوان صفحه */}
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 4,
                      color: primaryColors.dark,
                      fontWeight: 700,
                      fontFamily: "'Segoe UI', Tahoma, sans-serif",
                    }}
                  >
                    سفارش تولید
                  </Typography>

                  {/* توضیحات مقدماتی */}
                  <Typography
                    component="div"
                    sx={{
                      mb: 4,
                      lineHeight: 1.8,
                      color: "#4b5563",
                      fontFamily: "'Segoe UI', Tahoma, sans-serif",
                    }}
                  >
                    شما کاربران عزیز می‌توانید جهت ثبت سفارش تولید کارتن، چاپ
                    روی چسب پهن و چاپ روی نایلون حبابدار از طریق فرم زیر اقدام
                    نمایید. سفارش شما توسط تیم پشتیبانی بررسی شده و در اسرع وقت
                    با شما تماس گرفته می‌شود.
                  </Typography>

                  {/* بخش‌های قابل گسترش */}
                  <ExpandableSection onClick={() => handleSectionToggle("box")}>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "right",
                        fontWeight: 600,
                        pr: 4,
                      }}
                    >
                      سفارش تولید کارتن
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        left: "12px",
                        top: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {expandedSection === "box" ? (
                        <ExpandLessIcon sx={{ color: "white" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "white" }} />
                      )}
                    </Box>
                  </ExpandableSection>

                  <Collapse in={expandedSection === "box"}>
                    <Box
                      sx={{
                        p: 3,
                        mb: 2,
                        backgroundColor: "#f1f5f9",
                        borderRadius: "12px",
                        borderLeft: `4px solid ${primaryColors.main}`,
                      }}
                    >
                      <Typography
                        sx={{
                          mb: 2,
                          color: primaryColors.dark,
                          fontWeight: 600,
                        }}
                      >
                        لطفا توجه داشته باشید، تولید کارتن مخصوص کارخانه‌جات و
                        تولیدی‌ها بوده و سفارشات تولید کم پذیرفته نمی‌شود.
                      </Typography>
                      <Typography sx={{ mb: 2 }}>
                        برای ثبت صحیح سفارش تولید کارتن اطلاعات زیر را در بخش
                        توضیحات وارد نمایید:
                      </Typography>
                      <Box
                        component="ul"
                        sx={{
                          pl: 2,
                          "& li": {
                            mb: 1,
                            color: "#4b5563",
                          },
                        }}
                      >
                        <li>ابعاد کارتن: طول × عرض × ارتفاع</li>
                        <li>تعداد لایه: 3 لایه یا 5 لایه</li>
                        <li>وضعیت چاپ: چاپدار یا بدون چاپ</li>
                      </Box>
                    </Box>
                  </Collapse>

                  <ExpandableSection
                    onClick={() => handleSectionToggle("tape")}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "right",
                        fontWeight: 600,
                        pr: 4,
                      }}
                    >
                      سفارش چاپ روی چسب پهن
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        left: "12px",
                        top: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {expandedSection === "tape" ? (
                        <ExpandLessIcon sx={{ color: "white" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "white" }} />
                      )}
                    </Box>
                  </ExpandableSection>

                  <Collapse in={expandedSection === "tape"}>
                    <Box
                      sx={{
                        p: 3,
                        mb: 2,
                        backgroundColor: "#f1f5f9",
                        borderRadius: "12px",
                        borderLeft: `4px solid ${primaryColors.main}`,
                      }}
                    >
                      <Typography
                        sx={{
                          mb: 2,
                          color: primaryColors.dark,
                          fontWeight: 600,
                        }}
                      >
                        حداقل سفارش چاپ 1 رنگ روی چسب پهن 180 حلقه و سفارشات چاپ
                        2 رنگ و 3 رنگ حداقل 2000 حلقه می‌باشد.
                      </Typography>
                      <Typography sx={{ mb: 2 }}>
                        برای ثبت سفارش چاپ روی چسب پهن اطلاعات زیر را وارد
                        نمایید:
                      </Typography>
                      <Box
                        component="ul"
                        sx={{
                          pl: 2,
                          "& li": {
                            mb: 1,
                            color: "#4b5563",
                          },
                        }}
                      >
                        <li>تعداد رنگ چاپ (مثال: 3 رنگ)</li>
                        <li>تعداد (مثال: 180 حلقه)</li>
                        <li>رنگ‌های مورد نظر (مثال: قرمز-آبی-مشکی)</li>
                      </Box>
                    </Box>
                  </Collapse>

                  <ExpandableSection
                    onClick={() => handleSectionToggle("bubble")}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "right",
                        fontWeight: 600,
                        pr: 4,
                      }}
                    >
                      سفارش چاپ روی نایلون حبابدار
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        left: "12px",
                        top: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {expandedSection === "bubble" ? (
                        <ExpandLessIcon sx={{ color: "white" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "white" }} />
                      )}
                    </Box>
                  </ExpandableSection>

                  <Collapse in={expandedSection === "bubble"}>
                    <Box
                      sx={{
                        p: 3,
                        mb: 2,
                        backgroundColor: "#f1f5f9",
                        borderRadius: "12px",
                        borderLeft: `4px solid ${primaryColors.main}`,
                      }}
                    >
                      <Typography
                        sx={{
                          mb: 2,
                          color: primaryColors.dark,
                          fontWeight: 600,
                        }}
                      >
                        حداقل سفارش چاپ روی نایلون حبابدار 500 کیلوگرم می‌باشد.
                      </Typography>
                      <Typography sx={{ mb: 2 }}>
                        برای ثبت سفارش چاپ روی نایلون حبابدار اطلاعات زیر را
                        وارد نمایید:
                      </Typography>
                      <Box
                        component="ul"
                        sx={{
                          pl: 2,
                          "& li": {
                            mb: 1,
                            color: "#4b5563",
                          },
                        }}
                      >
                        <li>تعداد رنگ چاپ (مثال: 3 رنگ)</li>
                        <li>مقدار (مثال: 500 کیلوگرم)</li>
                        <li>رنگ‌های مورد نظر (مثال: قرمز-آبی-مشکی)</li>
                      </Box>
                    </Box>
                  </Collapse>

                  {/* فیلدهای فرم */}
                  <CustomTextField
                    value={formInfo.phoneNumber}
                    required
                    onChange={handlePhoneNumber}
                    label="شماره تماس"
                    error={!isValid && formInfo.phoneNumber !== ""}
                    helperText={
                      !isValid && formInfo.phoneNumber !== ""
                        ? "شماره تماس معتبر نیست"
                        : ""
                    }
                    inputProps={{ maxLength: 11 }}
                  />

                  <CustomTextField
                    value={formInfo.name}
                    required
                    name="name"
                    onChange={handleSetData}
                    label="نام و نام خانوادگی"
                    type="text"
                  />

                  <CustomTextField
                    value={formInfo.title}
                    required
                    name="title"
                    onChange={handleSetData}
                    label="موضوع"
                    type="text"
                  />

                  <CustomTextField
                    value={formInfo.description}
                    required
                    name="description"
                    multiline
                    minRows={6}
                    onChange={handleSetData}
                    label="توضیحات"
                    type="text"
                  />

                  {/* دکمه ارسال */}
                  <GradientButton
                    disabled={
                      !isValid ||
                      formInfo.title === "" ||
                      formInfo.description === "" ||
                      formInfo.name === "" ||
                      formInfo.phoneNumber === ""
                    }
                    fullWidth
                    type="submit"
                    size="large"
                  >
                    ثبت درخواست
                  </GradientButton>
                </CustomItem>
              </FormGroup>
            </form>
          </ResponsiveCard>
        </Grid>
      </Box>
    </PublicLayout>
  );
}

export default RequestPartnership;
