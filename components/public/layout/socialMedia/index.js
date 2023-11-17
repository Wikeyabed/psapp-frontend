import Link from "@mui/material/Link";
import { Instagram, Telegram } from "@mui/icons-material";
import { Box } from "@mui/material";
import Ita from "../../../../public/images/ita.svg";
import Image from "next/image";

function SocialMediaBar() {
  return (
    <Box
      sx={{
        filter: "brightness(0) invert(1)",
      }}
    >
      {" "}
      <Link href="https://t.me/ebox_shop/" target="_blank" color="inherit">
        <Telegram />
      </Link>
      <Link
        href="https://www.instagram.com/eebox.ir"
        color="inherit"
        sx={{ pl: 1, pr: 1 }}
      >
        <Instagram />
      </Link>
      <Link href="https://eitaa.com/eboxir/" color="inherit">
        <Image
          style={{
            marginBottom: 2,
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
