import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Divider, TablePagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import Link from "../../../src/Link";
import UserOrderStatus from "./UserOrderStatus";

function UserOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [rows, setRows] = useState([]);
  const handleOrdersByUserId = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/client-orders/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRows(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    handleOrdersByUserId();
  }, []);

  return (
    <>
      {" "}
      {rows.length > 0 ? (
        <>
          {" "}
          <Typography variant="h5" sx={{ textAlign: "center", mt: 4, mb: 2 }}>
            فاکتورها
          </Typography>
          <Divider />
          <TableContainer
            sx={{
              minHeight: 600,
            }}
          >
            <Table
              sx={{
                minWidth: 650,
                direction: "rtl !important",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">شماره فاکتور</TableCell>
                  <TableCell align="right">تاریخ صدور</TableCell>
                  <TableCell align="right">وضعیت</TableCell>
                  <TableCell align="right">مبلغ کل</TableCell>
                  <TableCell align="right">چاپ فاکتور</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .sort((a, b) => b.order_number - a.order_number)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      key={row.i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component={Link}
                        href={`/user/orders/${row.order_id}`}
                        align="right"
                      >
                        فاکتور {row.order_number}
                      </TableCell>
                      <TableCell align="right">
                        <ToPersianDate timestamp={row.order_date} />
                      </TableCell>
                      <TableCell align="right">
                        <UserOrderStatus status={row.status} />
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {persianNumber(row.finished_price)} ریال
                      </TableCell>

                      <TableCell align="right">
                        {" "}
                        <Button
                          sx={{
                            fontSize: 10,
                          }}
                          component={Link}
                          href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/user/print/${row.order_id}`}
                          target="_blank"
                          variant="contained"
                        >
                          چاپ فاکتور
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              rowsPerPageOptions={[10, 25]}
              rowsPerPage={rowsPerPage}
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="تعداد ردیف ها در صفحه"
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </TableContainer>
        </>
      ) : (
        "فاکتوری موجود نیست"
      )}
    </>
  );
}

export default UserOrders;
