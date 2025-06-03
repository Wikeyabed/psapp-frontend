"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  InputAdornment,
  useMediaQuery,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Phone,
  Print,
  LocalShipping,
  Receipt,
  Search,
  ExpandMore,
  PhoneAndroid,
  Close,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Link from "../../../src/Link";
import OrderStatus from "./OrderStatus";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";

// استایل‌های سفارشی
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
  color: "white",
  borderRadius: "12px",
  padding: "12px 24px",
  fontWeight: 600,
  minHeight: "48px",
  fontSize: "1rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
}));

const StatusChangeButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px 12px",
  fontWeight: 600,
  fontSize: "0.9rem",
  minWidth: "unset",
  textTransform: "none",
  position: "center",
  // left: "8px",
  // top: "7px",
  zIndex: 1,
  "&.MuiButton-contained": {
    boxShadow: "none",
  },
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
  color: "white",
  borderRadius: "12px",
  padding: "16px 32px",
  fontWeight: 600,
  minHeight: "56px",
  fontSize: "1.1rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  margin: "24px 0",
  "&:hover": {
    background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: "#6366f1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
      borderWidth: "1px",
    },
  },
}));

const OrderCard = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  padding: "24px",
  height: "100%",
  minHeight: "280px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  border: "1px solid #f1f5f9",
  transition: "all 0.3s ease",
  position: "relative",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 16px rgba(99, 102, 241, 0.1)",
  },
  display: "flex",
  flexDirection: "column",
}));

const StatusBadge = styled(Box)(({ theme, status }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 12px",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "0.9rem",
  backgroundColor:
    status === "200"
      ? "rgba(16, 185, 129, 0.15)"
      : status === "100"
      ? "rgba(245, 158, 11, 0.15)"
      : "rgba(239, 68, 68, 0.15)",
  color:
    status === "200"
      ? "#10b981"
      : status === "100"
      ? "#f59e0b"
      : "#ef4444",
}));

const DeliveryBadge = styled(Chip)(({ theme }) => ({
  borderRadius: "12px",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "8px 12px",
  height: "auto",
  backgroundColor: "rgba(6, 182, 212, 0.15)",
  color: "#06b6d4",
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(99, 102, 241, 0.1)",
  color: "#6366f1",
  borderRadius: "12px",
  padding: "12px",
  marginLeft: "8px",
  "&:hover": {
    backgroundColor: "#6366f1",
    color: "white",
  },
}));

const InvoiceNumber = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: "12px",
}));

const InvoiceLabel = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontWeight: 500,
  fontSize: "0.95rem",
  lineHeight: 1.5,
}));

const InvoiceValue = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontWeight: 600,
  fontSize: "1.1rem",
}));

