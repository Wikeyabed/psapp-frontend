import AdminLayout from "../layout";
import { Grid } from "@mui/material";
import TopCards from "./TopCards";
import InvoicesTable from "./InvoicesTable";

function InvoiceList({ invoices }) {
  return (
    <AdminLayout>
      <Grid xs={12} item container>
        <TopCards invoices={invoices} />
        <InvoicesTable invoices={invoices} />
      </Grid>
    </AdminLayout>
  );
}

export default InvoiceList;
