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
import EditIcon from "@mui/icons-material/Edit";
import EditProductForm from "./EditProdcutForm";

function EditProductModal() {
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
        buttonText={"ویرایش محصول"}
        buttonVariant={"outlined"}
        icon={<EditIcon />}
      >
        <EditProductForm />
      </ModalBox>
    </>
  );
}
export default EditProductModal;
