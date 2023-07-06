import { Grid } from "@mui/material";
import InvoicesTable from "../../admin/invoices/InvoicesTable";

function UserInvoices() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoicesTable />
      </Grid>
    </Grid>
  );
}

export default UserInvoices;
