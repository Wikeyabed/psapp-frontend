import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  useMediaQuery,
} from "@mui/material";

import Link from "../../../src/Link";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  marginTop: 150,
  padding: 20,
  borderRadius: "10px",
}));

const Card = styled(Grid)(({ theme }) => ({
  margin: "auto",
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginBottom: 5,
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",
  // display: "block",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    overflow: "unset",
  },
}));

function LoginForm() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component={FormControl} container spacing={2}>
        <Card item xs={10} md={3}>
          <Grid component={Item} elevation={4} container>
            <Grid sx={{ mb: 6 }} item xs={12}>
              <Typography sx={{ mb: 5 }} variant="h6">
                ورود به حساب کاربری
              </Typography>

              <RtlTextField fullWidth label="شماره تماس" />
              <RtlTextField fullWidth label="رمز عبور" type="password" />
            </Grid>

            <Grid xs={6} item>
              <Button sx={{ p: 1 }} fullWidth variant="contained">
                ورود
              </Button>
            </Grid>

            <Grid xs={6} item>
              {" "}
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="مرا به خاطر بسپار"
              />
            </Grid>

            <Grid
              href="/shop"
              sx={{
                fontSize: 12,
                textAlign: "center",
                mt: 4,
                textDecoration: "none",
              }}
              component={Link}
              item
              xs={12}
            >
              بازگشت به فروشگاه
            </Grid>

            <Grid
              href="/auth/register"
              sx={{
                fontSize: 14,
                textAlign: "center",
                mt: 4,
                textDecoration: "none",
                color: "darkgray",
              }}
              component={Link}
              item
              xs={12}
            >
              حساب کاربری ندارید ؟ ثبت نام کنید
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}

export default LoginForm;
