import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import Link from "../../../../src/Link";

function MobileLogo({ small }) {
  return (
    <Box
      sx={{
        width: 100,
        position: "absolute",
        right: 0,
        top: 30,
        px: 2,
        background: "linear-gradient(to top, #2F2235, #543d5e , #7B6D8D )",

        pt: "2px",
        // backgroundColor: "#fff",
        // border: "1px solid #2F2235",
        borderBottomLeftRadius: "10px",
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
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </Box>
  );
}

export default MobileLogo;
