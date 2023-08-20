import { Grid, Paper, Typography, Divider, Box } from "@mui/material";
import styled from "@emotion/styled";
import theme from "../../../src/theme";
import { ChartLayout as InvoiceChart } from "../layout/Chart";
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

function TopCards({ invoices }) {
  const [chartData, setChartData] = useState([]);

  const handleChartFormat = () => {
    let arr = [];

    const times = invoices.map((invoice) => {
      return [...invoice.order_date].join("");
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
  }, [invoices]);

  return (
    <Grid container>
      <Grid xs={12} item>
        {" "}
        <Typography
          variant="h4"
          sx={{ marginBottom: "10px", textAlign: "center" }}
        >
          آمار
        </Typography>
        {/* <StyledDivider /> */}
      </Grid>

      {/* finished invoices */}
      <Grid container item xs={12} lg={6}>
        <CardContainer item xs={12} md={6}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              تمامی فاکتور ها{" "}
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(invoices.length)}
            </Typography>
            <DashboardCardIcon sx={{ backgroundColor: "lightPrimary.main" }}>
              <DescriptionIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>

        {/* today invoices */}
        <CardContainer item xs={12} md={6}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              فاکتور های تکمیل شده
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(
                invoices.filter((invoice) => invoice.status == "3").length
              )}
            </Typography>

            <DashboardCardIcon sx={{ backgroundColor: "green" }}>
              <InsertDriveFileIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>

        <CardContainer item xs={12} md={6}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              فاکتور های در انتظار تایید
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(
                invoices.filter((invoice) => invoice.status == "1").length
              )}
            </Typography>
            <DashboardCardIcon sx={{ backgroundColor: "#ed6c02" }}>
              <DescriptionIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>

        {/* today invoices */}
        <CardContainer item xs={12} md={6}>
          <TopBox elevation={4}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingTop: 3 }}
            >
              فاکتور های در حال پردازش
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              {persianNumber(
                invoices.filter((invoice) => invoice.status == "2").length
              )}
            </Typography>

            <DashboardCardIcon sx={{ backgroundColor: "#0288d1" }}>
              <InsertDriveFileIcon />
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>
      </Grid>

      {/* Charty */}
      {/* all invoices */}
      <CardContainer sx={{ position: "relative" }} item xs={12} lg={6}>
        <Box
          sx={{
            width: "100%",
            top: -20,
            position: "relative",
          }}
        >
          {" "}
          <InvoiceChart
            columns={10}
            name={"فاکتور"}
            typeOfChart="bar"
            title="تعداد تمامی فاکتور ها"
            chartData={chartData}
          />
        </Box>
      </CardContainer>
    </Grid>
  );
}
export default TopCards;
