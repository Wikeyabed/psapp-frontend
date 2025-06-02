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
  Container,
  Fade,
  CircularProgress,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Divider,
  Link
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Telegram as TelegramIcon,
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Subject as SubjectIcon
} from "@mui/icons-material";
import PublicLayout from "../layout/index";

// تم سفارشی با تغییرات درخواستی
const customTheme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
    },
    secondary: {
      main: '#ffab00',
      light: '#ffdd4b',
      dark: '#c67c00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Vazir", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
    },
    // افزایش سایز label فیلدها
    body1: {
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem', // بزرگتر کردن نوشته بالای کادرها
        },
      },
    },
  },
});

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    fontSize: '1.1rem', // بزرگتر کردن متن داخل فیلدها
    '& fieldset': {
      borderColor: theme.palette.grey[300],
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}20`,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.light}40`,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.grey[600],
    transform: 'translate(0, -20px) scale(0.9)', // تنظیم موقعیت label
    fontSize: '1.1rem', // بزرگتر کردن label
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  marginBottom: theme.spacing(3),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  color: 'white',
  padding: theme.spacing(1.5),
  fontSize: '1.1rem', // بزرگتر کردن متن دکمه
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
  '&:disabled': {
    background: theme.palette.grey[300],
  },
}));

const ContactCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateX(5px)',
  },
  '& svg': {
    color: theme.palette.primary.main,
    fontSize: '2.2rem', // بزرگتر کردن آیکون‌ها
    marginLeft: theme.spacing(2),
  },
  '& .MuiTypography-root': {
    fontSize: '1.1rem', // بزرگتر کردن متن کارت‌ها
  },
  '& .MuiTypography-h6': {
    fontSize: '1.2rem', // بزرگتر کردن عنوان کارت‌ها
  },
}));

function ContactPage() {
  const [formInfo, setFormInfo] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery(customTheme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo(prev => ({ ...prev, [name]: value }));
    
    if (value.trim() === '') {
      setErrors(prev => ({ ...prev, [name]: 'این فیلد ضروری است' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('پیام شما با موفقیت ارسال شد!');
      setFormInfo({
        name: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  // تابع برای باز کردن تلگرام
  const openTelegram = () => {
    // تلاش برای باز کردن اپلیکیشن تلگرام
    window.location.href = 'tg://resolve?domain=Samen_admin1001';
    // اگر تلگرام نصب نبود، بعد از 2 ثانیه به نسخه وب هدایت می‌شود
    setTimeout(() => {
      window.location.href = 'https://t.me/Samen_admin1001';
    }, 2000);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <PublicLayout>
        <Box sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
          minHeight: '100vh',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: 'linear-gradient(45deg, rgba(26,35,126,0.05) 0%, rgba(255,171,0,0.05) 100%)',
            zIndex: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)',
          }
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Fade in timeout={800}>
              <Box>
                <Box textAlign="center" mb={8}>
                  <Typography variant="h1" color="primary" gutterBottom>
                    با ما در ارتباط باشید
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '1.1rem' }}>
                    هر سوال یا پیشنهادی دارید، خوشحال می‌شویم بشنویم
                  </Typography>
                </Box>

                <Grid container spacing={6}>
                  <Grid item xs={12} md={5}>
                    <GlassCard elevation={0}>
                      <Box mb={4}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
                          اطلاعات تماس
                        </Typography>
                        <Divider sx={{ my: 2, bgcolor: 'primary.light' }} />
                      </Box>

                      <ContactCard>
                        <PhoneIcon />
                        <Box>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            تلفن‌های تماس
                          </Typography>
                          <Link 
                            href="tel:02155538370" 
                            color="textSecondary" 
                            sx={{ 
                              display: 'block', 
                              textDecoration: 'none', 
                              fontSize: '1.1rem',
                              '&:hover': { color: 'primary.main' } 
                            }}
                          >
                            021-55538370
                          </Link>
                          <Link 
                            href="tel:09128634399" 
                            color="textSecondary" 
                            sx={{ 
                              display: 'block', 
                              textDecoration: 'none', 
                              fontSize: '1.1rem',
                              '&:hover': { color: 'primary.main' } 
                            }}
                          >
                            09128634399
                          </Link>
                        </Box>
                      </ContactCard>

                      <ContactCard>
                        <TelegramIcon />
                        <Box>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            تلگرام
                          </Typography>
                          <Link 
                            onClick={openTelegram}
                            color="textSecondary" 
                            sx={{ 
                              cursor: 'pointer',
                              textDecoration: 'none', 
                              fontSize: '1.1rem',
                              '&:hover': { color: 'primary.main' } 
                            }}
                          >
                            Samen_admin1001
                          </Link>
                        </Box>
                      </ContactCard>

                      <ContactCard>
                        <WhatsAppIcon />
                        <Box>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            واتس‌اپ
                          </Typography>
                          <Link 
                            href="https://wa.me/989194737478" 
                            target="_blank" 
                            color="textSecondary" 
                            sx={{ 
                              textDecoration: 'none', 
                              fontSize: '1.1rem',
                              '&:hover': { color: 'primary.main' } 
                            }}
                          >
                            09194737478
                          </Link>
                        </Box>
                      </ContactCard>

                      <ContactCard>
                        <LocationIcon />
                        <Box>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            آدرس دفتر مرکزی
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            صالح آباد غربی، شهرک رسالت، خیابان طالقانی، خیابان ۲۰ متری جوادی، بعد از فروشگاه افق کوروش پلاک ۶۲
                          </Typography>
                        </Box>
                      </ContactCard>

                      <Box mt={4} sx={{ height: '300px', borderRadius: customTheme.shape.borderRadius, overflow: 'hidden' }}>
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
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
                          فرم تماس
                        </Typography>
                        <Divider sx={{ my: 2, bgcolor: 'primary.light' }} />
                        <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem' }}>
                          لطفا فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم
                        </Typography>
                      </Box>

                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
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
                                  <PersonIcon color="action" sx={{ ml: 1, fontSize: '1.5rem' }} />
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
                                  <PhoneIcon color="action" sx={{ ml: 1, fontSize: '1.5rem' }} />
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
                                  <SubjectIcon color="action" sx={{ ml: 1, fontSize: '1.5rem' }} />
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
                              endIcon={!isLoading && <SendIcon sx={{ fontSize: '1.5rem' }} />}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <CircularProgress size={28} color="inherit" />
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
    </ThemeProvider>
  );
}

export default ContactPage;