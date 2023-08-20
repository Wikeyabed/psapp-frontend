import React from "react";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Badge,
  Chip,
} from "@mui/material";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import Link from "../../../src/Link";

function UserPage({ userData, userOrders }) {
  return (
    <AdminLayout>
      <Grid container spacing={4}>
        <Typography sx={{ margin: "10px auto" }} variant="h4">
          مشخصات کاربر
        </Typography>
        <Grid item xs={12}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography
                sx={{
                  mb: 4,
                }}
                variant="h5"
              >
                اطلاعات کاربر
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography>
                    نام: {userData.first_name + " " + userData.last_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>ایمیل: {userData.email}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2">
                    شناسه کاربری: {userData.id}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography>شماره تماس : {userData.phone_number}</Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 1,
                    }}
                  >
                    تاریخ ثبت نام:{" "}
                    <ToPersianDate timestamp={userData.register_date} />
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="body2">
                    آدرس: {userData.address}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography
                sx={{
                  mb: 4,
                }}
                variant="h5"
              >
                فاکتورها
              </Typography>
              <Grid container spacing={2}>
                {userOrders.map((order) => (
                  <Grid item xs={12} sm={6} md={4} key={order.order_id}>
                    <Link
                      sx={{
                        textDecoration: "none !important",
                      }}
                      href={`/admin/orders/${order.order_id}`}
                    >
                      <Card
                        sx={{
                          backgroundColor: "lightPrimary.main",
                          color: "primary.textWhite",
                        }}
                      >
                        <CardContent>
                          <Typography variant="h5">
                            فاکتور شماره: {order.order_id}
                          </Typography>
                          <Divider
                            color="#fff"
                            sx={{
                              my: 4,
                            }}
                          />
                          <Typography display={"flex"} sx={{ mt: 2 }}>
                            تاریخ:
                            <ToPersianDate timestamp={order.order_date} />
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            شماره تراکنش : {order.transaction_id}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            شماره پیگیری : {order.track_id}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            شماره سفارش : {order.order_id}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            مبلغ: {persianNumber(order.finished_price)} ریال
                          </Typography>
                          <Typography sx={{ mt: 2 }} component="div">
                            وضعیت فعلی :
                            <Chip
                              sx={{ mx: 2 }}
                              label={
                                order.status == "1"
                                  ? "در انتظار تایید"
                                  : order.status == "2"
                                  ? "در حال پردازش"
                                  : order.status == "3"
                                  ? "تکمیل شده"
                                  : "کنسل شده"
                              }
                              color={
                                order.status == "1"
                                  ? "warning"
                                  : order.status == "2"
                                  ? "info"
                                  : order.status == "3"
                                  ? "success"
                                  : "error"
                              }
                              variant="filled"
                            ></Chip>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default UserPage;
