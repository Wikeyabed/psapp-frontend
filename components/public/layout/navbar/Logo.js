import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import Link from "../../../../src/Link";

function Logo({ small }) {
  return (
    <Box
      sx={{
        width: small ? 80 : 130,
        position: "absolute",
        right: 20,
        top: 0,
      }}
      display={"flex"}
      justifySelf={"center"}
      component={Link}
      // href="/shop"

      href="/"
    >
      <Image
        src={`https://api.eebox.ir/static/logo.png`}
        // src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/logo.png`}
        width={0}
        height={0}
        sizes="100vh"
        alt="ebox"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
}

export default Logo;
