import { useState, useEffect } from "react";

import {
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
} from "@mui/material";
import Link from "../../../../src/Link";
import {
  AccountBoxOutlined,
  AccountBox,
  ShoppingBasket,
  ShoppingBasketOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";

export default function SimpleBottomNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (router.route == "/shop") {
      setValue(0);
    } else if (router.route == "/shop/cart") {
      setValue(1);
    } else {
      setValue(2);
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

        width: "100%",
      }}
      elevation={8}
    >
      <CssBaseline />

      <BottomNavigation showLabels value={value}>
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
          href="/shop/cart"
          label="سبد خرید"
          icon={
            value == 1 && router.route == "/shop/cart" ? (
              <ShoppingCart color="secondary" />
            ) : (
              <ShoppingCartOutlined color="secondary" />
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
