import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: theme.palette.primary.main.lightBg,
  position: "relative",
  borderRadius: 20,
  boxShadow: "rgb(0 0 0 / 4%) 0px 5px 22px, rgb(0 0 0 / 3%) 0px 0px 0px 0.5px",
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  padding: 15,
}));

const columns = [
  { field: "id", headerName: "آیدی فاکتور" },
  { field: "firstName", headerName: "خریدار" },
  { field: "lastName", headerName: "تاریخ" },
  { field: "lastName", headerName: "تاریخ" },
];

const rows = [
  { id: 1, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 2, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 3, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 4, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 5, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 6, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 7, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 8, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
  { id: 9, lastName: "عبدالله نوروزی", firstName: "خانی آباد" },
];

export default function ProductsTable() {
  return (
    <CardContainer>
      <DashboardCard>
        <div style={{ width: "100%", height: "480px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </DashboardCard>
    </CardContainer>
  );
}
