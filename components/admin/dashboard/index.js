import React from "react";
import AdminLayout from "../layout";

import { Grid, Box, Paper } from "@mui/material";
import styled from "@emotion/styled";

import TopBoxes from "./TopBoxes";
import DashboardCharts from "./DashboardCharts";

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: theme.palette.primary.main.lightBg,
  maxHeight: "100%",
  position: "relative",
  width: "100%",
  borderRadius: 20,
  boxShadow: "rgb(0 0 0 / 4%) 0px 5px 22px, rgb(0 0 0 / 3%) 0px 0px 0px 0.5px",
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  padding: 15,
}));

function AdminDashboard() {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <TopBoxes />

          <DashboardCharts />
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default AdminDashboard;
