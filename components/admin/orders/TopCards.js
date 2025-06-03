import { Grid, Paper, Typography, Box, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import { useState, useEffect } from "react";

// پالت رنگی سفارشی
const customColors = {
  primary: "#6366f1",
  secondary: "#06b6d4",
  success: "#10b981",
  warning: "#f59e0b",
  info: "#3b82f6",
  error: "#ef4444",
  lightBg: "#f8fafc",
};

const TopBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 25px 0 rgba(0, 0, 0, 0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "5px",
    height: "100%",
    backgroundColor: customColors.primary,
  },
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const DashboardCardIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "rotate(15deg)",
  },
}));

const ValueText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
  margin: `${theme.spacing(10)} 0`,
}));

function TopCards({ orders }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  const handleChartFormat = () => {
    let arr = [];
    const times = orders.map((order) => [...order.order_date].join(""));
    const format = times
      .sort((a, b) => a - b)
      .map((time) => moment.unix(time).format("jYYYY/jMM/jDD"));

    const counts = {};
    format.forEach((x) => {
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

  // آیکون‌ها و استایل‌های هر کارت
  const cardConfigs = [
    {
      title: "تمامی فاکتورها",
      value: orders.length,
      icon: <DescriptionIcon fontSize="medium" />,
      iconBg: customColors.primary,
    },
    {
      title: "فاکتورهای تکمیل شده",
      value: orders.filter((order) => order.status == "200").length,
      icon: <InsertDriveFileIcon fontSize="medium" />,
      iconBg: customColors.success,
    },
    {
      title: "فاکتورهای در حال انجام",
      value: orders.filter((order) => order.status == "100").length,
      icon: <DescriptionIcon fontSize="medium" />,
      iconBg: customColors.warning,
    },
    {
      title: "فاکتورهای کنسل شده",
      value: orders.filter(
        (order) => order.status != "100" && order.status != "200"
      ).length,
      icon: <InsertDriveFileIcon fontSize="medium" />,
      iconBg: customColors.error,
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginTop: theme.spacing(4), // اضافه شده
            marginBottom: theme.spacing(6), // کمی افزایش یافته
            color: customColors.primary,
            fontWeight: 700,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})`,
              borderRadius: "2px",
            },
          }}
        >
          ... خدایا شکرت ...
        </Typography>
      </Grid>

      {cardConfigs.map((card, index) => (
        <CardContainer key={index} item xs={12} sm={6} md={3}>
          <TopBox elevation={0}>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              {card.title}
            </Typography>

            <ValueText variant="h3">{persianNumber(card.value)}</ValueText>

            <DashboardCardIcon sx={{ backgroundColor: card.iconBg }}>
              {card.icon}
            </DashboardCardIcon>
          </TopBox>
        </CardContainer>
      ))}
    </Grid>
  );
}

export default TopCards;
