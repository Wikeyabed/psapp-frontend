import AdminLayout from "../layout";
import { Grid } from "@mui/material";
import TopCards from "./TopCards";
import OrdersTable from "./OrdersTable";

function OrderList({ orders }) {
  return (
    <AdminLayout>
      <Grid xs={12} item container>
        <TopCards orders={orders} />
        <OrdersTable orders={orders} />
      </Grid>
    </AdminLayout>
  );
}

export default OrderList;
