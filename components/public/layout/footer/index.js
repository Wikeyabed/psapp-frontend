import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "../../../../src/Link";
import Grid from "@mui/material/Grid";
import {
  Instagram,
  Telegram,
  Phone,
  LocationOn,
  ChevronLeft,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import Ita from "../../../../public/images/ita.svg";
import Image from "next/image";

// تعریف متغیرهای CSS برای استفاده مجدد
const footerStyles = {
  "--footer-bg": "#6366f1",
  "--footer-text": "#fff",
  "--footer-secondary-text": "#e0e7ff",
  "--footer-divider": "rgba(255,255,255,0.3)",
  "--footer-hover": "rgba(255,255,255,0.2)",
};

const titleStyle = {
  color: "var(--footer-text)",
  mb: 3,
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    right: 0,
    width: 50,
    height: 3,
    backgroundColor: "var(--footer-text)",
    borderRadius: 3,
  },
};

const socialLinkStyle = {
  width: 40,
  height: 40,
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--footer-text)",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "var(--footer-hover)",
    transform: "translateY(-3px)",
  },
};

const quickLinkStyle = {
  display: "flex",
  alignItems: "center",
  color: "var(--footer-secondary-text)",
  textDecoration: "none",
  mb: 1.5,
  "&:hover": {
    color: "var(--footer-text)",
  },
};

