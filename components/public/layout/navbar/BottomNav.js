import { useState, useEffect } from "react";
import Shop1 from "../../../../public/images/Store1.svg";
import Shop2 from "../../../../public/images/Store2.svg";
import Cart1 from "../../../../public/images/Cart1.svg";
import Cart2 from "../../../../public/images/Cart2.svg";
import Products1 from "../../../../public/images/Products1.svg";
import Products2 from "../../../../public/images/Products2.svg";
import Account from "../../../../public/images/Account.svg";

import Image from "next/image";
import {
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Badge,
} from "@mui/material";
import Link from "../../../../src/Link";
import {
  AccountBoxOutlined,
  AccountBox,
  ShoppingBasket,
  ShoppingBasketOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
  Widgets,
  WidgetsOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { persianNumber } from "../../../../src/PersianDigits";
import { useRouter } from "next/router";

export default function SimpleBottomNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const shoppingCart = useSelector((state) => state.product.shoppingCart);

  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (router.route == "/" || router.route == "/shop") {
      setValue(0);
    } else if (router.route == "/shop/cart") {
      setValue(1);
    } else if (router.route == "/user") {
      setValue(2);
    } else {
      setValue(3);
    }
  }, [router]);
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        pt: 0.8,
        width: "100%",
        background: "#fff",
        // borderTop: "4px solid #000",
      }}
      elevation={5}
    >
      <CssBaseline />

      <BottomNavigation
        sx={{
          background: "transparent",
        }}
        showLabels
        value={value}
      >
        <BottomNavigationAction
          component={Link}
          href="/"
          label="فروشگاه"
          icon={
            value == 0 && router.route == "/" ? (
              <Image src={Shop1} alt="فروشگاه" width={27} height={27} />
            ) : (
              <Image src={Shop2} alt="فروشگاه" width={27} height={27} />
            )
          }
        />

        <BottomNavigationAction
          component={Link}
          href="/product-categories"
          label="محصولات"
          icon={
            value == 3 && router.route == "/product-categories" ? (
              <Image src={Products1} alt="فروشگاه" width={27} height={27} />
            ) : (
              <Image src={Products2} alt="فروشگاه" width={27} height={27} />
            )
          }
        />
        <BottomNavigationAction
          component={Link}
          href="/shop/cart"
          label="سبد خرید"
          icon={
            value == 1 && router.route == "/shop/cart" ? (
              <Badge
                color="primary"
                max={999}
                badgeContent={persianNumber(shoppingCart.length)}
              >
                <Image src={Cart1} alt="فروشگاه" width={27} height={27} />
              </Badge>
            ) : (
              <Badge
                color="primary"
                max={999}
                badgeContent={persianNumber(shoppingCart.length)}
              >
                <Image src={Cart2} alt="فروشگاه" width={27} height={27} />
              </Badge>
            )
          }
        />

        {isLoggedIn ? (
          <BottomNavigationAction
            component={Link}
            href="/user"
            label="پروفایل"
            icon={
              value == 2 && router.route == "/user" ? (
                <Image src={Account} alt="فروشگاه" width={27} height={27} />
              ) : (
                <Image src={Account} alt="فروشگاه" width={27} height={27} />
              )
            }
          />
        ) : (
          <BottomNavigationAction
            component={Link}
            href="/auth/login"
            label="ورود"
            icon={
              value == 2 && router.route == "/auth/login" ? (
                <Image src={Account} alt="فروشگاه" width={27} height={27} />
              ) : (
                <Image src={Account} alt="فروشگاه" width={27} height={27} />
              )
            }
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}
