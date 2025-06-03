import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Select,
  MenuItem,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
  Chip,
  Stack,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
// import ToPersianDate from "../../../src/TimestampToPersian";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import OrderStatusInside from "./OrderStatus";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const OrderContainer = styled(Box)(({ theme }) => ({
  padding: "24px",
  marginLeft: { lg: "280px", xl: "320px" },
  maxWidth: "1200px",
}));

const OrderHeader = styled(Paper)(({ theme }) => ({
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  boxShadow: theme.shadows[1],
}));

const OrderDetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const OrderDetailLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const OrderDetailValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));

const ProductsTable = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: theme.shadows[1],
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  fontWeight: 600,
  color: theme.palette.text.secondary,
  padding: "16px",
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StatusSelect = styled(Select)(({ theme }) => ({
  minWidth: "200px",
  "& .MuiSelect-select": {
    padding: "8px 32px 8px 12px",
  },
}));

const DeliveryChip = styled(Chip)(({ theme, type }) => ({
  backgroundColor:
    type === "in-person"
      ? theme.palette.info.light
      : type === "snap"
      ? theme.palette.warning.light
      : type === "shipping"
      ? theme.palette.success.light
      : theme.palette.primary.light,
  color:
    type === "in-person"
      ? theme.palette.info.dark
      : type === "snap"
      ? theme.palette.warning.dark
      : type === "shipping"
      ? theme.palette.success.dark
      : theme.palette.primary.dark,
  fontWeight: 600,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  marginLeft: "8px",
  "&:first-of-type": {
    marginLeft: 0,
  },
}));

const OrderPage = ({ order }) => {
  const user = useSelector((state) => state.auth.userInformation);
  // Sample data
  const [rows, setRows] = useState([]);

  // const router = useRouter();
  // const { id } = router.query;

  useEffect(() => {
    let prodArr = [];
    order.products.map((prod) => {
      prodArr.push(JSON.parse(prod));
    });

    setRows(prodArr);

    console.log(prodArr);
  }, []);

  return (
    <AdminLayout>
      <OrderContainer>
        <OrderHeader elevation={1}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            فاکتور شماره: {order.order_number}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">مشتری:</OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                {order.customer_name}
              </OrderDetailValue>
            </OrderDetailItem>

            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">
                شماره تماس:
              </OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                {order.customer_phone}
              </OrderDetailValue>
            </OrderDetailItem>

            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">
                تاریخ صدور:
              </OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                <ToPersianDate timestamp={order.order_date} />
              </OrderDetailValue>
            </OrderDetailItem>

            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">
                تاریخ تحویل:
              </OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                <ToPersianDate timestamp={order.delivery_date} />
              </OrderDetailValue>
            </OrderDetailItem>

            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">
                نحوه دریافت:
              </OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                <DeliveryChip
                  label={
                    order.delivery_type == "in-person"
                      ? "حضوری از انبار"
                      : order.delivery_type == "snap"
                      ? "اسنپ (تهران)"
                      : order.delivery_type == "shipping"
                      ? "باربری (شهرستان)"
                      : order.delivery_type == "posting"
                      ? "پست/تیپاکس"
                      : ""
                  }
                  type={order.delivery_type}
                />
              </OrderDetailValue>
            </OrderDetailItem>

            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">
                آدرس تحویل:
              </OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                {order.delivery_address}
              </OrderDetailValue>
            </OrderDetailItem>
          </Box>
          {/* 
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              تغییر وضعیت فاکتور:
            </Typography>
            <StatusSelect value={order.status} onChange={handleStatusChange}>
              <MenuItem value={order.status}>وضعیت فعلی</MenuItem>
              <MenuItem value={"100"}>در حال پردازش</MenuItem>
              <MenuItem value={"200"}>تکمیل شده</MenuItem>
              <MenuItem value={"-2"}>کنسل شده</MenuItem>
            </StatusSelect>
          </Box> */}
        </OrderHeader>

        <ProductsTable elevation={0}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableHeaderCell align="right">نام محصول</TableHeaderCell>
                <TableHeaderCell align="right">تعداد</TableHeaderCell>
                <TableHeaderCell align="right">قیمت هر عدد</TableHeaderCell>
                <TableHeaderCell align="right">قیمت کل</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.product_name} hover>
                  <TableCellStyled align="right">
                    {row.product_name}
                  </TableCellStyled>
                  <TableCellStyled align="right">
                    {persianNumber(row.product_quantity)}
                  </TableCellStyled>
                  <TableCellStyled align="right">
                    {persianNumber(row.unit_price)} ریال
                  </TableCellStyled>
                  <TableCellStyled align="right">
                    {persianNumber(row.total_price)} ریال
                  </TableCellStyled>
                </TableRow>
              ))}
              <TableRow>
                <TableCellStyled colSpan={3} align="left">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    مبلغ کل فاکتور:
                  </Typography>
                </TableCellStyled>
                <TableCellStyled align="right">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {persianNumber(order.finished_price)} ریال
                  </Typography>
                </TableCellStyled>
              </TableRow>
            </TableBody>
          </Table>
        </ProductsTable>

        <Paper sx={{ p: 3, mt: 3, borderRadius: "12px", boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            توضیحات فاکتور:
          </Typography>
          <Typography variant="body1">
            {order.order_description || "توضیحاتی ثبت نشده است"}
          </Typography>
        </Paper>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <ActionButton
            variant="contained"
            color="primary"
            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/print/${order.order_id}`}
            target="_blank"
          >
            چاپ فاکتور
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="primary"
            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/bijack/${order.order_id}`}
            target="_blank"
          >
            چاپ بیجک
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="primary"
            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/shipping/${order.order_id}`}
            target="_blank"
          >
            چاپ بارنامه
          </ActionButton>
        </Stack>
      </OrderContainer>
    </AdminLayout>
  );
};

export default OrderPage;
