import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 4,
        pb: { xs: 10, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              درباره ما
            </Typography>
            <Typography
              textAlign={"justify"}
              variant="caption"
              color="text.secondary"
            >
              از سال ۱۳۹۸ در خدمت شما هستیم. از همان روز اول متوجه شدیم که هرچه
              خریداران، محصولات بسته بندی را گرانتر خریداری کنند، مجبور به
              افزایش قیمت محصولات خود میشوند.از همین رو اهدافی را برای خود ترسیم
              کردیم، و در راستای اهداف مجموعه حرکت کردیم تا شاید بتوانیم باری از
              روی دوش هموطنان عزیز برداریم.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              تماس با ما
            </Typography>
            <Typography variant="body2" color="text.secondary">
              شماره تماس : 66827884-021
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              آدرس : یافت آباد جنوبی , خیابان میرهاشمی ,کوچه خرقانیان , بن بست
              آلاله یک , پلاک 1
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              ما را دنبال کنید
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"تمامی حقوق این سایت متعلق به ایباکس می باشد ©      2023 - "}
            <Link color="inherit" href="https://eebox.ir/">
              www.eebox.ir
            </Link>
            {"  "}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            Designed & Developed With{" "}
            <FavoriteIcon fontSize="10px" color="error" /> by
            <Link
              target="_blank"
              color="#0000ff"
              href="https://instagram.com/a.m.mohamadiiii"
            >
              {" "}
              ME{" "}
            </Link>
            {"  "}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
