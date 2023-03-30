import { Grid, Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import theme from "../../../src/theme";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: theme.palette.primary.main.lightBg,
  maxHeight: "100%",
  position: "relative",
  width: "100%",
  borderRadius: 20,
  boxShadow: "rgb(0 0 0 / 4%) 0px 5px 22px, rgb(0 0 0 / 3%) 0px 0px 0px 0.5px",
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  padding: 15,
}));

const data = {
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },

    toolbar: {
      show: false,
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: "کاربران",
      data: [30, 40, 45, 50, 49, 60, 70, 150],
    },
  ],
};

export default function UsersChart({ typeOfChart, title }) {
  return (
    <div>
      <CardContainer>
        <DashboardCard>
          {typeof window !== "undefined" && (
            <Box>
              <Typography
                sx={{
                  mb: 2,
                  color: theme.palette.primary.textColor,
                }}
                variant="h5"
              >
                {title}
              </Typography>
              <Chart
                options={data.options}
                series={data.series}
                type={typeOfChart}
                width="100%"
              />
            </Box>
          )}
        </DashboardCard>
      </CardContainer>
    </div>
  );
}
