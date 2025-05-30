import React, { useState } from "react";
import AdminLayout from "../layout";
import { Grid, Box, Button } from "@mui/material";
import TopBoxes from "./TopBoxes";
import DashboardCharts from "./DashboardCharts";
import AdminChatPage from "../chat/AdminChatPage";

function AdminDashboard({ users, orders, products }) {
  const [tab, setTab] = useState("dashboard");

  return (
    <AdminLayout>
      <Box sx={{ mb: 2 }}>
        <Button
          variant={tab === "dashboard" ? "contained" : "outlined"}
          onClick={() => setTab("dashboard")}
          sx={{ mr: 1 }}
        >
          داشبورد
        </Button>
        <Button
          variant={tab === "chat" ? "contained" : "outlined"}
          onClick={() => setTab("chat")}
        >
          💬 چت آنلاین
        </Button>
      </Box>

      {tab === "dashboard" && (
        <Box>
          <Grid container>
            <TopBoxes users={users} orders={orders} products={products} />
            <DashboardCharts users={users} />
          </Grid>
        </Box>
      )}

      {tab === "chat" && <AdminChatPage />}
    </AdminLayout>
  );
}

export default AdminDashboard;
