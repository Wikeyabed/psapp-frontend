import Link from "@mui/material/Link";
import { Instagram, Telegram } from "@mui/icons-material";
import { Box } from "@mui/material";
import Ita from "../../../../public/images/ita.svg";
import Image from "next/image";

function SocialMediaBar() {
  const styles = {
    borderRadius: "100%",
    display: "flex",
    backgroundColor: "primary.main",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    mb: 1,
    "&:hover": {
      backgroundColor: "secondary.main",
    },
  };
  return (
    <Box
      sx={{
        width: 156,
        display: "flex",

        left: "44%",
        position: "absolute",
        justifyContent: "space-evenly",
      }}
    >
      {" "}
      <Link
        sx={styles}
        href="https://t.me/ebox_shop/"
        target="_blank"
        color="inherit"
      >
        <Telegram />
      </Link>
      <Link
        href="https://www.instagram.com/eebox.ir"
        color="inherit"
        sx={styles}
      >
        <Instagram />
      </Link>
      <Link sx={styles} href="https://eitaa.com/eboxir/" color="inherit">
        <Image
          style={{
            marginBottom: 2,
            filter: "brightness(0) invert(1)",
          }}
          width={20}
          height={20}
          src={Ita}
          alt="ita"
        />
      </Link>
    </Box>
  );
}

export default SocialMediaBar;
