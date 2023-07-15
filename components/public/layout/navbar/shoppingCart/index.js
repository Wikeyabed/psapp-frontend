import * as React from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MiniShoppingCart() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        aria-label="add to shopping cart"
        sx={{
          color: "#fff",
        }}
      >
        <Badge color="info" badgeContent={4}>
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
          <CartItems />
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
