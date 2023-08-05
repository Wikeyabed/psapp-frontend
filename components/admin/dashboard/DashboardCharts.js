import { Grid, Box, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { ChartLayout as UsersChart } from "../layout/Chart";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { persianNumber } from "../../../src/PersianDigits";

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: "32px 24px",
  backgroundColor: theme.palette.primary.main.lightBg,
  maxHeight: "100%",
  position: "relative",
  width: "100%",
  borderRadius: 20,
  boxShadow: "rgb(0 0 0 / 4%) 0px 5px 22px, rgb(0 0 0 / 3%) 0px 0px 0px 0.5px",
}));

function DashboardCharts({ users }) {
  const [chartData, setChartData] = useState([]);

  const handleChartFormat = () => {
    let arr = [];

    const times = users.map((user) => {
      return [...user.register_date].join("");
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
    // console.log(counts);

    for (const property in counts) {
      arr.push({ x: persianNumber(property), y: counts[property] });
    }

    setChartData(arr);
  };

  useEffect(() => {
    handleChartFormat();
  }, [users]);
  return (
    <>
      <Grid
        sx={{
          padding: "15px",
        }}
        item
        xs={8}
      >
        <DashboardCard>
          <UsersChart
            chartData={chartData}
            columns={10}
            title="کاربران"
            typeOfChart="line"
          />
        </DashboardCard>
      </Grid>
      <Grid
        sx={{
          padding: "15px",
        }}
        item
        xs={12}
        lg={4}
      >
        <DashboardCard
          sx={{
            height: "100%",
          }}
        >
          آمار ها
          {/* <UsersChart chartData={chartData} title="فروش" typeOfChart="line" /> */}
        </DashboardCard>
      </Grid>
    </>
  );
}

export default DashboardCharts;
