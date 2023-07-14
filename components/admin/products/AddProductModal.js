import * as React from "react";
import ModalBox from "../layout/Modal";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddProductForm from "./AddProductForm";

export default function AddProductModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {" "}
      <ModalBox
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        buttonText={"محصول جدید"}
        buttonVariant={"contained"}
        icon={<InventoryIcon />}
      >
        <AddProductForm />
      </ModalBox>
    </>
  );
}
