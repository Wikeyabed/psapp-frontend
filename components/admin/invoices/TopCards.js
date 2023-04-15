import { Grid, Paper, Typography, Divider, Box } from "@mui/material";
import styled from "@emotion/styled";
import theme from "../../../src/theme";
import { ChartLayout as InvoiceChart } from "../layout/Chart";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
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

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "20%",
  margin: "auto",
  marginBottom: "10px",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderRadius: "50%",
  opacity: "0.5",
}));

const DashboardCardIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.primary.main,
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

function TopCards() {
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
              فاکتور های تکمیل شده
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              12
            </Typography>
            <DashboardCardIcon>
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
              12
            </Typography>

            <DashboardCardIcon>
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
              فاکتور های تکمیل شده
            </Typography>

            <Typography variant="h4" sx={{ textAlign: "center", padding: 3 }}>
              12
            </Typography>
            <DashboardCardIcon>
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
              12
            </Typography>

            <DashboardCardIcon>
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
            typeOfChart="bar"
            title="تعداد تمامی فاکتور ها"
          />
        </Box>
      </CardContainer>
    </Grid>
  );
}
export default TopCards;
