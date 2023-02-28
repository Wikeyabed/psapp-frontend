import * as React from "react";

import { Box, Stack, Link, Typography, Breadcrumbs } from "@mui/material";

export default function NavigationBar() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      داشبورد
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      کاربران
    </Link>,
    <Typography key="3" color="text.primary">
      ممد یوسفی
    </Typography>,
  ];

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#fdfdfd",
        // borderBottom: ".5px solid #e2e2e2",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <Stack spacing={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Box>
  );
}
