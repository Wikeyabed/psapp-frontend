import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "../../../../src/Link";
import Grid from "@mui/material/Grid";
import { Instagram, Telegram } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import Ita from "../../../../public/images/ita.svg";
import Image from "next/image";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to bottom, #06b6d4, #6366f1)",
        color: "#fff",
        p: 4,
        pb: { xs: 10, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              درباره ما
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#fff",
              }}
            >
              از سال ۱۳۹۸ در خدمت شما هستیم. از همان روز اول متوجه شدیم که هرچه
              خریداران، محصولات بسته بندی را گرانتر خریداری کنند، مجبور به
              افزایش قیمت محصولات خود میشوند.از همین رو اهدافی را برای خود ترسیم
              کردیم، و در راستای اهداف مجموعه حرکت کردیم تا شاید بتوانیم باری از
              روی دوش هموطنان عزیز برداریم.
            </Typography>
            {/* <Grid item xs={12} sm={4}> */}
            <Typography
              sx={{
                mt: 2,
              }}
              variant="h6"
              color="secondary.main"
              gutterBottom
            >
              ما را دنبال کنید
            </Typography>
            <Link
              href="https://t.me/ebox_shop/"
              target="_blank"
              color="inherit"
            >
              <Telegram />
            </Link>
            <Link
              href="https://www.instagram.com/eebox.ir"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://eitaa.com/eboxir/" color="inherit">
              <Image
                style={{
                  marginBottom: 2,
                }}
                width={20}
                height={20}
                src={Ita}
                alt="ita"
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              تماس با ما
            </Typography>
            <Typography variant="body2" color="#fff">
              شماره تماس : 55538370-021
            </Typography>

            <Divider
              sx={{
                my: 1,
                backgroundColor: "orange",
              }}
            />
            {/* <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography> */}
            <Typography variant="body2" color="#fff">
              آدرس : صالح آباد غربی،شهرک رسالت،خیابان طالقانی،خیابان ۲۰ متری
              جوادی، بعد از فروشگاه افق کوروش پلاک ۶۲
            </Typography>

            <Box
              component={"iframe"}
              sx={{ border: "1px solid #e2e2e2", borderRadius: 2, mt: 2 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405.2844324251681!2d51.30543206117888!3d35.64558437789965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff3bbb36e33f%3A0xb2d8cf45490c035f!2z2KfbjNio2Kfaqdiz!5e0!3m2!1sen!2s!4v1691832269041!5m2!1sen!2s"
              width="100%"
              height={"150px"}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              نماد الکترونیکی
            </Typography>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                width: "130px !important",
                padding: "5px",
              }}
            >
              <a
                referrerpolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=423587&Code=U36FxrJ6cwjOYL9QEdID9AMYmV2HgE4r"
              >
                <img
                  referrerpolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=423587&Code=U36FxrJ6cwjOYL9QEdID9AMYmV2HgE4r"
                  alt="ebox-ایباکس"
                  style={{
                    cursor: "pointer",
                    width: "auto",
                    height: "atuo",
                  }}
                  Code="U36FxrJ6cwjOYL9QEdID9AMYmV2HgE4r"
                />
              </a>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} container>
            <Grid
              xs={12}
              item
              sx={{
                maxHeight: 40,
              }}
            >
              {" "}
              <Typography variant="h6" color="secondary.main">
                دسترسی سریع
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%D8%A8%D8%A7%D8%B2%D8%A7%D8%B1%20%D8%B9%D9%85%D8%AF%D9%87%20%D9%81%D8%B1%D9%88%D8%B4%DB%8C"
              >
                بازار عمده فروشی
              </Typography>
              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%DA%A9%D8%A7%D8%B1%D8%AA%D9%86%20%D9%BE%D8%B3%D8%AA%DB%8C"
              >
                کارتن پستی
              </Typography>
              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%D9%BE%D8%A7%DA%A9%D8%AA%20%D9%BE%D8%B3%D8%AA%DB%8C"
              >
                پاکت پستی
              </Typography>
              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%D9%86%D9%88%D8%A7%D8%B1%20%DA%86%D8%B3%D8%A8%20%D9%87%D8%A7%DB%8C%20%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84"
              >
                چسب پهن
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%D9%86%D8%A7%DB%8C%D9%84%D9%88%D9%86%20%D8%AD%D8%A8%D8%A7%D8%A8%D8%AF%D8%A7%D8%B1"
              >
                حبابدار
              </Typography>

              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%D8%B3%D9%84%D9%81%D9%88%D9%86%20%D8%A7%D8%B3%D8%AA%D8%B1%DA%86"
              >
                سلفون
              </Typography>

              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%D9%86%D8%A7%DB%8C%D9%84%D9%88%D9%86%20%D9%88%20%D9%86%D8%A7%DB%8C%D9%84%DA%A9%D8%B3"
              >
                نایلون و نایلکس
              </Typography>

              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "block",

                  py: 1,
                }}
                variant="subtitle1"
                component={Link}
                href="/shop/categories?category=%D9%85%D9%84%D8%B2%D9%88%D9%85%D8%A7%D8%AA%20%D8%A8%D8%B3%D8%AA%D9%87%20%D8%A8%D9%86%D8%AF%DB%8C"
              >
                ملزومات بسته بندی
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="#fff" align="center">
            {"تمامی حقوق این سایت متعلق به ایباکس می باشد ©      2025 - "}
            <Link color="inherit" href="https://eebox.ir/">
              www.eebox.ir
            </Link>
            {"  "}
          </Typography>
          <Divider
            sx={{
              my: 1,
              width: { md: "50%" },
              mx: "auto",
              backgroundColor: "orange",
            }}
          />
          <Typography
            sx={{
              fontFamily: "sans-serif !important",
            }}
            variant="body2"
            color="#fff"
            align="center"
          >
            {"All Right Reserved And Belongs to Eebox © 2025"}

            {"  "}
          </Typography>
          {/* <Divider sx={{ my: 3 }} /> */}
          {/* <Typography variant="body2" color="text.secondary" align="center">
            Designed & Developed By
            <Link
              target="_blank"
              color="#992200"
              href="https://instagram.com/a.m.mohamadiiii"
            >
              {" "}
              Me{" "}
            </Link>
            {"  "}
          </Typography> */}
        </Box>
      </Container>
    </Box>
  );
}
