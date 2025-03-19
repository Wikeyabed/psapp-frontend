import { useEffect, useState } from "react";
import { Modal, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopUp = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const shouldShowPopup = localStorage.getItem("dontShowPopup") !== "true";
    setShowPopup(shouldShowPopup);
  }, []);

  const handleDontShow = () => {
    localStorage.setItem("dontShowPopup", "true");
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <Modal open={showPopup} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxWidth: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            اطلاعیه
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography sx={{ mb: 3, textAlign: "justify" }}>
          ضمن تبریک سال جدید و عید باستانی نوروز خدمت همراهان همیشگی ایباکس , به
          اطلاع می رساند ارسال غیر حضوری مرسولات ایباکس از تاریخ{" "}
          <span
            style={{
              color: "red",
              marginLeft: 5,
            }}
          >
            1403/12/28
          </span>
          الی{" "}
          <span
            style={{
              color: "red",
              margin: 1,
            }}
          >
            1404/1/16
          </span>{" "}
          امکان پذیر نمی باشد.
          <br />
        </Typography>

        <Button variant="contained" onClick={handleDontShow} fullWidth>
          دیگر نمایش نده
        </Button>
      </Box>
    </Modal>
  );
};

export default PopUp;
