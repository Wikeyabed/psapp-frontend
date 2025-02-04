import styled from "@emotion/styled";
import { Stack, Typography, Button, Grid, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalContainer = styled(Grid)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: "#fff",
  margin: "auto",
  position: "relative",
}));

export default function ModalBox({
  children,
  icon,
  buttonText,
  buttonVariant,
  handleOpen,
  handleClose,
  open,
  buttonStyle,
  buttonColor,
}) {
  return (
    <>
      <Stack
        sx={{
          display: "inline-block",
          pr: 1,
        }}
      >
        <Button
          onClick={handleOpen}
          sx={{
            ...buttonStyle,
          }}
          size="medium"
          variant={buttonVariant}
          startIcon={icon}
          color={buttonColor}
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
        PaperProps={{
          style: {
            backgroundColor: "rgba(256 , 256 , 256 , 0.5)",
            // opacity: "",
          },
        }}
      >
        {" "}
        <Grid container>
          {" "}
          <ModalContainer item xs={12}>
            <CloseIcon
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: 50,
                right: 50,
                cursor: "pointer",
                zIndex: 10,
                backgroundColor: "transparent",
                color: "red",
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid red",
              }}
            />

            {children}
          </ModalContainer>
        </Grid>
      </Dialog>
    </>
  );
}
