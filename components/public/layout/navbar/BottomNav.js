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
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Badge,
} from "@mui/material";
import Link from "../../../../src/Link";
import { useSelector } from "react-redux";
import { persianNumber } from "../../../../src/PersianDigits";
import { useRouter } from "next/router";

export default function SimpleBottomNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const shoppingCart = useSelector((state) => state.product.shoppingCart);

  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const path = router.route;

    if (path === "/" || path === "/shop") {
      setValue(0);
    } else if (path === "/product-categories") {
      setValue(1);
    } else if (path === "/shop/cart") {
      setValue(2);
    } else if (path === "/user" || path === "/auth/login") {
      setValue(3);
    }
  }, [router.route]);

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
      }}
      elevation={5}
    >
      <CssBaseline />

      <BottomNavigation
        sx={{ background: "transparent" }}
        showLabels
        value={value}
      >
        {/* فروشگاه - index 0 */}
        <BottomNavigationAction
          component={router.route === "/" ? "div" : Link}
          href={router.route === "/" ? undefined : "/"}
          label="فروشگاه"
          icon={
            value === 0 ? (
              <Image src={Shop1} alt="فروشگاه" width={27} height={27} />
            ) : (
              <Image src={Shop2} alt="فروشگاه" width={27} height={27} />
            )
          }
        />

        {/* محصولات - index 1 */}
        <BottomNavigationAction
          component={router.route === "/product-categories" ? "div" : Link}
          href={
            router.route === "/product-categories"
              ? undefined
              : "/product-categories"
          }
          label="محصولات"
          icon={
            value === 1 ? (
              <Image src={Products1} alt="محصولات" width={27} height={27} />
            ) : (
              <Image src={Products2} alt="محصولات" width={27} height={27} />
            )
          }
        />

        {/* سبد خرید - index 2 */}
        <BottomNavigationAction
          component={router.route === "/shop/cart" ? "div" : Link}
          href={router.route === "/shop/cart" ? undefined : "/shop/cart"}
          label="سبد خرید"
          icon={
            <Badge
              color="primary"
              max={999}
              badgeContent={persianNumber(shoppingCart.length)}
            >
              {value === 2 ? (
                <Image src={Cart1} alt="سبد خرید" width={27} height={27} />
              ) : (
                <Image src={Cart2} alt="سبد خرید" width={27} height={27} />
              )}
            </Badge>
          }
        />

        {/* پروفایل یا ورود - index 3 */}
        {isLoggedIn ? (
          <BottomNavigationAction
            component={router.route === "/user" ? "div" : Link}
            href={router.route === "/user" ? undefined : "/user"}
            label="پروفایل"
            icon={<Image src={Account} alt="پروفایل" width={27} height={27} />}
          />
        ) : (
          <BottomNavigationAction
            component={router.route === "/auth/login" ? "div" : Link}
            href={router.route === "/auth/login" ? undefined : "/auth/login"}
            label="ورود"
            icon={<Image src={Account} alt="ورود" width={27} height={27} />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}
