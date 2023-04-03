import { Box, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import theme from "../../../src/theme";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useState, useEffect } from "react";

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

export function ChartLayout({ typeOfChart, title, columns }) {
  const [showChart, setChart] = useState(false);
  useEffect(() => {
    setChart(true);
  }, []);
  return (
    <Grid
      item
      xs={columns}
      sx={{
        margin: "auto",
      }}
    >
      {" "}
      {showChart ? (
        <Box>
          <Typography
            sx={{
              mb: 2,
              color: theme.palette.primary.textColor,
            }}
            variant="p"
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
      ) : (
        "chart is loading"
      )}
    </Grid>
  );
}
