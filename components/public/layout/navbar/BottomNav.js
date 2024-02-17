import { useState, useEffect } from "react";

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
    if (router.route == "/shop") {
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
          href="/shop"
          label="فروشگاه"
          icon={
            value == 0 && router.route == "/shop" ? (
              <ShoppingBasket color="secondary" />
            ) : (
              <ShoppingBasketOutlined color="secondary" />
            )
          }
        />

        <BottomNavigationAction
          component={Link}
          href="/shop/categories?category=all"
          label="محصولات"
          icon={
            value == 3 && router.route == "/shop/categories" ? (
              <Widgets color="secondary" />
            ) : (
              <WidgetsOutlined color="secondary" />
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
                <ShoppingCart color="secondary" />
              </Badge>
            ) : (
              <Badge
                color="primary"
                max={999}
                badgeContent={persianNumber(shoppingCart.length)}
              >
                <ShoppingCartOutlined color="secondary" />
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
                <AccountBox color="secondary" />
              ) : (
                <AccountBoxOutlined color="secondary" />
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
                <AccountBox color="secondary" />
              ) : (
                <AccountBoxOutlined color="secondary" />
              )
            }
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}
