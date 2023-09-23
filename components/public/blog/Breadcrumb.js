import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { NavigateBefore } from "@mui/icons-material";
import Link from "../../../src/Link";
export default function BlogNav({ blogId, blogTitle }) {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/blog"
      sx={{
        textDecoration: "none !important",
        "&:hover": {
          color: "#444 !important",
        },
      }}
    >
      بلاگ
    </Link>,
    <Link
      sx={{
        textDecoration: "none !important",
        "&:hover": {
          color: "#444 !important",
        },
      }}
      key="2"
      color="inherit"
      href={`/blog/${blogId}`}
    >
      {blogTitle}
    </Link>,
    ,
  ];

  return (
    <Breadcrumbs
      display={"flex"}
      justifyContent={"center"}
      separator={<NavigateBefore fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}
