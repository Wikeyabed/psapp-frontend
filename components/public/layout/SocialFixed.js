import { Box, IconButton } from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

function SocialFixed() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 70, md: 30 },
        right: { xs: 20, md: 30 },
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1000,
      }}
    >
      <IconButton
        href="https://api.whatsapp.com/send?phone=989128634399"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: "#25D366",
          color: "white",
          "&:hover": {
            backgroundColor: "#128C7E",
          },
          width: { xs: 40, md: 50 },
          height: { xs: 40, md: 50 },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: 24, md: 30 } }} />
      </IconButton>

      <IconButton
        href="https://t.me/ebox_shop/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: "#0088cc",
          color: "white",
          "&:hover": {
            backgroundColor: "#0077b5",
          },
          width: { xs: 40, md: 50 },
          height: { xs: 40, md: 50 },
        }}
      >
        <TelegramIcon sx={{ fontSize: { xs: 24, md: 30 } }} />
      </IconButton>
    </Box>
  );
}

export default SocialFixed;
