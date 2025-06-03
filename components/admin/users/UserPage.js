import React from "react";
import AdminLayout from "../layout";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Chip,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import Link from "../../../src/Link";
import OrderStatusInside from "../orders/OrderStatusInside";
import styled from "@emotion/styled";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as DateIcon,
  Home as AddressIcon,
  Receipt as OrderIcon,
  Paid as PriceIcon,
  ConfirmationNumber as TicketIcon,
} from "@mui/icons-material";

// استایل‌های سفارشی با پالت رنگی جدید
const UserContainer = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  marginLeft: { lg: "280px", xl: "320px" },
  direction: "rtl",
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
}));

const UserCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  marginBottom: "1.5rem",
  overflow: "hidden",
  border: "none",
  background: "#fff",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: "1.5rem",
  paddingBottom: "0.5rem",
  borderBottom: `2px solid #f0f0f0`,
  color: "#6366f1", // آبی-بنفش
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  gap: "0.75rem",
  padding: "0.75rem",
  borderRadius: "12px",
  backgroundColor: "#f8fafc",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#f1f5f9",
    transform: "translateX(-5px)",
  },
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: "#334155",
}));

const OrderCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  height: "100%",
  border: "1px solid #e2e8f0",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.2)",
    borderColor: "#6366f1",
  },
}));

const OrderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: "0.75rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "#6366f1",
}));

const OrderDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "0.5rem",
  gap: "0.5rem",
}));

const OrderDetailText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: "#64748b",
}));

// دکمه‌های گرادیانتی
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
  color: "white",
  borderRadius: "12px",
  padding: "0.75rem 1.5rem",
  fontWeight: 600,
  minHeight: "48px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  border: "2px solid #6366f1",
  color: "#6366f1",
  borderRadius: "12px",
  padding: "0.75rem 1.5rem",
  fontWeight: 600,
  minHeight: "48px",
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.08)",
    border: "2px solid #6366f1",
  },
}));

function UserPage({ userData, userOrders }) {
  return (
    <AdminLayout>
      <UserContainer>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#6366f1",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: "-8px",
              right: 0,
              width: "60px",
              height: "4px",
              background: "#06b6d4",
              borderRadius: "2px",
            },
          }}
        >
          پروفایل کاربر
        </Typography>

        {/* کارت اطلاعات کاربری */}
        <UserCard>
          <CardContent>
            <SectionTitle variant="h5">
              اطلاعات کاربری
            </SectionTitle>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Avatar
                    sx={{
                      bgcolor: "#6366f1",
                      width: 40,
                      height: 40,
                      color: "white",
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="#64748b">
                      نام کامل
                    </Typography>
                    <InfoText>
                      {userData.first_name + " " + userData.last_name}
                    </InfoText>
                  </Box>
                </InfoItem>
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Avatar
                    sx={{
                      bgcolor: "#06b6d4",
                      width: 40,
                      height: 40,
                      color: "white",
                    }}
                  >
                    <EmailIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="#64748b">
                      آدرس ایمیل
                    </Typography>
                    <InfoText>{userData.email}</InfoText>
                  </Box>
                </InfoItem>
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Avatar
                    sx={{
                      bgcolor: "#10b981",
                      width: 40,
                      height: 40,
                      color: "white",
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="#64748b">
                      شماره تماس
                    </Typography>
                    <InfoText>{userData.phone_number}</InfoText>
                  </Box>
                </InfoItem>
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Avatar
                    sx={{
                      bgcolor: "#f59e0b",
                      width: 40,
                      height: 40,
                      color: "white",
                    }}
                  >
                    <DateIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="#64748b">
                      تاریخ ثبت نام
                    </Typography>
                    <InfoText>
                      <ToPersianDate timestamp={userData.register_date} />
                    </InfoText>
                  </Box>
                </InfoItem>
              </Grid>

              <Grid item xs={12}>
                <InfoItem>
                  <Avatar
                    sx={{
                      bgcolor: "#8b5cf6",
                      width: 40,
                      height: 40,
                      color: "white",
                    }}
                  >
                    <AddressIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="#64748b">
                      آدرس
                    </Typography>
                    <InfoText>{userData.address || "ثبت نشده"}</InfoText>
                  </Box>
                </InfoItem>
              </Grid>
            </Grid>
          </CardContent>
        </UserCard>

        {/* کارت تاریخچه سفارشات */}
        <UserCard>
          <CardContent>
            <SectionTitle variant="h5">
              تاریخچه سفارشات
            </SectionTitle>

            {userOrders.length > 0 ? (
              <Grid container spacing={2}>
                {userOrders.map((order) => (
                  <Grid item xs={12} sm={6} md={4} key={order.order_id}>
                    <Link
                      href={`/admin/orders/${order.order_id}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <OrderCard>
                        <CardContent>
                          <OrderTitle variant="h6">
                            <OrderIcon fontSize="small" />
                            فاکتور #{order.order_number}
                          </OrderTitle>

                          <Divider sx={{ my: 2, borderColor: "#e2e8f0" }} />

                          <OrderDetail>
                            <DateIcon sx={{ color: "#64748b" }} fontSize="small" />
                            <OrderDetailText>
                              <ToPersianDate timestamp={order.order_date} />
                            </OrderDetailText>
                          </OrderDetail>

                          <OrderDetail>
                            <PriceIcon sx={{ color: "#64748b" }} fontSize="small" />
                            <OrderDetailText>
                              {persianNumber(order.finished_price)} ریال
                            </OrderDetailText>
                          </OrderDetail>

                          <OrderDetail>
                            <TicketIcon sx={{ color: "#64748b" }} fontSize="small" />
                            <OrderDetailText>
                              شماره پیگیری: {order.track_id || "ندارد"}
                            </OrderDetailText>
                          </OrderDetail>

                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Chip
                              label={
                                order.delivery_type === "in-person"
                                  ? "حضوری"
                                  : order.delivery_type === "snap"
                                  ? "اسنپ"
                                  : order.delivery_type === "shipping"
                                  ? "باربری"
                                  : "پست"
                              }
                              sx={{
                                bgcolor: "#e0f2fe",
                                color: "#0369a1",
                                fontWeight: 500,
                              }}
                              size="small"
                            />

                            <OrderStatusInside status={order.status} />
                          </Box>
                        </CardContent>
                      </OrderCard>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px dashed #e2e8f0",
                }}
              >
                <Typography variant="body1" color="#64748b">
                  هیچ سفارشی یافت نشد
                </Typography>
              </Box>
            )}
          </CardContent>
        </UserCard>

        {/* دکمه‌های پایین صفحه */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
          justifyContent="flex-end"
        >
          <OutlinedButton
            variant="outlined"
            component={Link}
            href="/admin/users"
          >
            بازگشت به لیست کاربران
          </OutlinedButton>
          <GradientButton variant="contained">
            ویرایش کاربر
          </GradientButton>
        </Stack>
      </UserContainer>
    </AdminLayout>
  );
}

export default UserPage;