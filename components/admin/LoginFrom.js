import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { Rtt } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lightBg,
  padding: theme.spacing(1),
  textAlign: "center",
  margin: "auto",
  maxWidth: 500,
  marginTop: 100,
}));

const TextInput = styled(TextField)(({ theme }) => ({
  padding: 5,
  direction: "rtl",
  textAlign: "right",
}));

function LoginFrom() {
  return (
    <Box>
      <Grid>
        <Item>
          <TextInput
            variant="outlined"
            placeholder="مثال : ۰۹۱۲۱۲۳۴۵۶۷"
            label="شماره موبایل"
          />
          <TextInput
            variant="outlined"
            placeholder="مثال : ۰۹۱۲۱۲۳۴۵۶۷"
            label="شماره موبایل"
          />
        </Item>
      </Grid>
    </Box>
  );
}

export default LoginFrom;
