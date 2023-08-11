import React from "react";
import AdminLayout from "../layout";
import { Paper, Grid, Box, Typography } from "@mui/material";
import ToPersianDate from "../../../src/TimestampToPersian";

function RequestSingle({ request }) {
  return (
    <AdminLayout>
      <Paper>
        <Grid
          container
          sx={{
            p: 4,
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {request.request_type == 1
                ? "درخواست همکاری"
                : request.request_type == 2
                ? "سفارش محصول"
                : "تماس با ما"}
            </Typography>
            <Typography
              sx={{
                mt: 5,
              }}
              variant="h5"
            >
              موضوع : {request.request_title}
            </Typography>

            <Typography
              sx={{
                mt: 2,
              }}
              variant="body1"
            >
              - از طرف : {request.person_name}
            </Typography>

            <Typography
              sx={{
                mt: 2,
              }}
              variant="body1"
            >
              - شماره تماس: {request.phone_number}
            </Typography>

            <Box
              sx={{
                display: "flex",
                mt: 2,
              }}
            >
              <Typography variant="body1">- تاریخ درخواست : </Typography>
              <ToPersianDate timestamp={request.create_time} />
            </Box>

            <Typography
              sx={{
                mt: 2,
                minHeight: 400,
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
                padding: 4,
              }}
              variant="body1"
            >
              {request.request_description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </AdminLayout>
  );
}

export default RequestSingle;
