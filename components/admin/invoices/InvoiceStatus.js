import React from "react";
import { Stack, Chip } from "@mui/material";
function InvoiceStatus() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="پرداخت شده" color="success" />
    </Stack>
  );
}

export default InvoiceStatus;
