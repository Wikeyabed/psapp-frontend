import { Box, IconButton, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

function SocialFixed() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 70, md: 30 },
        right: { xs: 10, md: 15 },
        display: "flex",
        flexDirection: "column",
        // alignItems: "flex-end",
        gap: 1,
        zIndex: 1000,
      }}
    >
      {/* متن  با استایل جدید */}
      <Typography
  variant="body2"
  sx={{
    background: "linear-gradient(135deg, #2196F3, #21CBF3)",
    color: "white",
    padding: { xs: "6px 10px", md: "8px 14px" },
    borderRadius: "16px",
    fontWeight: 600,
    fontSize: { xs: "0.8rem", md: "0.95rem" },
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    gap: 1,
    transition: "all 0.3s ease",
    "&::before": {
      content: '""',
      display: "inline-block",
      width: "18px",
      height: "18px",
      backgroundImage:
        "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xOCA2aC0yYzAtMS4xLS45LTItMi0ySDhjLTEuMSAwLTIgLjktMiAydjhsMCAxLjEuMS4xYzAgLjYuNCAxLjEgMSAxLjFoNHY0YzAgLjYuNCAxLjEgMSAxLjFoMS4xYy4xIDAgLjEtLjEuMS0uMVYxN2g0Yy42IDAgMS0uNSAxLTFWN2MwLS42LS40LTEtMS0xem0tNSA5SDlWOUg3djZoNnYtMnoiLz48L3N2Zz4=')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
    },
    "&:hover": {
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
      transform: "translateY(-2px)",
    },
  }}
>
  سوالی دارید؟
</Typography>


      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <IconButton
          href="https://api.whatsapp.com/send?phone=98194737478"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#25D366",
            color: "white",
            "&:hover": {
              backgroundColor: "#128C7E",
            },
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 30, md: 36 } }} />
        </IconButton>

        <IconButton
          href="https://t.me/samen_Admin1001"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#0088cc",
            color: "white",
            "&:hover": {
              backgroundColor: "#0077b5",
            },
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
          }}
        >
          <TelegramIcon sx={{ fontSize: { xs: 30, md: 36 } }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SocialFixed;
