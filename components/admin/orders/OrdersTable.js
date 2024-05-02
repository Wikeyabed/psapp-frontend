import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
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

const RtlTextField = styled(TextField)(({ theme }) => ({
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
  },
}));

const OrdersTable = ({ orders }) => {
  const [open, setOpen] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredOrders = orders
    ? orders.filter((order, i) => {
        if (category == "All") {
          return (
            order.customer_name.includes(searchValue) ||
            order.order_number.toString().includes(searchValue)
          );
        } else if (category == "finished") {
          return (
            (order.customer_name.includes(searchValue) &&
              order.status == "200") ||
            (order.order_number.toString().includes(searchValue) &&
              order.status == "200")
          );
        } else if (category == "in-progress") {
          return (
            (order.customer_name.includes(searchValue) &&
              order.status == "100") ||
            (order.order_number.toString().includes(searchValue) &&
              order.status == "100")
          );
        } else if (category == "last") {
          return (
            (order.customer_name.includes(searchValue) &&
              i >= orders.length - 10) ||
            (order.order_number.toString().includes(searchValue) &&
              i >= orders.length - 10)
          );
        }
      })
    : [];

  return (
    <Grid item xs={12} sx={{ marginTop: "20px", padding: "20px" }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: "10px", textAlign: "center" }}
      >
        فاکتور ها
      </Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            padding: "10px",
          }}
        >
          <RtlTextField
            id="search-products"
            variant="outlined"
            onChange={handleSearch}
            placeholder="جستجو کنید"
            sx={{ width: "100%", margin: "auto" }}
            size="small"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            padding: "10px",
          }}
        >
          <Select
            id="category-filter"
            value={category}
            onChange={handleCategoryChange}
            sx={{ width: "100%", margin: "auto" }}
            size="small"
          >
            <MenuItem value="All">تمامی فاکتور ها</MenuItem>
            <MenuItem value="finished">فاکتور های تکمیل شده</MenuItem>
            <MenuItem value="in-progress">فاکتور های در حال انجام</MenuItem>
            <MenuItem value="last">ده فاکتور آخر</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Box
        sx={{
          minHeight: 1024,
        }}
      >
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
              {filteredOrders
                .reverse()

                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort((a, b) => {
                  return b.order_date - a.order_date;
                })

                .map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell style={{ textAlign: "right" }}>
                      <Link href={`orders/${order.order_id}`}>
                        فاکتور شماره {order.order_number}
                      </Link>
                    </TableCell>

                    <TableCell style={{ textAlign: "right" }}>
                      {/* Generating order */}
                      <Link href={`users/${order.user_id}`}>
                        {order.customer_name}
                      </Link>{" "}
                    </TableCell>

                    <TableCell style={{ textAlign: "right" }}>
                      <ToPersianDate timestamp={order.order_date} />
                    </TableCell>

                    <TableCell style={{ textAlign: "right" }}>
                      <OrderStatus status={order.status} />
                    </TableCell>

                    <TableCell style={{ textAlign: "right" }}>
                      {/* {order.finished_price} */}
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
      </Box>
    </Grid>
  );
};

export default OrdersTable;
