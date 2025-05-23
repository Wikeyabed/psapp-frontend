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
} from "@mui/material";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import OrderStatusInside from "./OrderStatusInside";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";



const OrderContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '24px',
}));

const OrderHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
  boxShadow: theme.shadows[1],
}));

const OrderDetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
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
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  padding: '16px',
}));

const StatusSelect = styled(Select)(({ theme }) => ({
  minWidth: 200,
  '& .MuiSelect-select': {
    padding: '8px 32px 8px 12px',
  },
}));

const OrderPage = ({ order }) => {
 const user = useSelector((state) => state.auth.userInformation);
 // Sample data
 const [rows, setRows] = useState([]);

 const [status, setStatus] = useState(order.status);

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

 // Handle status change
 const handleStatusChange = (e) => {
   setStatus(e.target.value);

   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("token", getCookie("x-auth-token"));

   var raw = JSON.stringify({
     status: e.target.value,
     phoneNumber: order.customer_phone,
     order_number: order.order_number,
     order_id: order.order_id,
     userName: order.customer_name,
   });

   var requestOptions = {
     method: "PUT",
     headers: myHeaders,
     body: raw,
     redirect: "follow",
   };

   fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/orders/${order.order_id}`,
     requestOptions
   )
     .then((response) => response.text())
     .then((result) => console.log(result))
     .catch((error) => console.log("error", error));
 };
  return (
    <AdminLayout>
      <OrderContainer>
        <OrderHeader>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            فاکتور شماره: {order.order_number}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">مشتری:</OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">{order.customer_name}</OrderDetailValue>
            </OrderDetailItem>
            
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">شماره تماس:</OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">{order.customer_phone}</OrderDetailValue>
            </OrderDetailItem>
            
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">وضعیت:</OrderDetailLabel>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <OrderStatusInside status={status} />
              </Box>
            </OrderDetailItem>
            
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">تاریخ صدور:</OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                <ToPersianDate timestamp={order.order_date} />
              </OrderDetailValue>
            </OrderDetailItem>
            
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">تاریخ تحویل:</OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                <ToPersianDate timestamp={order.delivery_date} />
              </OrderDetailValue>
            </OrderDetailItem>
            
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">نحوه دریافت:</OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">
                {order.delivery_type == "in-person"
                  ? "حضوری از انبار ما"
                  : order.delivery_type == "snap"
                  ? "از طریق اسنپ (مخصوص تهران)"
                  : order.delivery_type == "shipping"
                  ? "از طریق باربری (مخصوص شهرستان)"
                  : order.delivery_type == "posting"
                  ? "ارسال از طریق پست یا تیپاکس"
                  : ""}
              </OrderDetailValue>
            </OrderDetailItem>
            
            <OrderDetailItem>
              <OrderDetailLabel variant="subtitle1">آدرس تحویل:</OrderDetailLabel>
              <OrderDetailValue variant="subtitle1">{order.delivery_address}</OrderDetailValue>
            </OrderDetailItem>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              تغییر وضعیت فاکتور:
            </Typography>
            <StatusSelect
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value={order.status}>وضعیت فعلی</MenuItem>
              <MenuItem value={"100"}>در حال پردازش</MenuItem>
              <MenuItem value={"200"}>تکمیل شده</MenuItem>
              <MenuItem value={"-2"}>کنسل شده</MenuItem>
            </StatusSelect>
          </Box>
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
                <TableRow key={row.product_name}>
                  <TableCellStyled align="right">{row.product_name}</TableCellStyled>
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
        
        <Paper sx={{ p: 3, mt: 3, borderRadius: '12px', boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            توضیحات فاکتور:
          </Typography>
          <Typography variant="body1">
            {order.order_description || "توضیحاتی ثبت نشده است"}
          </Typography>
        </Paper>
      </OrderContainer>
    </AdminLayout>
  );
};

export default OrderPage;