export default function Footer() {
  return (
    <footer
      style={{
        ...footerStyles,
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-text)",
        padding: "2rem",
        paddingBottom: { xs: "2.5rem", md: "2rem" },
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        boxShadow: "0 -4px 20px rgba(99, 102, 241, 0.2)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {/* درباره ما */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={titleStyle}>
              درباره ما
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--footer-secondary-text)",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              از سال ۱۳۹۸ در خدمت شما هستیم. از همان روز اول متوجه شدیم که هرچه
              خریداران، محصولات بسته بندی را گرانتر خریداری کنند، مجبور به
              افزایش قیمت محصولات خود می‌شوند. از همین رو اهدافی را برای خود
              ترسیم کردیم و در راستای اهداف مجموعه حرکت کردیم.
            </Typography>

            <Typography variant="h6" sx={titleStyle}>
              ما را دنبال کنید
            </Typography>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link
                href="https://t.me/samen_Admin1001/"
                target="_blank"
                rel="noopener noreferrer"
                sx={socialLinkStyle}
              >
                <Telegram />
              </Link>
              <Link
                href="https://www.instagram.com/eebox.ir"
                target="_blank"
                rel="noopener noreferrer"
                sx={socialLinkStyle}
              >
                <Instagram />
              </Link>
              <Link
                href="https://eitaa.com/eboxir/"
                target="_blank"
                rel="noopener noreferrer"
                sx={socialLinkStyle}
              >
                <Image
                  src={Ita}
                  alt="eitaa"
                  width={20}
                  height={20}
                  style={{ width: 20, height: 20 }}
                  priority={false}
                />
              </Link>
            </div>
          </Grid>

          {/* تماس با ما */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={titleStyle}>
              تماس با ما
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Phone style={{ marginRight: "0.5rem", fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{ color: "var(--footer-secondary-text)" }}
              >
                021-55538370
              </Typography>
            </div>

            <Divider sx={{ my: 2, backgroundColor: "var(--footer-divider)" }} />

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <LocationOn
                style={{
                  marginRight: "0.5rem",
                  fontSize: 20,
                  marginTop: "0.125rem",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "var(--footer-secondary-text)" }}
              >
                صالح آباد غربی، شهرک رسالت، خیابان طالقانی، خیابان ۲۰ متری
                جوادی، بعد از فروشگاه افق کوروش پلاک ۶۲
              </Typography>
            </div>

            <iframe
              loading="lazy"
              style={{
                border: "1px solid var(--footer-divider)",
                borderRadius: "8px",
                marginTop: "1rem",
                width: "100%",
                height: "150px",
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405.2844324251681!2d51.30543206117888!3d35.64558437789965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff3bbb36e33f%3A0xb2d8cf45490c035f!2z2KfbjNio2Kfaqdiz!5e0!3m2!1sen!2s!4v1691832269041!5m2!1sen!2s"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت مکانی ایباکس"
            />
          </Grid>

          {/* نماد الکترونیکی */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={titleStyle}>
              نماد الکترونیکی
            </Typography>

            <div
              style={{
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
                rel="noopener noreferrer"
                href="https://trustseal.enamad.ir/?id=423587&Code=U36FxrJ6cwjOYL9QEdID9AMYmV2HgE4r"
              >
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=423587&Code=U36FxrJ6cwjOYL9QEdID9AMYmV2HgE4r"
                  alt="نماد اعتماد الکترونیکی ایباکس"
                  style={{ width: "100%", height: "auto" }}
                  loading="lazy"
                  width="150"
                  height="150"
                />
              </a>
            </div>
          </Grid>

          {/* دسترسی سریع */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={titleStyle}>
              دسترسی سریع
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                {[
                  {
                    href: "/shop/categories?category=%D8%A8%D8%A7%D8%B2%D8%A7%D8%B1%20%D8%B9%D9%85%D8%AF%D9%87%20%D9%81%D8%B1%D9%88%D8%B4%DB%8C",
                    text: "بازار عمده فروشی",
                  },
                  {
                    href: "/shop/categories?category=%DA%A9%D8%A7%D8%B1%D8%AA%D9%86%20%D9%BE%D8%B3%D8%AA%DB%8C",
                    text: "کارتن پستی",
                  },
                  {
                    href: "/shop/categories?category=%D9%BE%D8%A7%DA%A9%D8%AA%20%D9%BE%D8%B3%D8%AA%DB%8C",
                    text: "پاکت پستی",
                  },
                  {
                    href: "/shop/categories?category=%D9%86%D9%88%D8%A7%D8%B1%20%DA%86%D8%B3%D8%A8%20%D9%87%D8%A7%DB%8C%20%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84",
                    text: "چسب پهن",
                  },
                ].map((link) => (
                  <Link key={link.href} href={link.href} sx={quickLinkStyle}>
                    <ChevronLeft sx={{ fontSize: 16 }} />
                    {link.text}
                  </Link>
                ))}
              </Grid>

              <Grid item xs={6}>
                {[
                  {
                    href: "/shop/categories?category=%D9%86%D8%A7%DB%8C%D9%84%D9%88%D9%86%20%D8%AD%D8%A8%D8%A7%D8%A8%D8%AF%D8%A7%D8%B1",
                    text: "حبابدار",
                  },
                  {
                    href: "/shop/categories?category=%D8%B3%D9%84%D9%81%D9%88%D9%86%20%D8%A7%D8%B3%D8%AA%D8%B1%DA%86",
                    text: "سلفون",
                  },
                  {
                    href: "/shop/categories?category=%D9%86%D8%A7%DB%8C%D9%84%D9%88%D9%86%20%D9%88%20%D9%86%D8%A7%DB%8C%D9%84%DA%A9%D8%B3",
                    text: "نایلون و نایلکس",
                  },
                  {
                    href: "/shop/categories?category=%D9%85%D9%84%D8%B2%D9%88%D9%85%D8%A7%D8%AA%20%D8%A8%D8%B3%D8%AA%D9%87%20%D8%A8%D9%86%D8%AF%DB%8C",
                    text: "ملزومات بسته بندی",
                  },
                ].map((link) => (
                  <Link key={link.href} href={link.href} sx={quickLinkStyle}>
                    <ChevronLeft sx={{ fontSize: 16 }} />
                    {link.text}
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* کپی رایت */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--footer-divider)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "var(--footer-secondary-text)" }}
          >
            {"تمامی حقوق این سایت متعلق به ایباکس می باشد © 2025 - "}
            <Link
              href="https://eebox.ir/"
              sx={{
                color: "var(--footer-text)",
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
              backgroundColor: "var(--footer-divider)",
            }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "var(--footer-secondary-text)",
              fontFamily: "sans-serif",
            }}
          >
            All Rights Reserved And Belongs to Eebox © 2025
          </Typography>
        </div>
      </Container>
    </footer>
  );
}
