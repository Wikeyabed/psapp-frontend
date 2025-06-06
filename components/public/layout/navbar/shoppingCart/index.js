/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import CartItems from "./CartItems";
import Link from "../../../../../src/Link";
import { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getProducts,
} from "../../../../../redux/reducers/productSlice";
import { persianNumber } from "../../../../../src/PersianDigits";
import { intersectionBy, invokeMap, find } from "lodash";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MiniShoppingCart() {
  const allProducts = useSelector((state) => state.product.products);
  const shoppingCart = useSelector((state) => state.product.shoppingCart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const fetchProducts = () => {
    if (!allProducts.length > 0) {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const checkCart = async () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/check`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(addToCart(result));
        console.log("hahaha", result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchProducts();
    checkCart();
  }, [open]);

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="add to shopping cart">
        <Badge
          color={"secondary"}
          badgeContent={persianNumber(shoppingCart.length)}
        >
          <ShoppingCartIcon
            sx={{
              color: "#fff",
            }}
          />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="md"
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            borderRadius: "10px",
            p: "0 !important",
            width: "100%",
          },
        }}
      >
        <DialogTitle
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
          }}
        >
          سبد خرید
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "0 !important",
          }}
        >
          <CartItems />
        </DialogContent>
        <DialogActions sx={{ padding: 4 }}>
          {/* دکمه پرداخت - رنگ اصلی */}
          <Button
            component={Link}
            href="/shop/cart"
            onClick={handleClose}
            sx={{
              m: 1,
              bgcolor: "#6366f1", // رنگ اصلی
              color: "#fff",
              "&:hover": {
                bgcolor: "#4f46e5", // کمی تیره‌تر هنگام hover
              },
              minHeight: "48px",
              borderRadius: "12px",
            }}
            variant="contained"
          >
            پرداخت
          </Button>

          {/* دکمه ادامه خرید - رنگ مکمل */}
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "#06b6d4", // رنگ مکمل
              borderColor: "#06b6d4",
              "&:hover": {
                bgcolor: "rgba(6, 182, 212, 0.1)",
                borderColor: "#06b6d4",
              },
              minHeight: "48px",
              borderRadius: "12px",
            }}
          >
            ادامه خرید
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MiniShoppingCart;
