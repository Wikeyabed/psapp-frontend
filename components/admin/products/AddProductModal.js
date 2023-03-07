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
        icon={<InventoryIcon />}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, debitis
        deserunt exercitationem amet minima velit ullam, ad earum, corporis eum
        culpa fugit nulla est voluptas voluptatibus deleniti voluptates? Eos,
        corrupti!
      </ModalBox>
    </>
  );
}
