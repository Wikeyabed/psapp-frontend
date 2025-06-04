import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Fade,
  CircularProgress,
  useMediaQuery,
  Divider,
  Link,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Telegram as TelegramIcon,
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
} from "@mui/icons-material";
import PublicLayout from "../layout/index";

// استایل‌های سفارشی
const GlassCard = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: theme.shadows[4],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  marginBottom: theme.spacing(3),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1.5),
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.3s ease",
  "&:hover": {
    background: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
  "&:disabled": {
    background: theme.palette.grey[300],
  },
}));

const ContactCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    transform: "translateX(5px)",
  },
  "& svg": {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
  },
}));

function ContactPage() {
  const [formInfo, setFormInfo] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const validateForm = () => {
    const newErrors = {};
    if (!formInfo.name.trim()) newErrors.name = "نام الزامی است";
    if (!formInfo.phone.trim()) newErrors.phone = "شماره تماس الزامی است";
    if (!formInfo.subject.trim()) newErrors.subject = "موضوع الزامی است";
    if (!formInfo.message.trim()) newErrors.message = "پیام الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // شبیه‌سازی ارسال فرم
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("پیام شما با موفقیت ارسال شد!");
      setFormInfo({
        name: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("خطا در ارسال فرم:", error);
      alert("خطا در ارسال پیام! لطفاً مجدداً تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const openTelegram = () => {
    window.open("https://t.me/Samen_admin1001", "_blank");
  };

  return (
    <PublicLayout>
      <Box
        sx={{
          background: "linear-gradient(to bottom, #f5f7fa 0%, #e4e8f0 100%)",
          minHeight: "100vh",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box>
              <Box textAlign="center" mb={8}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  با ما در ارتباط باشید
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  هر سوال یا پیشنهادی دارید، خوشحال می‌شویم بشنویم
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                  <GlassCard elevation={0}>
                    <Box mb={4}>
                      <Typography variant="h5" gutterBottom>
                        اطلاعات تماس
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                    </Box>

                    <ContactCard>
                      <PhoneIcon fontSize="large" />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          تلفن‌های تماس
                        </Typography>
                        <Link
                          href="tel:02155538370"
                          color="textSecondary"
                          sx={{ display: "block" }}
                        >
                          021-55538370
                        </Link>
                        <Link
                          href="tel:09128634399"
                          color="textSecondary"
                          sx={{ display: "block" }}
                        >
                          09128634399
                        </Link>
                      </Box>
                    </ContactCard>

                    <ContactCard>
                      <TelegramIcon fontSize="large" />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          تلگرام
                        </Typography>
                        <Link
                          onClick={openTelegram}
                          color="textSecondary"
                          sx={{ cursor: "pointer" }}
                        >
                          Samen_admin1001
                        </Link>
                      </Box>
                    </ContactCard>

                    <ContactCard>
                      <WhatsAppIcon fontSize="large" />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          واتس‌اپ
                        </Typography>
                        <Link
                          href="https://wa.me/989194737478"
                          target="_blank"
                          color="textSecondary"
                        >
                          09194737478
                        </Link>
                      </Box>
                    </ContactCard>

                    <ContactCard>
                      <LocationIcon fontSize="large" />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          آدرس دفتر مرکزی
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          صالح آباد غربی، شهرک رسالت، خیابان طالقانی، خیابان ۲۰
                          متری جوادی، بعد از فروشگاه افق کوروش پلاک ۶۲
                        </Typography>
                      </Box>
                    </ContactCard>

                    <Box
                      mt={4}
                      sx={{
                        height: "300px",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405.2844324251681!2d51.30543206117888!3d35.64558437789965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff3bbb36e33f%3A0xb2d8cf45490c035f!2z2KfbjNio2Kfaqdiz!5e0!3m2!1sen!2s!4v1691832269041!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </Box>
                  </GlassCard>
                </Grid>

                <Grid item xs={12} md={7}>
                  <GlassCard elevation={0}>
                    <Box mb={4}>
                      <Typography variant="h5" gutterBottom>
                        فرم تماس
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body1" color="textSecondary">
                        لطفا فرم زیر را پر کنید تا در اسرع وقت با شما تماس
                        بگیریم
                      </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CustomTextField
                            fullWidth
                            label="نام کامل"
                            name="name"
                            value={formInfo.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            InputProps={{
                              startAdornment: (
                                <PersonIcon color="action" sx={{ ml: 1 }} />
                              ),
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomTextField
                            fullWidth
                            label="شماره تماس"
                            name="phone"
                            value={formInfo.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            InputProps={{
                              startAdornment: (
                                <PhoneIcon color="action" sx={{ ml: 1 }} />
                              ),
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomTextField
                            fullWidth
                            label="موضوع"
                            name="subject"
                            value={formInfo.subject}
                            onChange={handleChange}
                            error={!!errors.subject}
                            helperText={errors.subject}
                            InputProps={{
                              startAdornment: (
                                <SubjectIcon color="action" sx={{ ml: 1 }} />
                              ),
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomTextField
                            fullWidth
                            label="پیام شما"
                            name="message"
                            value={formInfo.message}
                            onChange={handleChange}
                            multiline
                            rows={6}
                            error={!!errors.message}
                            helperText={errors.message}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomButton
                            fullWidth
                            size="large"
                            type="submit"
                            endIcon={!isLoading && <SendIcon />}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "ارسال پیام"
                            )}
                          </CustomButton>
                        </Grid>
                      </Grid>
                    </form>
                  </GlassCard>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
    </PublicLayout>
  );
}

export default ContactPage;
