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

const UserContainer = styled(Box)(({ theme }) => ({
  padding: "24px",
  marginLeft: { lg: "280px", xl: "320px" },
}));

const UserCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  marginBottom: "24px",
  overflow: "hidden",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: "24px",
  paddingBottom: "8px",
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  gap: "12px",
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const OrderCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  height: "100%",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
}));

const OrderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const OrderDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  gap: "8px",
}));

const OrderDetailText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
}));

function UserPage({ userData, userOrders }) {
  return (
    <AdminLayout>
      <UserContainer>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          پروفایل کاربر
        </Typography>

        <UserCard>
          <CardContent>
            <SectionTitle variant="h5">
              <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              اطلاعات کاربری
            </SectionTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Avatar
                    sx={{ bgcolor: "primary.main", width: 40, height: 40 }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
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
                  <Avatar sx={{ bgcolor: "info.main", width: 40, height: 40 }}>
                    <EmailIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      آدرس ایمیل
                    </Typography>
                    <InfoText>{userData.email}</InfoText>
                  </Box>
                </InfoItem>
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Avatar
                    sx={{ bgcolor: "success.main", width: 40, height: 40 }}
                  >
                    <PhoneIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      شماره تماس
                    </Typography>
                    <InfoText>{userData.phone_number}</InfoText>
                  </Box>
                </InfoItem>
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Avatar
                    sx={{ bgcolor: "warning.main", width: 40, height: 40 }}
                  >
                    <DateIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
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
                    sx={{ bgcolor: "secondary.main", width: 40, height: 40 }}
                  >
                    <AddressIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      آدرس
                    </Typography>
                    <InfoText>{userData.address || "ثبت نشده"}</InfoText>
                  </Box>
                </InfoItem>
              </Grid>
            </Grid>
          </CardContent>
        </UserCard>

        <UserCard>
          <CardContent>
            <SectionTitle variant="h5">
              <OrderIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              تاریخچه سفارشات
            </SectionTitle>

            {userOrders.length > 0 ? (
              <Grid container spacing={3}>
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

                          <Divider sx={{ my: 2 }} />

                          <OrderDetail>
                            <DateIcon color="action" fontSize="small" />
                            <OrderDetailText>
                              <ToPersianDate timestamp={order.order_date} />
                            </OrderDetailText>
                          </OrderDetail>

                          <OrderDetail>
                            <PriceIcon color="action" fontSize="small" />
                            <OrderDetailText>
                              {persianNumber(order.finished_price)} ریال
                            </OrderDetailText>
                          </OrderDetail>

                          <OrderDetail>
                            <TicketIcon color="action" fontSize="small" />
                            <OrderDetailText>
                              شماره پیگیری: {order.track_id || "ندارد"}
                            </OrderDetailText>
                          </OrderDetail>

                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              justifyContent: "space-between",
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
                              color="info"
                              size="small"
                            />

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <OrderStatusInside status={order.status} />
                            </Box>
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
                  backgroundColor: "background.default",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="textSecondary">
                  هیچ سفارشی یافت نشد
                </Typography>
              </Box>
            )}
          </CardContent>
        </UserCard>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href="/admin/users"
          >
            بازگشت به لیست کاربران
          </Button>
          <Button
            variant="contained"
            color="primary"
            // Add edit functionality here
          >
            ویرایش کاربر
          </Button>
        </Stack>
      </UserContainer>
    </AdminLayout>
  );
}

export default UserPage;
