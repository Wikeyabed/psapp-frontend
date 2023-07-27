import { Button, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
// @refresh reset

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginTop: 5,
  marginBottom: 5,
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",

  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    overflow: "unset",
  },
}));

export default function UserProfile() {
  return (
    <Grid container>
      <Grid item md={2}></Grid>
      <Grid
        item
        md={8}
        container
        sx={{
          mt: 1,
          p: 1,
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center !important",
            }}
          >
            {" "}
            اطلاعات کاربری{" "}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <RtlTextField
            size="medium"
            defaultValue={"علی رضا"}
            placeholder="نام"
            label="نام"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RtlTextField
            disabled
            defaultValue={"محمدی"}
            size="medium"
            placeholder="نام خانوادگی"
            label="نام خانوادگی"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RtlTextField
            label="رمز عبور جدید"
            size="medium"
            type="password"
            placeholder="رمز عبور جدید"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RtlTextField
            label="تکرار رمز عبور جدید"
            size="medium"
            type="password"
            placeholder="تکرار رمز عبور جدید"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RtlTextField
            multiline
            maxRows={4}
            minRows={4}
            label="آدرس"
            type="textarea"
            placeholder="آدرس"
          />
        </Grid>
        <Grid container item xs={12} md={6}>
          <Grid item xs={12}>
            <RtlTextField
              label="شماره تماس"
              disabled
              defaultValue={"09198169771"}
              size="medium"
              type="text"
              placeholder="شماره تماس"
            />
          </Grid>

          <Grid item xs={6}>
            {" "}
            <RtlTextField
              label="کد دریافتی"
              type="number"
              placeholder="کد دریافتی"
            />
          </Grid>
          <Grid
            sx={{
              paddingTop: "14px ",
              paddingRight: "14px ",
            }}
            xs={6}
            item
          >
            {" "}
            <Button fullWidth size="large" variant="outlined">
              دریافت کد تایید
            </Button>
          </Grid>
        </Grid>

        {/*  */}

        <Grid item xs={12} md={6}>
          <Button fullWidth size="large" variant="contained">
            اعمال تفییرات
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
