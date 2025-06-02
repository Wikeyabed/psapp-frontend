import React from "react";
import PublicLayout from "../layout/index";
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  useTheme
} from "@mui/material";
import {
  Policy as PolicyIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  Assignment as TermsIcon
} from '@mui/icons-material';

const policySections = [
  {
    title: "قوانین عمومی",
    icon: <PolicyIcon fontSize="large" />,
    content: [
      "کلیه اصول و رویه‌های فروشگاه منطبق با قوانین جمهوری اسلامی ایران است",
      "رعایت قانون تجارت الکترونیک و حمایت از حقوق مصرف کننده الزامی است",
      "هرگونه تغییر در قوانین در همین صفحه اعمال می‌شود",
      "ادامه استفاده از سایت به معنی پذیرش تغییرات است"
    ],
    color: "#6366f1" // آبی-بنفش اصلی
  },
  {
    title: "تعریف کاربر",
    icon: <PersonIcon fontSize="large" />,
    content: [
      "کاربر شخصی است که با اطلاعات کاربری خود ثبت نام کرده باشد",
      "ثبت سفارش یا استفاده از خدمات به معنی پذیرش قوانین است",
      "مسئولیت صحت اطلاعات بر عهده کاربر است"
    ],
    color: "#06b6d4" // فیروزه‌ای مکمل
  },
  {
    title: "ارتباطات الکترونیکی",
    icon: <EmailIcon fontSize="large" />,
    content: [
      "پاسخگویی از ساعت 8 صبح تا 18 عصر انجام می‌شود",
      "ارتباطات از طریق تماس، ایمیل یا پیام‌کوتاه صورت می‌گیرد",
      "پاسخ‌ها حداکثر طی 24 ساعت کاری ارسال می‌شوند"
    ],
    color: "#4f46e5" // سایه تیره‌تر از آبی-بنفش
  },
  {
    title: "حریم خصوصی",
    icon: <SecurityIcon fontSize="large" />,
    content: [
      "اطلاعات شخصی کاربران محرمانه تلقی می‌شود",
      "از داده‌ها فقط برای ارائه خدمات استفاده می‌شود",
      "کلیه محتوای سایت متعلق به فروشگاه است"
    ],
    color: "#0891b2" // سایه تیره‌تر از فیروزه‌ای
  },
  {
    title: "ثبت سفارش",
    icon: <ShippingIcon fontSize="large" />,
    content: [
      "سفارش‌ها در اولین روز کاری پردازش می‌شوند",
      "حق کنسل کردن سفارش در صورت عدم موجودی محفوظ است",
      "امکان جایگزینی محصول یا استرداد وجه وجود دارد"
    ],
    color: "#6366f1" // آبی-بنفش اصلی
  },
  {
    title: "شرایط استفاده",
    icon: <TermsIcon fontSize="large" />,
    content: [
      "حداقل سن برای استفاده از سایت 18 سال است",
      "هرگونه سوءاستفاده پیگرد قانونی دارد",
      "فروشگاه در قبال استفاده نادرست مسئولیتی ندارد"
    ],
    color: "#06b6d4" // فیروزه‌ای مکمل
  }
];

function RolesPage() {
  const theme = useTheme();
  
  return (
    <PublicLayout>
      <Box
        sx={{
          minHeight: "100vh",
          py: 8,
          background: `linear-gradient(
            60deg, 
            ${theme.palette.primary.main} 0%, 
            ${theme.palette.secondary.main} 50%, 
            ${theme.palette.info.main} 100%
          )`,
          backgroundSize: "300% 300%",
          animation: "gradientAnimation 12s ease infinite",
          "@keyframes gradientAnimation": {
            "0%": {
              backgroundPosition: "0% 50%"
            },
            "50%": {
              backgroundPosition: "100% 50%"
            },
            "100%": {
              backgroundPosition: "0% 50%"
            }
          }
        }}
      >
        <Container maxWidth="lg">
          {/* هدر صفحه با جزئیات بیشتر */}
          <Box sx={{ 
            textAlign: "center", 
            mb: 8,
            position: "relative",
            px: 2
          }}>
            <Typography 
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "white",
                textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                mb: 3,
                letterSpacing: "-0.5px",
                [theme.breakpoints.down('sm')]: {
                  fontSize: "2rem"
                }
              }}
            >
              قوانین و مقررات ایباکس
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "rgba(255,255,255,0.95)",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.2rem",
                backdropFilter: "blur(2px)",
                textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                [theme.breakpoints.down('sm')]: {
                  fontSize: "1rem"
                }
              }}
            >
              لطفاً قبل از استفاده از خدمات فروشگاه اینترنتی ایباکس، شرایط و قوانین را به دقت مطالعه فرمایید.
              <Box component="span" sx={{ display: "block", mt: 1, fontSize: "0.9em" }}>
                ورود یا ثبت سفارش به معنی پذیرش کامل کلیه موارد ذکر شده است.
              </Box>
            </Typography>
          </Box>

          {/* محتوای اصلی با چیدمان زیگزاگی پیشرفته */}
          <Box sx={{ 
            display: "flex",
            flexDirection: "column",
            gap: 6,
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "4px",
              height: "100%",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)",
              zIndex: 0,
              [theme.breakpoints.down('md')]: {
                display: "none"
              }
            }
          }}>
            {policySections.map((section, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                  maxWidth: { xs: "100%", md: "72%" },
                  width: "100%",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  },
                  position: "relative",
                  [theme.breakpoints.down('md')]: {
                    alignSelf: "center",
                    maxWidth: "100%"
                  }
                }}
              >
                {/* عنصر دکوراتیو */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    [index % 2 === 0 ? "left" : "right"]: -20,
                    width: 100,
                    height: 100,
                    background: `${section.color}20`,
                    borderRadius: "50%",
                    filter: "blur(20px)",
                    zIndex: -1,
                    [theme.breakpoints.down('md')]: {
                      display: "none"
                    }
                  }}
                />
                
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(12px)",
                    borderLeft: `6px solid ${section.color}`,
                    position: "relative",
                    overflow: "hidden",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${section.color}08, transparent)`,
                      zIndex: 0
                    },
                    [theme.breakpoints.down('sm')]: {
                      p: 3,
                      borderRadius: 2
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      gap: 3,
                      position: "relative"
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        background: `${section.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: section.color,
                        border: `2px solid ${section.color}30`,
                        flexShrink: 0,
                        [theme.breakpoints.down('sm')]: {
                          width: 60,
                          height: 60
                        }
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: section.color,
                          position: "relative",
                          mb: 1,
                          fontSize: "1.5rem",
                          [theme.breakpoints.down('sm')]: {
                            fontSize: "1.3rem"
                          }
                        }}
                      >
                        {section.title}
                      </Typography>
                      <Box
                        sx={{
                          width: 60,
                          height: 4,
                          background: `linear-gradient(90deg, ${section.color}, ${section.color}80)`,
                          borderRadius: 2
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box
                    component="ul"
                    sx={{
                      pl: 0,
                      position: "relative",
                      "& li": {
                        listStyleType: "none",
                        position: "relative",
                        pl: 3,
                        mb: 2,
                        color: "#334155",
                        lineHeight: 1.8,
                        fontSize: "1.05rem",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          right: -17,
                          top: "0.7em",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: section.color
                        }
                      }
                    }}
                  >
                    {section.content.map((item, i) => (
                      <Box component="li" key={i}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </PublicLayout>
  );
}

export default RolesPage;