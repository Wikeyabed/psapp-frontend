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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import OrderStatusInside from "./OrderStatus";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const OrderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginLeft: 0,
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    marginLeft: "280px",
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up("xl")]: {
    marginLeft: "320px",
  },
}));

const OrderHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[1],
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));

const OrderDetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(0.5),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "&:last-child": {
    borderBottom: "none",
  },
}));

const OrderDetailLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "0.875rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
}));

const OrderDetailValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.875rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
}));

const ProductsTable = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  overflowX: "auto",
  boxShadow: theme.shadows[1],
  width: "100%",
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  fontWeight: 600,
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  fontSize: "0.75rem",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
    fontSize: "0.875rem",
  },
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: "0.75rem",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
    fontSize: "0.875rem",
  },
}));

const StatusSelect = styled(Select)(({ theme }) => ({
  minWidth: "150px",
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
  fontSize: "0.75rem",
  height: "24px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.875rem",
    height: "32px",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  margin: theme.spacing(0.5),
  fontSize: "0.75rem",
  padding: theme.spacing(0.5, 1),
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.875rem",
    padding: theme.spacing(1, 2),
    marginLeft: theme.spacing(1),
    "&:first-of-type": {
      marginLeft: 0,
    },
  },
}));

const OrderPage = ({ order }) => {
  const user = useSelector((state) => state.auth.userInformation);
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let prodArr = [];
    order.products.map((prod) => {
      prodArr.push(JSON.parse(prod));
    });
    setRows(prodArr);
  }, []);

  return (
    <AdminLayout>
      <OrderContainer>
        <OrderHeader elevation={1}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
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
        </OrderHeader>

        <ProductsTable elevation={0}>
          <Table sx={{ minWidth: 650 }} size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableHeaderCell align="right">نام محصول</TableHeaderCell>
                <TableHeaderCell align="right">تعداد</TableHeaderCell>
                {!isMobile && (
                  <TableHeaderCell align="right">قیمت هر عدد</TableHeaderCell>
                )}
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
                  {!isMobile && (
                    <TableCellStyled align="right">
                      {persianNumber(row.unit_price)} ریال
                    </TableCellStyled>
                  )}
                  <TableCellStyled align="right">
                    {persianNumber(row.total_price)} ریال
                  </TableCellStyled>
                </TableRow>
              ))}
              <TableRow>
                <TableCellStyled colSpan={isMobile ? 2 : 3} align="left">
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{ fontWeight: 700 }}
                  >
                    مبلغ کل فاکتور:
                  </Typography>
                </TableCellStyled>
                <TableCellStyled align="right">
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{ fontWeight: 700 }}
                  >
                    {persianNumber(order.finished_price)} ریال
                  </Typography>
                </TableCellStyled>
              </TableRow>
            </TableBody>
          </Table>
        </ProductsTable>

        <Paper sx={{ p: 2, mt: 3, borderRadius: "12px", boxShadow: 1 }}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            توضیحات فاکتور:
          </Typography>
          <Typography variant="body2">
            {order.order_description || "توضیحاتی ثبت نشده است"}
          </Typography>
        </Paper>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={1}
          sx={{ mt: 3 }}
        >
          <ActionButton
            variant="contained"
            color="primary"
            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/print/${order.order_id}`}
            target="_blank"
            fullWidth={isMobile}
          >
            چاپ فاکتور
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="primary"
            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/bijack/${order.order_id}`}
            target="_blank"
            fullWidth={isMobile}
          >
            چاپ بیجک
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="primary"
            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/shipping/${order.order_id}`}
            target="_blank"
            fullWidth={isMobile}
          >
            چاپ بارنامه
          </ActionButton>
        </Stack>
      </OrderContainer>
    </AdminLayout>
  );
};

export default OrderPage;
