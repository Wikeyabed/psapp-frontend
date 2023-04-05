import React from "react";
import { Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "20%",
  margin: "auto",
  marginBottom: "10px",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderRadius: "50%",
  opacity: "0.5",
}));

function FormTile({ title, textVariant = "h6" }) {
  return (
    <>
      {" "}
      <Typography
        variant={textVariant}
        sx={{
          p: 1,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <StyledDivider />
    </>
  );
}

export default FormTile;
