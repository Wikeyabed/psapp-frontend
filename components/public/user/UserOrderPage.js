import PublicLayout from "../layout";
import { Grid, Paper, Typography } from "@mui/material";
import ToPersianDate from "../../../src/TimestampToPersian";
import moment from "moment-jalaali";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { persianNumber } from "../../../src/PersianDigits";
import { useEffect, useState } from "react";
import OrderStatus from "../../admin/orders/OrderStatus";
function UserOrderPage({ order }) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    let strings = [];
    for (let i = 0; i < order.products.length; i++) {
      strings.push(JSON.parse(order.products[i]));
    }
    setRows(strings);
  }, []);

  return (
    <PublicLayout>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid
          sx={{
            p: 4,
          }}
          component={Paper}
          item
          xs={12}
          md={8}
          lg={6}
        >
          <Typography variant="h4" textAlign={"center"}>
            شماره فاکتور : {order.order_number}
          </Typography>

          <Typography
            sx={{
              my: 2,
            }}
            color={"Highlight"}
            variant="subtitle1"
          >
            تاریخ صدور: {moment.unix(order.order_date).format("jYYYY/jMM/jDD")}
          </Typography>

          <Typography color={"Highlight"} variant="subtitle1">
            تاریخ دریافت:{" "}
            {moment.unix(order.delivery_date).format("jYYYY/jMM/jDD")}
          </Typography>

          <Typography color={"#000"} variant="subtitle1">
            نحوه دریافت :{" "}
            {order.delivery_type == "in-person"
              ? "حضوری از انبار ما"
              : order.delivery_type == "snap"
              ? "از طریق اسنپ (مخصوص تهران)"
              : order.delivery_type == "shipping"
              ? "از طریق باربری (مخصوص شهرستان)"
              : order.delivery_type == "posting"
              ? "ارسال از طریق پست یا تیپاکس"
              : ""}
          </Typography>

          <Typography
            sx={{
              my: 4,
              display: "flex",
            }}
            component={"div"}
            variant="subtitle1"
          >
            وضعیت فاکتور : <OrderStatus status={order.status} />
          </Typography>

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
                  <TableCell align="right"> نام محصول</TableCell>
                  <TableCell align="right">تعداد</TableCell>
                  <TableCell align="right">قیمت هر عدد</TableCell>
                  <TableCell align="right">قیمت کل</TableCell>
                  <TableCell align="right">درصد تخفیف</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .sort((a, b) => a.total_price - b.total_price)
                  .map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.product_name}</TableCell>
                      <TableCell align="right">
                        {persianNumber(row.product_quantity)}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {persianNumber(row.unit_price)} ریال
                      </TableCell>

                      <TableCell align="right">
                        {" "}
                        {persianNumber(row.total_price)} ریال
                      </TableCell>

                      <TableCell align="right">
                        {" "}
                        {row.product_discount}{" "}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            sx={{
              my: 4,
              color: "darkred",
              textAlign: "center",
            }}
          >
            قیمت کل فاکتور : {persianNumber(order.finished_price)} ریال
          </Typography>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default UserOrderPage;
