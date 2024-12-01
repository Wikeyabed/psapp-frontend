import PublicLayout from "../layout";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import ToPersianDate from "../../../src/TimestampToPersian";
import moment from "moment-jalaali";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { persianNumber } from "../../../src/PersianDigits";
import React, { useEffect, useState } from "react";
import OrderStatus from "../../admin/orders/OrderStatus";
import OrderPdf from "./OrderPdf";

import ReactPDF from "@react-pdf/renderer";

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
            py: 4,
          }}
          item
          xs={12}
          md={8}
          lg={6}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" color={"primary"} textAlign={"center"}>
              ایباکس
            </Typography>
            <Typography variant="body2" color={"secondary"} textAlign={"right"}>
              تاریخ ثبت فاکتور:
              <span
                style={{
                  color: "#333",
                }}
              >
                {" "}
                {moment.unix(order.order_date).format("jYYYY/jMM/jDD")}
              </span>
              <br />
              تاریخ دریافت مرسوله:{" "}
              <span
                style={{
                  color: "#333",
                }}
              >
                {" "}
                {moment.unix(order.delivery_date).format("jYYYY/jMM/jDD")}
              </span>
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 2,
            }}
          />

          <Box
            sx={{
              my: 3,
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h6"}>
              شماره فاکتور : {order.order_number}
            </Typography>

            <Box>
              <Button onClick={() => renderPdf()} variant="contained">
                چاپ فاکتور
              </Button>
            </Box>
          </Box>

          <Typography color={"#000"} variant="body2">
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

          <Box
            sx={{
              my: 3,
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Typography
              sx={{
                my: 2,
              }}
              variant={"body2"}
            >
              شماره پیگیری: {order.track_id}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                mt: { xs: 3, md: 0 },
                mb: 2,
                fontSize: "15px",
              }}
              component={"div"}
              variant="subtitle1"
            >
              {" "}
              وضعیت فاکتور : <OrderStatus status={order.status} />
            </Typography>
          </Box>

          <TableContainer
            sx={{
              border: "1px solid #555",
              borderRadius: "10px",
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
                  <TableCell
                    sx={{
                      fontSize: "10px",
                    }}
                    align="center"
                  >
                    {" "}
                    نام محصول
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "10px",
                    }}
                    align="center"
                  >
                    تعداد
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "10px",
                    }}
                    align="center"
                  >
                    قیمت هر عدد
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "10px",
                    }}
                    align="center"
                  >
                    قیمت کل
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "10px",
                    }}
                    align="center"
                  >
                    درصد تخفیف
                  </TableCell>
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
                      <TableCell
                        sx={{
                          fontSize: "11px",
                          width: "20% !important",
                        }}
                        align="center"
                      >
                        {row.product_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "11px",
                          width: "20% !important",
                        }}
                        align="center"
                      >
                        {persianNumber(row.product_quantity)}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "11px",
                          width: "20% !important",
                        }}
                        align="center"
                      >
                        {" "}
                        {persianNumber(row.unit_price)} ریال
                      </TableCell>

                      <TableCell
                        sx={{
                          fontSize: "11px",
                          width: "20% !important",
                        }}
                        align="center"
                      >
                        {" "}
                        {persianNumber(row.total_price)} ریال
                      </TableCell>

                      <TableCell
                        sx={{
                          fontSize: "11px",
                          width: "20% !important",
                        }}
                        align="center"
                      >
                        {" "}
                        {row.product_discount}{" "}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Divider />
            <Typography
              variant="body2"
              sx={{
                p: "15px",
                color: "darkred",
                textAlign: "left",
              }}
            >
              <span style={{ color: "#000" }}>قیمت کل فاکتور :</span>
              &nbsp;
              {persianNumber(order.finished_price)} ریال
            </Typography>
          </TableContainer>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default UserOrderPage;
