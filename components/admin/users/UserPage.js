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

function UserPage({ userData, userInvoices }) {
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
                {userInvoices.map((invoice) => (
                  <Grid item xs={12} sm={6} md={4} key={invoice.invoice_id}>
                    <Link
                      sx={{
                        textDecoration: "none !important",
                      }}
                      href={`/admin/invoices/${invoice.invoice_id}`}
                    >
                      <Card
                        sx={{
                          backgroundColor: "lightPrimary.main",
                          color: "primary.textWhite",
                        }}
                      >
                        <CardContent>
                          <Typography variant="h5">
                            فاکتور شماره: {invoice.invoice_id}
                          </Typography>
                          <Divider
                            color="#fff"
                            sx={{
                              my: 4,
                            }}
                          />
                          <Typography display={"flex"} sx={{ mt: 2 }}>
                            تاریخ:
                            <ToPersianDate timestamp={invoice.invoice_date} />
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            شماره تراکنش : {invoice.transaction_id}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            شماره پیگیری : {invoice.track_id}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            شماره سفارش : {invoice.order_id}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            مبلغ: {persianNumber(invoice.finished_price)} ریال
                          </Typography>
                          <Typography sx={{ mt: 2 }} component="div">
                            وضعیت فعلی :
                            <Chip
                              sx={{ mx: 2 }}
                              label={
                                invoice.status == "1"
                                  ? "در انتظار تایید"
                                  : invoice.status == "2"
                                  ? "در حال پردازش"
                                  : invoice.status == "3"
                                  ? "تکمیل شده"
                                  : "کنسل شده"
                              }
                              color={
                                invoice.status == "1"
                                  ? "warning"
                                  : invoice.status == "2"
                                  ? "info"
                                  : invoice.status == "3"
                                  ? "success"
                                  : "error"
                              }
                              variant="filled"
                            >
                              در حال اطلاعات
                            </Chip>
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
