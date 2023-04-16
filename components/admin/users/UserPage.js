import React from "react";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const userInfo = {
  name: "جان دو",
  email: "johndoe@example.com",
  age: 28,
  registerDate: "2021-10-01",
  invoices: [
    { id: 1, date: "2021-10-02", amount: 100 },
    { id: 2, date: "2021-11-05", amount: 50 },
    { id: 3, date: "2022-01-10", amount: 200 },
  ],
};

function UserPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayout>
      <Grid container spacing={2}>
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
                <Grid item xs={6}>
                  <Typography>نام: {userInfo.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>ایمیل: {userInfo.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>شناسه کاربری: {id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    تاریخ ثبت نام: {userInfo.registerDate}
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
                {userInfo.invoices.map((invoice, index) => (
                  <Grid item xs={4} key={invoice.id}>
                    <Card
                      sx={{
                        backgroundColor: "#f7ede2",
                        // index % 2 === 0 ? "#f7ede2" : "#f9d9c2",
                      }}
                    >
                      <CardContent>
                        <Typography>شناسه: {invoice.id}</Typography>
                        <Typography>تاریخ: {invoice.date}</Typography>
                        <Typography>مبلغ: {invoice.amount}</Typography>
                      </CardContent>
                    </Card>
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
