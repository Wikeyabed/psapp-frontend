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
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalContainer = styled(Grid)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: "#fff",
  margin: "auto",
  position: "relative",
  // width: "80%",
}));

export default function ModalBox({
  children,
  icon,
  buttonText,
  buttonVariant,
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
          variant={buttonVariant}
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
      <Dialog
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        scroll="body"
        fullScreen
      >
        {" "}
        <Grid container>
          {" "}
          <ModalContainer item md={7}>
            <CloseIcon
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: 50,
                right: 50,
                cursor: "pointer",
                zIndex: 10,
                backgroundColor: "red",
                color: "white",
                width: 30,
                height: 30,
                borderRadius: "50%",
              }}
            />

            {children}
          </ModalContainer>
        </Grid>
        {/* </DialogContent> */}
      </Dialog>
    </>
  );
}
