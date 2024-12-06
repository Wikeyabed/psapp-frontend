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

export default function Navbar() {
  // mobile menu item

  const [word, setWord] = useState("");
  const preload = [
    "با ایباکس به صرفه و با کیفیت بسته بندی کنید",
    "امکان خرید حضوری",
    "ارسال به تهران همه روزه از 8 تا 18",
    "ارسال به سراسر تهران و ایران عزیز",
    "راحت خرید کن تا 48 ساعت می تونی عودت بدی",
    "خیالت راحت اینجا همه چیز ارزون و با کیفیته",
  ];

  useEffect(() => {
    setTimeout(() => {
      setWord(sample(preload));
    }, 10000);
  }, [word]);

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
            backgroundColor: "#444",
            position: "fixed",
            zIndex: 4000,
          }}
        >
          <SocialMediaBar />
          <Typography
            component={"div"}
            sx={{
              textAlign: "center !important",
              mt: 1,
              ml: 30,
              color: "#fff",
            }}
          >
            <TextLoop timeout={5000} animation="tween">
              {preload.map((word) => {
                return <span> {word}</span>;
              })}
            </TextLoop>
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
                backgroundColor: "#fff",
                borderRadius: 20,
                width: 20,
                height: 20,
                padding: "1px",
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
            backgroundColor: "#fff",
            paddingY: 1,
            marginBottom: 4,
            top: 40,
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
          sx={{
            position: "fixed",
            left: 5,
            top: "92px",
          }}
        >
          {/* <img src={MoharamPng.src} width="130px" /> */}
        </Box>
      </Box>
    </>
  );
}
