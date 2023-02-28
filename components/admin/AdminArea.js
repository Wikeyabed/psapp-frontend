import React from "react";
import AdminLayout from "./layout";

import { Grid, Box, Paper, Typography } from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";
import styled from "@emotion/styled";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
const DashboardCard = styled(Paper)(({ theme }) => ({
  // color: "#fff",
  padding: "20px 75px 0 25px",
  //   paddingTop: 70,
  // // margin: "0px !important",
  backgroundColor: "#fdfdfd",
  minHeight: 160,
  position: "relative",
}));

const DashboardCardIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -15,
  right: -15,
  width: 65,
  height: 65,
  cursor: "pointer",
  transition: ".3s ease all",
  ":hover": {
    // backgroundColor: "#000",
    transform: "scale(1.1)",
  },

  borderRadius: "50%",
  textAlign: "center",
  paddingTop: 10,
  border: "5px solid #e2e2e2",
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  padding: 15,
}));

function AdminArea() {
  return (
    <AdminLayout>
      <Box>
        <Grid container sx={{ p: 5 }}>
          <CardContainer item xs={3}>
            <DashboardCard>
              <Typography
                variant="h5"
                sx={{
                  direction: "ltr !important",
                  //   textAlign: "t",
                }}
              >
                درآمد ماهانه
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  direction: "ltr !important",
                  textAlign: "left",
                  marginTop: 3,
                }}
              >
                {" "}
                ریال ‍۱۲,۰۰۰,۰۰۰
              </Typography>
              <DashboardCardIcon
                sx={{
                  backgroundColor: "green",
                }}
              >
                <TollIcon
                  sx={{
                    fontSize: 35,
                    color: "#fff",
                  }}
                />
              </DashboardCardIcon>
            </DashboardCard>
          </CardContainer>
          <CardContainer item xs={3}>
            <DashboardCard>
              <Typography
                variant="h5"
                sx={{
                  direction: "ltr !important",
                  //   textAlign: "t",
                }}
              >
                تعداد سفارشات
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  direction: "ltr !important",
                  textAlign: "left",

                  marginTop: 3,
                }}
              >
                {" "}
                ۱۳۰۰
              </Typography>
              <DashboardCardIcon
                sx={{
                  backgroundColor: "red",
                }}
              >
                <AddShoppingCartIcon
                  sx={{
                    fontSize: 35,
                    color: "#fff",
                  }}
                />
              </DashboardCardIcon>
            </DashboardCard>
          </CardContainer>
          <CardContainer item xs={3}>
            <DashboardCard>
              <Typography
                variant="h5"
                sx={{
                  direction: "ltr !important",
                  //   textAlign: "t",
                }}
              >
                کاربران این ماه
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  direction: "ltr !important",
                  textAlign: "left",

                  marginTop: 3,
                }}
              >
                {" "}
                ۱۲۵
              </Typography>
              <DashboardCardIcon
                sx={{
                  backgroundColor: "blue",
                }}
              >
                <PersonAddIcon
                  sx={{
                    fontSize: 35,
                    color: "#fff",
                  }}
                />
              </DashboardCardIcon>
            </DashboardCard>
          </CardContainer>
          <CardContainer item xs={3}>
            <DashboardCard>
              <Typography
                variant="h5"
                sx={{
                  direction: "ltr !important",
                  //   textAlign: "t",
                }}
              >
                تعداد محصولات
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  direction: "ltr !important",
                  textAlign: "left",

                  marginTop: 3,
                }}
              >
                {" "}
                ۱۵۶{" "}
              </Typography>
              <DashboardCardIcon
                sx={{
                  backgroundColor: "darkgray",
                }}
              >
                <PrecisionManufacturingIcon
                  sx={{
                    fontSize: 35,
                    color: "#fff",
                  }}
                />
              </DashboardCardIcon>
            </DashboardCard>
          </CardContainer>
          <Grid item xs={6}>
            box
          </Grid>

          <Grid item xs={6}>
            box
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default AdminArea;
