import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Fade,
  Modal,
  Backdrop,
} from "@mui/material";
import ModalBox from "../layout/Modal";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddProductForm from "./AddProductForm";

export default function AddProductModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Typography
          variant="h5"
          sx={{
            pb: 4,
          }}
        >
          اطلاعات محصول جدید
        </Typography>
        <AddProductForm />
      </ModalBox>
    </>
  );
}
