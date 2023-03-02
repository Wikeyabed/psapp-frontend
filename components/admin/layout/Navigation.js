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
        minHeight: 64,
        paddingRight: "16px",
        paddingTop: "16px",
      }}
    >
      <Stack>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Box>
  );
}
