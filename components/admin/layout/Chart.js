import { Box, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import theme from "../../../src/theme";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useState, useEffect } from "react";
import moment from "moment-jalaali";

export function ChartLayout({ typeOfChart, title, columns, name, chartData }) {
  const [showChart, setChart] = useState(false);

  const data = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },

      xaxis: {
        type: "category",
      },
    },
    series: [
      {
        name: name,
        data: chartData,
      },
    ],
  };

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
