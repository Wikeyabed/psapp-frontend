import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import CartItems from "./CartItems";
import Link from "../../../../../src/Link";
import { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../../redux/reducers/productSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MiniShoppingCart() {
  const allProducts = useSelector((state) => state.product.products);
  const shoppingCart = useSelector((state) => state.product.shoppingCart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

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
        .then((result) => dispatch(getProducts(result)))
        .catch((error) => console.log("error", error));
    }
  };

  const checkCart = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchProducts();
    checkCart();
  }, [open]);

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        aria-label="add to shopping cart"
        sx={{
          color: "#fff",
        }}
      >
        <Badge color="info" badgeContent={shoppingCart.length}>
          <AddShoppingCartIcon />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            borderRadius: "10px",
            padding: "10px",
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
            padding: 5,
          }}
        >
          <CartItems products={products} />
        </DialogContent>
        <DialogActions
          sx={{
            padding: 4,
          }}
        >
          <Button
            component={Link}
            href="/shop/cart"
            sx={{ m: 1 }}
            color="secondary"
            variant="contained"
            onClick={handleClose}
          >
            پرداخت
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleClose}>
            ادامه خرید
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MiniShoppingCart;
