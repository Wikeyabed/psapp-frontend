import { Grid, Paper, Typography, Divider, Box } from "@mui/material";
import styled from "@emotion/styled";
import theme from "../../../src/theme";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import { useState, useEffect } from "react";

const TopBox = styled(Paper)({
  padding: "10px",
  color: theme.palette.primary.main,
  borderRadius: theme.palette.primary.borderRadius,
  backgroundColor: theme.palette.primary.lightBg,
  position: "relative",
});

const CardContainer = styled(Grid)({
  padding: "20px",
});

const DashboardCardIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.primary.lightBg,
  bottom: 15,
  left: 15,
  width: 45,
  height: 45,
  cursor: "pointer",
  paddingTop: 10,
  transition: ".3s ease all",
  ":hover": {
    transform: "scale(1.1)",
  },
  borderRadius: "50%",
  textAlign: "center",
}));

function TopCards({ orders }) {
  const [chartData, setChartData] = useState([]);

  const handleChartFormat = () => {
    let arr = [];

    const times = orders.map((order) => {
      return [...order.order_date].join("");
    });

    const format = times
      .sort((a, b) => a - b)
      .map((time, i) => {
        const day = moment.unix(time).format("jYYYY/jMM/jDD");
        return [...day].join("");
      });
    const counts = {};

    format.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    for (const property in counts) {
      arr.push({ x: property, y: counts[property] });
    }

    setChartData(arr);
  };

  useEffect(() => {
    handleChartFormat();
  }, [orders]);

  return (
    <Grid container>
      <Grid xs={12} item>
        {" "}
        <Typography
          variant="h5"
          sx={{ marginBottom: "10px", textAlign: "center" }}
        >
          ... خدایا شکرت ...
        </Typography>
        {/* <StyledDivider /> */}
      </Grid>

      <CardContainer sx={{ position: "relative" }} item xs={12}>
        <Box
          sx={{
            width: "100%",
            top: -20,
            position: "relative",
          }}
        >
          {" "}
          {/* <OrderChart
            columns={15}
            name={"فاکتور"}
            typeOfChart="bar"
            title="تعداد تمامی فاکتور ها"
            chartData={chartData.slice(chartData.length - 15, chartData.length)}
          /> */}
        </Box>
      </CardContainer>
      {/* finished orders */}
      <Grid container item xs={12}>
        <CardContainer item xs={12} md={3}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              تمامی فاکتور ها{" "}
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(orders.length)}
            </Typography>
            <DashboardCardIcon sx={{ backgroundColor: "lightPrimary.main" }}>
              <DescriptionIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>

        {/* today orders */}
        <CardContainer item xs={12} md={3}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              فاکتور های تکمیل شده
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(
                orders.filter((order) => order.status == "200").length
              )}
            </Typography>

            <DashboardCardIcon sx={{ backgroundColor: "green" }}>
              <InsertDriveFileIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>

        <CardContainer item xs={12} md={3}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              فاکتور های درحال انجام
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(
                orders.filter((order) => order.status == "100").length
              )}
            </Typography>
            <DashboardCardIcon sx={{ backgroundColor: "#ed6c02" }}>
              <DescriptionIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>

        {/* today orders */}
        <CardContainer item xs={12} md={3}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              فاکتور های کنسل شده
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(
                orders.filter(
                  (order) => order.status != "100" && order.status != "200"
                ).length
              )}
            </Typography>

            <DashboardCardIcon sx={{ backgroundColor: "#0288d1" }}>
              <InsertDriveFileIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>
      </Grid>

      {/* Charty */}
      {/* all orders */}
    </Grid>
  );
}
export default TopCards;