export default function OrdersTable({ orders }) {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deliveryFilter, setDeliveryFilter] = useState("All");
  const [loadMore, setLoadMore] = useState(8);
  const [loading, setLoading] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoadMore((prev) => prev + 8);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const openPhoneDialog = (phone) => {
    setSelectedPhone(phone);
    setPhoneDialog(true);
  };

  const filteredOrders = orders
    ? orders
        .filter((order) => {
          if (statusFilter === "finished") return order.status === "200";
          if (statusFilter === "in-progress") return order.status === "100";
          if (statusFilter === "last")
            return order.status !== "100" && order.status !== "200";
          return true;
        })
        .filter((order) => {
          if (deliveryFilter === "snap") return order.delivery_type === "snap";
          if (deliveryFilter === "in-person")
            return order.delivery_type === "in-person";
          if (deliveryFilter === "shipping")
            return order.delivery_type === "shipping";
          if (deliveryFilter === "posting")
            return order.delivery_type === "posting";
          return true;
        })
        .filter(
          (order) =>
            order.customer_name.includes(searchValue) ||
            order.order_number.toString().includes(searchValue)
        )
        .sort((a, b) => b.order_number - a.order_number)
        .slice(0, loadMore)
    : [];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* هدر صفحه */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#6366f1",
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          مدیریت سفارشات
        </Typography>

        {/* فیلترها */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: isMobile ? "100%" : "auto",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <FormControl fullWidth={isMobile} size="medium">
            <InputLabel sx={{ fontSize: "1rem" }}>وضعیت سفارش</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="وضعیت سفارش"
              sx={{ minWidth: 180, fontSize: "1rem" }}
            >
              <MenuItem value="All" sx={{ fontSize: "1rem" }}>همه وضعیت‌ها</MenuItem>
              <MenuItem value="finished" sx={{ fontSize: "1rem" }}>تکمیل شده</MenuItem>
              <MenuItem value="in-progress" sx={{ fontSize: "1rem" }}>در حال انجام</MenuItem>
              <MenuItem value="last" sx={{ fontSize: "1rem" }}>کنسل شده</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth={isMobile} size="medium">
            <InputLabel sx={{ fontSize: "1rem" }}>نحوه ارسال</InputLabel>
            <Select
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
              label="نحوه ارسال"
              sx={{ minWidth: 180, fontSize: "1rem" }}
            >
              <MenuItem value="All" sx={{ fontSize: "1rem" }}>همه روش‌ها</MenuItem>
              <MenuItem value="snap" sx={{ fontSize: "1rem" }}>اسنپ</MenuItem>
              <MenuItem value="in-person" sx={{ fontSize: "1rem" }}>حضوری</MenuItem>
              <MenuItem value="shipping" sx={{ fontSize: "1rem" }}>باربری</MenuItem>
              <MenuItem value="posting" sx={{ fontSize: "1rem" }}>پست</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* جستجو */}
      <Box sx={{ mb: 3 }}>
        <SearchField
          variant="outlined"
          placeholder="جستجو بر اساس نام یا شماره فاکتور"
          value={searchValue}
          onChange={handleSearch}
          size="medium"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#94a3b8", fontSize: "1.2rem" }} />
              </InputAdornment>
            ),
            sx: { fontSize: "1rem" }
          }}
        />
      </Box>

      {/* لیست سفارشات */}
      {filteredOrders.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {filteredOrders.map((order) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={order.order_id}>
                <OrderCard>
                  <StatusChangeButton
                    variant="contained"
                    sx={{ 
                      backgroundColor: 
                        order.status === "200" ? "#10b981" :
                        order.status === "100" ? "#f59e0b" : "#ef4444",
                      color: "white"
                    }}
                  >
                    <OrderStatus order={order} />
                  </StatusChangeButton>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      pt: 4
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ 
                          fontWeight: 700, 
                          color: "#6366f1",
                          fontSize: "1.2rem",
                          mb: 3,
                          lineHeight: 1.3
                        }}
                      >
                        {order.customer_name}
                      </Typography>
                      
                      <InvoiceNumber>
                        <InvoiceLabel>شماره فاکتور : {order.order_number}</InvoiceLabel></InvoiceNumber>
                    </Box>

                    <Box sx={{ mb: 3, flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 3,
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "#64748b", fontSize: "1rem" }}>
                          تاریخ:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                          <ToPersianDate timestamp={order.order_date} />
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "#64748b", fontSize: "1rem" }}>
                          مبلغ:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                          {persianNumber(order.finished_price)} ریال
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "#64748b", fontSize: "1rem" }}>
                          نحوه ارسال:
                        </Typography>
                        <DeliveryBadge
                          label={
                            order.delivery_type === "in-person"
                              ? "حضوری"
                              : order.delivery_type === "snap"
                              ? "اسنپ"
                              : order.delivery_type === "shipping"
                              ? "باربری"
                              : "پست"
                          }
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Box>
                        <Tooltip title="نمایش شماره تماس">
                          <ActionButton
                            onClick={() => openPhoneDialog(order.customer_phone)}
                            sx={{ fontSize: "1.2rem" }}
                          >
                            <PhoneAndroid fontSize="inherit" />
                          </ActionButton>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip title="چاپ فاکتور">
                          <ActionButton
                            component={Link}
                            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/print/${order.order_id}`}
                            target="_blank"
                            sx={{ fontSize: "1.2rem" }}
                          >
                            <Print fontSize="inherit" />
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="چاپ بارنامه">
                          <ActionButton
                            component={Link}
                            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/shipping/${order.order_id}`}
                            target="_blank"
                            sx={{ fontSize: "1.2rem" }}
                          >
                            <LocalShipping fontSize="inherit" />
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="چاپ بیجک">
                          <ActionButton
                            component={Link}
                            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/bijack/${order.order_id}`}
                            target="_blank"
                            sx={{ fontSize: "1.2rem" }}
                          >
                            <Receipt fontSize="inherit" />
                          </ActionButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </OrderCard>
              </Grid>
            ))}
          </Grid>

          {loadMore < (orders?.length || 0) && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadMoreButton
                onClick={handleLoadMore}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <ExpandMore sx={{ fontSize: "1.5rem" }} />
                  )
                }
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                {loading ? "در حال بارگیری..." : "نمایش سفارشات بیشتر"}
              </LoadMoreButton>
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            border: "1px dashed #e2e8f0",
          }}
        >
          <Typography variant="h6" color="#64748b">
            هیچ سفارشی یافت نشد
          </Typography>
        </Box>
      )}

      {/* دیالوگ نمایش شماره تماس */}
      <Dialog
        open={phoneDialog}
        onClose={() => setPhoneDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
            شماره تماس مشتری
          </Typography>
          <IconButton onClick={() => setPhoneDialog(false)}>
            <Close sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 4,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#6366f1",
                color: "white",
                width: 80,
                height: 80,
                mb: 3,
              }}
            >
              <Phone sx={{ fontSize: "2.5rem" }} />
            </Avatar>
            <Typography
              variant="h3"
              component={Link}
              href={`tel:+98${selectedPhone}`}
              sx={{
                color: "#06b6d4",
                textDecoration: "none",
                fontWeight: 700,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {selectedPhone}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <GradientButton
            component={Link}
            href={`tel:+98${selectedPhone}`}
            startIcon={<Phone sx={{ fontSize: "1.5rem" }} />}
            sx={{ width: "100%", mx: 2, fontSize: "1.1rem" }}
          >
            تماس با مشتری
          </GradientButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}