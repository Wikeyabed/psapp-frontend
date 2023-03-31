import AdminLayout from "../layout";
import { Grid } from "@mui/material";
import TopCards from "./TopCards";
import InvoicesTable from "./InvoicesTable";

function InvoiceList() {
  return (
    <AdminLayout>
      <Grid xs={12} container>
        <TopCards />
        <InvoicesTable />
      </Grid>
    </AdminLayout>
  );
}

export default InvoiceList;
