import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { persianNumber } from "../../../src/PersianDigits";
import Link from "../../../src/Link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FailedPayment({ tid }) {
  const router = useRouter();

  const [counter, setCounter] = useState(5);
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
      // router.push("/shop");
    }
  }, [counter]);

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
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/error.png`}
              alt="404"
              width={200}
              height={200}
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
                my: 4,
              }}
              variant="h5"
            >
              {tid ? "شماره پیگیری  " + tid : ""}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
              }}
              fontStyle={"italic"}
              variant="h6"
            >
              مشکلی پیش آمده
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
              }}
              color={"Highlight"}
            >
              {" "}
              {counter} : در حال بازگشت به فروشگاه{" "}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
