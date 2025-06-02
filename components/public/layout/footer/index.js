import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "../../../../src/Link";
import Grid from "@mui/material/Grid";
import {
  Instagram,
  Telegram,
  WhatsApp,
  Email,
  Phone,
  LocationOn,
  ChevronLeft,
} from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import Ita from "../../../../public/images/ita.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
  component="footer"
  sx={{
    background: "linear-gradient(270deg, #6366f1, #06b6d4, #3b82f6, #06b6d4)",
    backgroundSize: "800% 800%",
    animation: "gradientAnimation 12s ease infinite",
    color: "#fff",
    p: 4,
    pb: { xs: 10, md: 4 },
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    boxShadow: "0 -4px 20px rgba(99, 102, 241, 0.2)",
    "@keyframes gradientAnimation": {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },
  }}
>

      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {/* بخش درباره ما */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 3,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  right: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: "#fff",
                  borderRadius: 3,
                },
              }}
            >
              درباره ما
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#e0e7ff",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              از سال ۱۳۹۸ در خدمت شما هستیم. از همان روز اول متوجه شدیم که هرچه
              خریداران، محصولات بسته بندی را گرانتر خریداری کنند، مجبور به
              افزایش قیمت محصولات خود می‌شوند. از همین رو اهدافی را برای خود
              ترسیم کردیم و در راستای اهداف مجموعه حرکت کردیم.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 2,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  right: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: "#fff",
                  borderRadius: 3,
                },
              }}
            >
              ما را دنبال کنید
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="https://t.me/samen_Admin1001/"
                target="_blank"
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Telegram />
              </Link>
              <Link
                href="https://www.instagram.com/eebox.ir"
                target="_blank"
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Instagram />
              </Link>
              <Link
                href="https://eitaa.com/eboxir/"
                target="_blank"
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  width={20}
                  height={20}
                  src={Ita}
                  alt="eitaa"
                />
              </Link>
            </Box>
          </Grid>

          {/* بخش تماس با ما */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 3,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  right: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: "#fff",
                  borderRadius: 3,
                },
              }}
            >
              تماس با ما
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Phone sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "#e0e7ff" }}>
                021-55538370
              </Typography>
            </Box>

            <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.3)" }} />

            {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Email sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "#e0e7ff" }}>
                info@eebox.ir
              </Typography>
            </Box> */}

            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <LocationOn sx={{ mr: 1, fontSize: 20, mt: 0.5 }} />
              <Typography variant="body2" sx={{ color: "#e0e7ff" }}>
                صالح آباد غربی، شهرک رسالت، خیابان طالقانی، خیابان ۲۰ متری
                جوادی، بعد از فروشگاه افق کوروش پلاک ۶۲
              </Typography>
            </Box>

            <Box
              component="iframe"
              sx={{
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 2,
                mt: 2,
                width: "100%",
                height: 150,
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405.2844324251681!2d51.30543206117888!3d35.64558437789965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff3bbb36e33f%3A0xb2d8cf45490c035f!2z2KfbjNio2Kfaqdiz!5e0!3m2!1sen!2s!4v1691832269041!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Grid>

          {/* بخش نماد الکترونیکی */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 3,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  right: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: "#fff",
                  borderRadius: 3,
                },
              }}
            >
              نماد الکترونیکی
            </Typography>

            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                width: "150px",
                padding: "8px",
                display: "inline-block",
              }}
            >
              <a
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=423587&Code=U36FxrJ6cwjOYL9QEdID9AMYmV2HgE4r"
              >
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=423587&Code=U36FxrJ6cwjOYL9QEdID9AMYmV2HgE4r"
                  alt="ebox-ایباکس"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </a>
            </Box>
          </Grid>

          {/* بخش دسترسی سریع */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 3,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  right: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: "#fff",
                  borderRadius: 3,
                },
              }}
            >
              دسترسی سریع
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link
                  href="/shop/categories?category=%D8%A8%D8%A7%D8%B2%D8%A7%D8%B1%20%D8%B9%D9%85%D8%AF%D9%87%20%D9%81%D8%B1%D9%88%D8%B4%DB%8C"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  بازار عمده فروشی
                </Link>

                <Link
                  href="/shop/categories?category=%DA%A9%D8%A7%D8%B1%D8%AA%D9%86%20%D9%BE%D8%B3%D8%AA%DB%8C"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  کارتن پستی
                </Link>

                <Link
                  href="/shop/categories?category=%D9%BE%D8%A7%DA%A9%D8%AA%20%D9%BE%D8%B3%D8%AA%DB%8C"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  پاکت پستی
                </Link>

                <Link
                  href="/shop/categories?category=%D9%86%D9%88%D8%A7%D8%B1%20%DA%86%D8%B3%D8%A8%20%D9%87%D8%A7%DB%8C%20%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  چسب پهن
                </Link>
              </Grid>

              <Grid item xs={6}>
                <Link
                  href="/shop/categories?category=%D9%86%D8%A7%DB%8C%D9%84%D9%88%D9%86%20%D8%AD%D8%A8%D8%A7%D8%A8%D8%AF%D8%A7%D8%B1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  حبابدار
                </Link>

                <Link
                  href="/shop/categories?category=%D8%B3%D9%84%D9%81%D9%88%D9%86%20%D8%A7%D8%B3%D8%AA%D8%B1%DA%86"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  سلفون
                </Link>

                <Link
                  href="/shop/categories?category=%D9%86%D8%A7%DB%8C%D9%84%D9%88%D9%86%20%D9%88%20%D9%86%D8%A7%DB%8C%D9%84%DA%A9%D8%B3"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  نایلون و نایلکس
                </Link>

                <Link
                  href="/shop/categories?category=%D9%85%D9%84%D8%B2%D9%88%D9%85%D8%A7%D8%AA%20%D8%A8%D8%B3%D8%AA%D9%87%20%D8%A8%D9%86%D8%AF%DB%8C"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#e0e7ff",
                    textDecoration: "none",
                    mb: 1.5,
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16 }} />
                  ملزومات بسته بندی
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* بخش کپی رایت */}
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#e0e7ff" }}>
            {"تمامی حقوق این سایت متعلق به ایباکس می باشد © 2025 - "}
            <Link
              href="https://eebox.ir/"
              sx={{
                color: "#fff",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              www.eebox.ir
            </Link>
          </Typography>

          <Divider
            sx={{
              my: 2,
              width: { md: "50%" },
              mx: "auto",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />

          <Typography
            variant="body2"
            sx={{ color: "#e0e7ff", fontFamily: "sans-serif" }}
          >
            All Rights Reserved And Belongs to Eebox © 2025
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
