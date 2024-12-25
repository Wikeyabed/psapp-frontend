import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Grid, Typography, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { SwipeableDrawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Link from "../../../../src/Link";
import MobileLogo from "./MobileLogo";
import MobileFilterBar from "../../shop/categories/MobileFilterBar";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import SocialMediaBar from "../socialMedia";
import { userLogout } from "../../../../redux/reducers/authSlice";
import { deleteCookie } from "cookies-next";
import { Call } from "@mui/icons-material";
const drawerWidth = 240;

import CypherText from "react-cypher-text-loop";

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
  "در کانال تلگرام ایباکس رو عضو شدی؟",
  "خرید مطمعا و امن با ایباکس",
  "...ارسال به شهرستان از طریق : پست ، باربری ، تیپاکس و",
  " انواع تسمه و دستگاه تسمه کش",
  "انواع نایلون و نایلکس",
  "...انواع ملزومات اداری مثل خودکار ، ماژیک ، کاغذ و",
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
];

const navItems = [
  { title: "محصولات", link: "/product-categories" },
  { title: "بلاگ", link: "/blog" },
  { title: "ویدیو های آموزشی", link: "/videos" },
  { title: "فرم سفارش محصول", link: "/order-form" },
  { title: "فرم درخواست همکاری", link: "/partnership" },
  { title: "تماس با ما", link: "/contact" },
  { title: "قوانین و مقررات", link: "/roles" },
];

function TopNavMobile(props) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleUserLogout = async () => {
    deleteCookie("x-auth-token");
    dispatch(userLogout());
    router.push("/auth/login");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          py: 2,
        }}
        display={"flex"}
        justifyContent={"center"}
      >
        <MobileLogo />
      </Box>

      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              component={Link}
              href={item.link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {isUserLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleUserLogout}
              component={Link}
              href="/auth/login"
              sx={{ textAlign: "center", color: "red" }}
            >
              <ListItemText primary={"خروج از حساب کاربری"} />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}

        {isAdminLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/admin"
              sx={{ textAlign: "center", color: "red" }}
            >
              <ListItemText primary={"ورود به پنل ادمین"} />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
      </List>

      <Divider
        sx={{
          my: 1,
        }}
      />
      <Grid
        sx={{
          p: 1,
        }}
      >
        <Typography variant="body2" color="text.primary" gutterBottom>
          نماد اکترونیکی
        </Typography>

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
      </Grid>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", direction: "ltr !important" }}>
      <CssBaseline />
      <AppBar
        sx={{
          background: "linear-gradient(to bottom, #2F2235, #543d5e , #7B6D8D )",
          height: 30,
        }}
        component="nav"
      >
        <Toolbar
          sx={{
            py: 1,
            position: "relative",
          }}
        >
          <Box
            sx={{
              color: "#fff",

              position: "absolute",
              top: 10,
              left: 0,
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography
              component={"div"}
              sx={{
                fontSize: 7,
                // width: "100%",
                textAlign: "center !important",
              }}
            >
              {" "}
              <CypherText delay={5000} textList={preload} randomOrder={true} />
            </Typography>
            {/* {preload.map((word) => {
                  return <Typography>{word}</Typography>;
                })} */}
          </Box>
          {/* <></> */}
          <Box
            component={Link}
            href="tel:+982155538370"
            sx={{
              position: "absolute",
              left: 10,
              textDecoration: "none",
              top: 0,
              mt: 1,
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "8px",
                color: "#ccc",
                mt: "1px",
                textDecoration: "none",
              }}
            >
              021-55538370
            </Typography>
            <Call
              sx={{
                fontSize: "16px",
                ml: 1,
                color: "#000",
                borderRadius: 20,

                width: 15,
                height: 15,
                // padding: "1px",
                backgroundColor: "#ec9d50",
              }}
            />
          </Box>

          <Box
            sx={{
              background:
                "linear-gradient(to top, #2F2235, #543d5e , #7B6D8D )",
              width: 90,
              height: 43,
              position: "absolute",
              left: 0,
              top: 30,
              borderBottomRightRadius: "10px",
              textAlign: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                // mb: 1,
                // mr: 2,
                // display: { sm: "none" },
                mt: "-2px",
                // height: 40,
              }}
            >
              <MenuIcon
                sx={{
                  fontSize: 30,
                }}
                color="secondary"
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: 70,
              top: 5,
              transform: "scale(.7)",
            }}
          >
            <SocialMediaBar mobile={true} />
          </Box>
          <Box
            sx={{
              marginTop: "120px !important",
              width: 100,
              height: 100,
            }}
          >
            <MobileLogo />
          </Box>
        </Toolbar>
        {/* {router.pathname === "/shop" ? <MobileFilterBar /> : ""} */}
      </AppBar>

      <Box component="nav">
        <SwipeableDrawer
          onOpen={() => console.log("mobile nav oepened")}
          anchor="left"
          disableBackdropTransition={true}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              direction: "ltr !important",
              width: drawerWidth,
              position: "absolute",
              right: "0",
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

TopNavMobile.propTypes = {
  window: PropTypes.func,
};

export default TopNavMobile;
