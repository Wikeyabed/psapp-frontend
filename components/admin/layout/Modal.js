import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
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

const ModalContainer = styled(Box)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: "#fff",
  borderRadius: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
}));

export default function ModalBox({
  children,
  icon,
  buttonText,
  handleOpen,
  handleClose,
  open,
}) {
  return (
    <>
      <Stack
        sx={{
          display: "inline-block",
          pr: 2,
        }}
      >
        <Button
          onClick={handleOpen}
          sx={{
            py: 1,
            pl: 3,
            borderRadius: "20px",
          }}
          size="medium"
          variant="contained"
          startIcon={icon}
        >
          <Typography
            variant="button"
            sx={{
              pr: 1,
            }}
          >
            {buttonText}
          </Typography>
        </Button>
      </Stack>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <ModalContainer>{children}</ModalContainer>
        </Fade>
      </Modal>
    </>
  );
}
