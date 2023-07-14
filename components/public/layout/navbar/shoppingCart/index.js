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
      >
        <DialogTitle>سبد خرید</DialogTitle>
        <DialogContent
          sx={{
            padding: 5,
          }}
        >
          <CartItems />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            پرداخت
          </Button>
          <Button onClick={handleClose}>ادامه خرید</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MiniShoppingCart;
