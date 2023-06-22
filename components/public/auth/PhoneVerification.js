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
import { MuiOtpInput } from "mui-one-time-password-input";

import Link from "../../../src/Link";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  marginTop: 150,
  padding: 20,
}));

const Card = styled(Grid)(({ theme }) => ({
  margin: "auto",
  backgroundColor: theme.palette.primary.lightBg,
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginTop: 5,
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

function PhoneVerification() {
  const [otp, setOtp] = React.useState("");
  const [sms, setSms] = React.useState(false);
  const [counter, setCounter] = React.useState(120);
  const [counterStarted, setCounterStarted] = React.useState(false);

  React.useEffect(() => {
    console.log("loging Effect");
    if (counterStarted) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  const handleCountDown = () => {
    setCounterStarted(true);
    console.log(counterStarted);
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component={FormControl} container spacing={2}>
        <Card item xs={10} md={3}>
          <Grid component={Item} container>
            {1 > 2 ? (
              <>
                <Grid sx={{ mb: 6 }} item xs={12}>
                  <Typography sx={{ mb: 5 }} variant="h6">
                    کد دریافتی را وارد کنید
                  </Typography>
                  <MuiOtpInput
                    sx={{
                      direction: "ltr !important",
                      textAlign: "left !important",
                    }}
                    length={6}
                    value={otp}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    onClick={handleCountDown}
                    size="large"
                    sx={{ p: 2 }}
                    fullWidth
                    variant="contained"
                  >
                    ثبت کد
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid sx={{ mb: 6 }} item xs={12}>
                  <Typography sx={{ mb: 5 }} variant="h6">
                    شماره موبایل خود را وارد کنید
                  </Typography>
                  <RtlTextField type="number" fullWidth label="شماره تماس" />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    // disabled={counterStarted === true}
                    onClick={handleCountDown}
                    size="large"
                    sx={{ p: 2 }}
                    fullWidth
                    variant="contained"
                  >
                    دریافت کد {counter}
                  </Button>
                </Grid>
              </>
            )}

            <Grid
              href="/auth/login"
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
              حساب کاربری دارید ؟ وارد شوید
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}

export default PhoneVerification;
