import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import OrderStatus from "./OrderStatus";
import ToPersianDate from "../../../src/TimestampToPersian";
import Link from "../../../src/Link";
import { persianNumber } from "../../../src/PersianDigits";

const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.lightPrimary.main,
  borderRadius: "10px",
  color: theme.palette.primary.lightBg,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.lightBg,
  padding: "20px",
  textAlign: "right",
  minWidth: "180px",
}));

const OrdersTable = ({ orders }) => {
  const [open, setOpen] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid item xs={12} sx={{ marginTop: "20px", padding: "20px" }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: "10px", textAlign: "center" }}
      >
        فاکتور ها
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
        }}
      >
        <Table>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledTableCell>شماره فاکتور</StyledTableCell>

              <StyledTableCell>نام مشتری</StyledTableCell>
              <StyledTableCell>تاریخ صدور</StyledTableCell>

              <StyledTableCell>وضعیت</StyledTableCell>

              <StyledTableCell>مبلغ کل</StyledTableCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell style={{ textAlign: "right" }}>
                    <Link href={`orders/${order.order_id}`}>
                      فاکتور شماره {order.order_number}
                    </Link>
                  </TableCell>

                  <TableCell style={{ textAlign: "right" }}>
                    {/* Generating order */}

                    {order.customer_name}
                  </TableCell>

                  <TableCell style={{ textAlign: "right" }}>
                    <ToPersianDate timestamp={order.order_date} />
                  </TableCell>

                  <TableCell style={{ textAlign: "right" }}>
                    <OrderStatus status={order.status} />
                  </TableCell>

                  <TableCell style={{ textAlign: "right" }}>
                    {persianNumber(order.finished_price)} ریال
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          count={orders.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد ردیف ها در صفحه"
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </TableContainer>
    </Grid>
  );
};

export default OrdersTable;
