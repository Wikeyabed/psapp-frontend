import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

function Logo({ small }) {
  return (
    <Box
      sx={{
        width: small ? 80 : 130,
      }}
      display={"flex"}
      justifySelf={"center"}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/logo.png`}
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
