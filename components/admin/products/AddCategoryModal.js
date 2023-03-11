import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import ModalBox from "../layout/Modal";
export default function AddCategotyModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ModalBox
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        buttonText={"دسته بندی جدید"}
        buttonVariant={"outlined"}
        icon={<AddIcon />}
      >
        hello world 2
      </ModalBox>
    </>
  );
}
