import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import TollIcon from "@mui/icons-material/Toll";

import { Grid, Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: theme.palette.primary.main.lightBg,
  minHeight: 160,
  position: "relative",
  borderRadius: 20,
  boxShadow: "rgb(0 0 0 / 4%) 0px 5px 22px, rgb(0 0 0 / 3%) 0px 0px 0px 0.5px",
}));

const iconStyle = {
  fontSize: 35,
  color: "#fff",
};

const DashboardCardIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 15,
  left: 15,
  width: 56,
  height: 56,
  cursor: "pointer",
  paddingTop: 10,
  transition: ".3s ease all",
  ":hover": {
    transform: "scale(1.1)",
  },
  borderRadius: "50%",
  textAlign: "center",
}));

const Text = styled(Typography)(({ theme }) => ({
  color: "#9f9f9f",
}));

const TextInfo = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: 25,
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  padding: 15,
}));

function TopBoxes() {
  return (
    <>
      {" "}
      <CardContainer item xs={12} md={6} xl={3}>
        <DashboardCard>
          <DashboardCardIcon
            sx={{
              backgroundColor: "green",
            }}
          >
            <TollIcon sx={iconStyle} />
          </DashboardCardIcon>
          <Text variant="h6">درآمد ماهانه</Text>

          <TextInfo variant="h5"> ریال ‍۱۲,۰۰۰,۰۰۰</TextInfo>
        </DashboardCard>
      </CardContainer>
      <CardContainer item xs={12} md={6} xl={3}>
        <DashboardCard>
          <DashboardCardIcon
            sx={{
              backgroundColor: "red",
            }}
          >
            <AddShoppingCartIcon sx={iconStyle} />
          </DashboardCardIcon>
          <Text variant="h6">تعداد سفارشات</Text>

          <TextInfo variant="h5"> ۱۳۰۰</TextInfo>
        </DashboardCard>
      </CardContainer>
      <CardContainer item xs={12} md={6} xl={3}>
        <DashboardCard>
          <DashboardCardIcon
            sx={{
              backgroundColor: "blue",
            }}
          >
            <PersonAddIcon sx={iconStyle} />
          </DashboardCardIcon>
          <Text variant="h6">کاربران این ماه</Text>

          <TextInfo variant="h5"> ۱۲۵</TextInfo>
        </DashboardCard>
      </CardContainer>
      <CardContainer item xs={12} md={6} xl={3}>
        <DashboardCard>
          <DashboardCardIcon
            sx={{
              backgroundColor: "darkgray",
            }}
          >
            <PrecisionManufacturingIcon sx={iconStyle} />
          </DashboardCardIcon>
          <Text variant="h6">تعداد محصولات</Text>

          <TextInfo variant="h5"> ۱۵۶ </TextInfo>
        </DashboardCard>
      </CardContainer>
    </>
  );
}

export default TopBoxes;
