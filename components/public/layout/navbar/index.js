import { AppBar, Box, Divider, Toolbar, Typography, Grid } from "@mui/material";
import ToolbarIcons from "./Toolbar";
import SearchBar from "./SearchBar";
import TopMenu from "./TopMenu";
import BottomNav from "./BottomNav";
import MiniShoppingCart from "./shoppingCart/index";
import TopNavMobile from "./TopNavMobile";
import Logo from "./Logo";
import SocialMediaBar from "../socialMedia";
// import MoharamPng from "../../../../public/images/moharam2.png";
import CallIcon from "@mui/icons-material/Call";
import { useEffect, useState } from "react";
import { keyframes, textAlign } from "@mui/system";
import { once, sample } from "lodash";
import { TextLoop } from "easy-react-text-loop";

import CypherText from "react-cypher-text-loop";
import Link from "../../../../src/Link";

export default function Navbar() {
  // mobile menu item

  const preload = [
    "با ایباکس به صرفه و با کیفیت بسته بندی کنید",
    "امکان خرید حضوری",
    "ارسال به تهران همه روزه از 8 تا 18",
    "ارسال به سراسر تهران و ایران عزیز",
    "راحت خرید کن، تا 48 ساعت می تونی عودت بدی",
    "خیالت راحت اینجا همه چیز ارزون و با کیفیته",
    "هرسوالی داری،میتونی زنگ بزنی و بپرسی",
    "هرچی برای بسته بندی نیاز داری اینجا هست",
    "دنبال ترفند های بسته بندی هستی؟ وبلاگ رو ببین",
    "ایباکس سریع و خشن",
    "تولید انواع کارتن در سایز مختلف",
    "تاحالا لوگوی خودت رو روی چسب چاپ زدی؟",
    "امکان چاپ لوگو بر روی چسب پهن",
    "سوالی داری؟ از صفحه تماس با ما سوال کن",
    "نایلون حبابدار در ابعاد مختلف",
    "ایباکس نماینده رسمی محصولات ماتیسا",
    "لطفا حتما بعد از خرید نظر خود رو با دیگران به اشتراک بزارید",
    "اینستاگرام ایباکس رو فالو کردی؟",
    "در کانال تلگرام ایباکس عضو شدی؟",
    "خرید مطمعا و امن با ایباکس",
    "ارسال به شهرستان از طریق : پست ، باربری ، تیپاکس و...",
    " انواع تسمه و دستگاه تسمه کش",
    "انواع نایلون و نایلکس",
    "انواع ملزومات اداری مثل خودکار ، ماژیک ، کاغذ و...",
    "امکان دریافت فاکتور در منوی کاربری",
    "امکان مشاهده فاکتور در منوی کاربری",
    "حتما از بازار عمده فروشی دیدن کنید",
    "عمده بخری به صرفه تره",
    "برای دسترسی سریع و آسان اپلیکیشن ایباکس رو نصب کن",
    "تولید انواع نایلون و سلفون",
    "کجا ارزون تر از ایباکس؟",
    "انواع پاکت پستی",
    "انواع کارتن پستی",
    "انواع چسب کاغذی",
    "انواع چسب دوطرفه",
    "اینجا بهشت لوازم بسته بندیه",
    "انواع چسب نواری",
    "سود تو ارزون خریدنه",
    "در ایباکس بدون ارزش افزوده خرید کنید",
  ];

  return (
    <>
      {/* bottom menu for mobile */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <BottomNav />
        <TopNavMobile />
      </Box>

      {/* main menu for pc and laptop */}
      <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
        <Box
          sx={{
            width: "100%",
            height: 40,
            backgroundColor: "#2F2235",
            position: "fixed",
            zIndex: 4000,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SocialMediaBar />

          <Typography
            component={"div"}
            sx={{
              mt: 1,
              color: "#fff",
              // width: "100%",
              textAlign: "center",
            }}
          >
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis consequatur laborum */}

            <CypherText delay={2500} textList={preload} />
          </Typography>

          <Box
            sx={{
              position: "absolute",
              left: 20,
              top: 2,
              mt: 1,
              fontSize: "12px",
              color: "#fff",
              display: "flex",

              alignItems: "center",
            }}
          >
            <CallIcon
              sx={{
                fontSize: "16px",
                ml: 1,
                color: "#000",
                borderRadius: 20,
                width: 20,
                height: 20,
                padding: "1px",
                backgroundColor: "#ec9d50",
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                color: "#ccc",
              }}
            >
              شماره تماس : 55538370-021
            </Typography>
          </Box>
        </Box>
        <AppBar
          sx={{
            background:
              "linear-gradient(to bottom, #2F2235, #543d5e , #7B6D8D )",
            borderBottomLeftRadius: "40px",
            borderBottomRightRadius: "40px",

            paddingY: 1,
            marginBottom: 4,
            top: "40px",
            width: "90%",
            right: "5%",
            borderTop: "1px solid #fff",
          }}
          position="fixed"
        >
          <Toolbar>
            {/*  Title and logo */}
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "primary.lightbg",
              }}
            >
              ایباکس
            </Typography> */}
            <Box flexGrow={1}>
              <Logo />
            </Box>

            {/* <Box
              sx={{
                flexGrow: 2,
                display: "flex",
                color: "primary.lightbg",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <Typography variant="caption">
                0912-8169771 : شماره تماس
              </Typography>
            </Box> */}

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                color: "#000",
              }}
            >
              {" "}
              <TopMenu />
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: 25,
                top: 60,
                left: 0,
                paddingRight: "15px",
                py: "10px",
                width: "100% !important",
                ml: 1,
                borderBottomRightRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            >
              {" "}
            </Box>

            <MiniShoppingCart />
            <Divider
              orientation="vertical"
              sx={{
                color: "#fff",
                backgroundColor: "#999",
                marginX: "5px",
                height: "50%",
              }}
            />
            <ToolbarIcons />
          </Toolbar>
        </AppBar>
        <Box
          component={Link}
          href="/shop/categories?category=بازار+عمده+فروشی"
          sx={{
            position: "fixed",
            zIndex: 2,
            left: "110px",
            top: "115px",
          }}
        >
          {/* <img src={MoharamPng.src} width="130px" /> */}
          <img src="/images/b-desktop.png" width="130px" />
        </Box>
      </Box>
    </>
  );
}
