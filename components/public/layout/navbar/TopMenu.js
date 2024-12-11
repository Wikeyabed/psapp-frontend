import * as React from "react";
import { styled as stylize, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "../../../../src/Link";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../../redux/reducers/productSlice";
import { useEffect } from "react";

import {
  Inventory as InventoryIcon,
  Inbox as InboxIcon,
  AllInbox as AllInboxIcon,
  LocalShipping as LocalShippingIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import ProductsDropDown from "./ProductsDropDown";

const StyledMenu = stylize((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 230,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 25,
        color: theme.palette.secondary.main,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const StyledUl = styled.ul`
  text-align: center;
`;

const StyledLi = styled.li`
  display: inline-block;
  cursor: pointer;
  margin-left: 20px;
`;

const StyledText = styled(Typography)({
  color: "#fff",
  fontSize: 14,
});

export default function TopMenu() {
  const [anchorProduct, setAnchorProduct] = React.useState(null);
  const [anchorServices, setAnchorServices] = React.useState(null);

  const openProduct = Boolean(anchorProduct);

  const handleClickProduct = (event) => {
    setAnchorProduct(event.currentTarget);
  };
  const handleCloseProduct = (name) => {
    setAnchorProduct(null);
  };

  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     if ("serviceWorker" in navigator && "PushManager" in window) {
  //       window.addEventListener("beforeinstallprompt", (e) => {
  //         e.preventDefault();

  //         const deferredPrompt = e;

  //         const installButton = document.getElementById("install-app");

  //         installButton.addEventListener("click", () => {
  //           deferredPrompt.prompt();

  //           deferredPrompt.userChoice.then((choiceResult) => {
  //             if (choiceResult.outcome === "accepted") {
  //               console.log("App installed");
  //             } else {
  //               console.log("App installation declined");
  //             }

  //             installButton.style.display = "none";
  //           });
  //         });

  //         document.body.appendChild(installButton);
  //       });
  //     }
  //   }
  // }, []);

  const openServices = Boolean(anchorServices);

  const handleClickServices = (event) => {
    setAnchorServices(event.currentTarget);
  };
  const handleCloseServices = () => {
    setAnchorServices(null);
  };

  const handleAppInstall = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        deferredPrompt = null;
      }
    }
  };
  return (
    <>
      <StyledUl>
        <StyledLi>
          {" "}
          <Button
            // href="/shop"
            href="/"
            component={Link}
            variant="text"
            color="secondary"
            disableElevation
          >
            <StyledText> فروشگاه</StyledText>
          </Button>
        </StyledLi>

        <StyledLi>
          {" "}
          <Button
            // href="/shop"
            href="/product-categories"
            component={Link}
            variant="text"
            color="secondary"
            disableElevation
          >
            <StyledText> محصولات</StyledText>
          </Button>
        </StyledLi>
        {/* <StyledLi>
          {" "}
          <Button
            id="products-btn"
            aria-controls={openProduct ? "products-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProduct ? "true" : undefined}
            variant="text"
            color="secondary"
            disableElevation
            onClick={handleClickProduct}
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  marginRight: 1,
                  fontSize: "25px !important",
                }}
                color="secondary"
              />
            }
          >
            <StyledText> محصولات</StyledText>
          </Button>
        </StyledLi> */}
        <StyledLi>
          {" "}
          <Button
            id="services-btn"
            aria-controls={openServices ? "services-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openServices ? "true" : undefined}
            variant="text"
            color="secondary"
            disableElevation
            onClick={handleClickServices}
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  marginRight: 1,
                  fontSize: "25px !important",
                }}
                color="secondary"
              />
            }
          >
            <StyledText> خدمات</StyledText>
          </Button>
        </StyledLi>

        <StyledLi>
          {" "}
          <Button
            component={Link}
            href="/contact"
            variant="text"
            color="secondary"
            disableElevation
          >
            <StyledText>تماس با ما</StyledText>
          </Button>
        </StyledLi>

        <StyledLi>
          {" "}
          <Button
            component={Link}
            href="/blog"
            variant="text"
            color="secondary"
            disableElevation
          >
            <StyledText>وبلاگ</StyledText>
          </Button>
        </StyledLi>

        <StyledLi>
          {" "}
          <Button
            component={Link}
            href="/videos"
            variant="text"
            color="secondary"
            disableElevation
          >
            <StyledText>ویدیو های آموزشی</StyledText>
          </Button>
        </StyledLi>

        <StyledLi>
          {" "}
          <Button
            component={Link}
            href="/roles"
            variant="text"
            color="secondary"
            disableElevation
          >
            <StyledText>قوانین و مقررات</StyledText>
          </Button>
        </StyledLi>

        {/* <StyledLi>
          {" "}
          <Button
            id="install-app"
            variant="contained"
            disableElevation
            size="large"
            sx={{
              borderRadius: "20px",
              backgroundColor: "brown",
            }}
          >
            <StyledText>نصب اپلیکیشن ایباکس</StyledText>
          </Button>
        </StyledLi> */}
      </StyledUl>

      {/* ************************************************** */}

      {/* product Menu */}
      <StyledMenu
        id="products-menu"
        MenuListProps={{
          "aria-labelledby": "products-btn",
        }}
        anchorEl={anchorProduct}
        open={openProduct}
        onClose={handleCloseProduct}
      >
        <ProductsDropDown handleNavigate={handleCloseProduct} />
        {/* need to fix menus for category change when selected and show the products */}
      </StyledMenu>

      {/* ******************************** */}

      <StyledMenu
        id="services-menu"
        MenuListProps={{
          "aria-labelledby": "services-btn",
        }}
        anchorEl={anchorServices}
        open={openServices}
        onClose={handleCloseServices}
      >
        <MenuItem
          sx={{
            pr: 0,
            py: 1.5,
          }}
          onClick={handleCloseServices}
          disableRipple
          component={Link}
          href="/order-form"
        >
          <FileCopyIcon
            sx={{
              ml: 1,
            }}
          />
          فرم سفارش محصول
        </MenuItem>
        <MenuItem
          sx={{
            pr: 0,
            py: 1.5,
          }}
          disableRipple
          component={Link}
          href="/partnership"
        >
          <SupervisorAccountIcon
            sx={{
              ml: 1,
            }}
          />
          درخواست همکاری
        </MenuItem>

        {/* <Divider sx={{ my: 0.5 }} /> */}
      </StyledMenu>
    </>
  );
}
