import Link from "@mui/material/Link";
import { BorderLeft, Instagram, Padding, Telegram } from "@mui/icons-material";
import { Box } from "@mui/material";
import Ita from "../../../../public/images/ita.svg";
import Image from "next/image";

function SocialMediaBar() {
  const styles = {
    borderRadius: "100%",
    display: "flex",
    color: "#fff",
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    Padding: 2,
    mx: 3,

    "&:hover": {
      transform: "scale(1.2)",
    },
  };
  return (
    <Box
      sx={{
        width: 100,
        display: "flex",
        right: "0",
        top: 8,
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
