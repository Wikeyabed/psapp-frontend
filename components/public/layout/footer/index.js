import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Instagram, Telegram } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Ita from "../../../../public/images/ita.svg";
import Image from "next/image";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to bottom, #7B6D8D,#2F2235)",
        borderRadius: 4,
        color: "#fff",
        p: 4,
        pb: { xs: 10, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
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

          <Grid item xs={12} sm={4}>
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
          <Grid item>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              نماد اکترونیکی
            </Typography>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
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
