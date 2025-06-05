import PublicLayout from "../layout";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
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
import UserOrderStatus from "./UserOrderStatus";
import OrderPdf from "./OrderPdf";
import Link from "../../../src/Link";

function UserOrderPage({ order }) {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (order?.products) {
      const parsedProducts = order.products.map((product) =>
        JSON.parse(product)
      );
      setRows(parsedProducts);
    }
  }, [order]);

  const deliveryTypeText = {
    "in-person": "حضوری از انبار ما",
    snap: "از طریق اسنپ (مخصوص تهران)",
    shipping: "از طریق باربری (مخصوص شهرستان)",
    posting: "ارسال از طریق پست یا تیپاکس",
  };

  const tableCellStyles = {
    fontSize: { xs: "0.75rem", sm: "0.875rem" },
    padding: { xs: "8px 4px", sm: "12px 6px" },
    textAlign: "center",
    borderColor: theme.palette.primary.lightBg,
    "&:last-child": {
      paddingRight: { xs: "4px", sm: "6px" },
    },
  };

  return (
    <PublicLayout>
      <Grid container justifyContent="center" sx={{ p: { xs: 1, sm: 2 } }}>
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: theme.palette.primary.borderRadius,
              backgroundColor: theme.palette.primary.lightBg,
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 1, sm: 0 },
                }}
              >
                ایباکس
              </Typography>

              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <Typography variant="body2" color="secondary">
                  تاریخ ثبت فاکتور:{" "}
                  <Typography component="span" color="text.primary">
                    {moment.unix(order.order_date).format("jYYYY/jMM/jDD")}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="secondary">
                  تاریخ دریافت مرسوله:{" "}
                  <Typography component="span" color="text.primary">
                    {moment.unix(order.delivery_date).format("jYYYY/jMM/jDD")}
                  </Typography>
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                my: 2,
                borderColor: theme.palette.primary.borderColor,
                opacity: 0.5,
              }}
            />

            {/* Order Info Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: 3,
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                شماره فاکتور: {order.order_number}
              </Typography>

              <Button
                component={Link}
                href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/user/print/${order.order_id}`}
                target="_blank"
                variant="contained"
                sx={{
                  background: theme.palette.primary.gradient,
                  borderRadius: theme.palette.primary.borderRadius,
                  px: 3,
                  py: 1,
                  "&:hover": {
                    opacity: 0.9,
                    background: theme.palette.primary.gradient,
                  },
                }}
              >
                چاپ فاکتور
              </Button>
            </Box>

            {/* Delivery Info */}
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                p: 1,
                backgroundColor: theme.palette.primary.lightBg,
                borderRadius: theme.palette.primary.borderRadius,
                border: `1px solid ${theme.palette.primary.borderColor}`,
              }}
            >
              <Typography component="span" color="secondary">
                نحوه دریافت:{" "}
              </Typography>
              {deliveryTypeText[order.delivery_type] || ""}
            </Typography>

            {/* Tracking and Status */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: 3,
                gap: 2,
              }}
            >
              <Typography variant="body2">
                شماره پیگیری:{" "}
                <Typography component="span" color="primary" fontWeight={600}>
                  {order.track_id}
                </Typography>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="secondary">
                  وضعیت فاکتور:
                </Typography>
                <UserOrderStatus status={order.status} />
              </Box>
            </Box>

            {/* Products Table */}
            <TableContainer
              component={Paper}
              sx={{
                border: `1px solid ${theme.palette.primary.borderColor}`,
                borderRadius: theme.palette.primary.borderRadius,
                overflowX: "auto",
                mb: 3,
              }}
            >
              <Table sx={{ minWidth: 300 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "& th": {
                        color: theme.palette.primary.textWhite,
                        fontWeight: 600,
                        ...tableCellStyles,
                      },
                    }}
                  >
                    <TableCell>نام محصول</TableCell>
                    <TableCell>تعداد</TableCell>
                    <TableCell>قیمت هر عدد</TableCell>
                    <TableCell>قیمت کل</TableCell>
                    <TableCell>تخفیف</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .sort((a, b) => a.total_price - b.total_price)
                    .map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:nth-of-type(even)": {
                            backgroundColor: theme.palette.primary.lightBg,
                          },
                          "&:last-child td": {
                            borderBottom: 0,
                          },
                        }}
                      >
                        <TableCell sx={tableCellStyles}>
                          {row.product_name}
                        </TableCell>
                        <TableCell sx={tableCellStyles}>
                          {persianNumber(row.product_quantity)}
                        </TableCell>
                        <TableCell sx={tableCellStyles}>
                          {persianNumber(row.unit_price)} ریال
                        </TableCell>
                        <TableCell sx={tableCellStyles}>
                          {persianNumber(row.total_price)} ریال
                        </TableCell>
                        <TableCell sx={tableCellStyles}>
                          {row.product_discount}%
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {/* Total Price */}
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.palette.primary.lightBg,
                  borderTop: `1px solid ${theme.palette.primary.borderColor}`,
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  قیمت کل فاکتور:
                </Typography>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  {persianNumber(order.finished_price)} ریال
                </Typography>
              </Box>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default UserOrderPage;
