import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import ToPersianDate from "../../../src/TimestampToPersian";
import OrderStatus from "../../admin/orders/OrderStatus";
import { persianNumber } from "../../../src/PersianDigits";

function UserOrders() {
  const [rows, setRows] = useState([]);
  const handleOrdersByUserId = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-orders/`, requestOptions)
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
      <TableContainer component={Paper}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row.i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور {row.order_number}</TableCell>
                <TableCell align="right">
                  <ToPersianDate timestamp={row.order_date} />
                </TableCell>
                <TableCell align="right">
                  <OrderStatus status={row.status} />
                </TableCell>
                <TableCell align="right">
                  {" "}
                  {persianNumber(row.finished_price)} ریال
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={handleOrdersByUserId}>کلیک تو چک</button>
    </>
  );
}

export default UserOrders;
