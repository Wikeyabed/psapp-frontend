import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { persianNumber } from "../src/PersianDigits";
import Link from "../src/Link";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid
            sx={{
              textAlign: "center",
            }}
            xs={12}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/404.avif`}
              alt="404"
              width={250}
              height={250}
            />
          </Grid>
          <Grid
            sx={{
              textAlign: "center",
              alignContent: "center",
              marginX: "auto",
            }}
            xs={12}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
              }}
              variant="h1"
            >
              {persianNumber(404)}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
              }}
              fontStyle={"italic"}
              variant="h6"
            >
              صفحه ای که به دنبال آن میگردید وجود ندارد
            </Typography>
            <Button
              component={Link}
              href="/shop"
              sx={{
                mt: 4,
              }}
              variant="outlined"
            >
              بازگشت به فروشگاه
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
