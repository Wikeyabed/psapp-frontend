import { Grid, Paper, Typography, Divider } from "@mui/material";
import styled from "@emotion/styled";
import theme from "../../../src/theme";

const TopBox = styled(Paper)({
  padding: "10px",
  color: theme.palette.primary.lightBg,
  borderRadius: theme.palette.primary.borderRadius,
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

function TopCards() {
  return (
    <Grid container>
      <Grid xs={12}>
        {" "}
        <Typography
          variant="h4"
          sx={{ marginBottom: "10px", textAlign: "center" }}
        >
          آمار
        </Typography>
        <StyledDivider />
      </Grid>

      {/* finished invoices */}
      <CardContainer item xs={12} lg={4}>
        <TopBox
          sx={{
            backgroundColor: "primary.purple",
          }}
          elevation={6}
        >
          <Typography variant="h5" sx={{ textAlign: "center", paddingTop: 5 }}>
            فاکتور های تکمیل شده
          </Typography>

          <Typography variant="h2" sx={{ textAlign: "center", padding: 5 }}>
            12
          </Typography>
        </TopBox>
      </CardContainer>

      {/* today invoices */}
      <CardContainer item xs={12} lg={4}>
        <TopBox
          sx={{
            backgroundColor: "primary.blue",
          }}
          elevation={6}
        >
          <Typography variant="h5" sx={{ textAlign: "center", paddingTop: 5 }}>
            فاکتور های تکمیل شده
          </Typography>

          <Typography variant="h2" sx={{ textAlign: "center", padding: 5 }}>
            12
          </Typography>
        </TopBox>
      </CardContainer>

      {/* all invoices */}
      <CardContainer item xs={12} lg={4}>
        <TopBox
          sx={{
            backgroundColor: "primary.orange",
          }}
          elevation={6}
        >
          <Typography variant="h5" sx={{ textAlign: "center", paddingTop: 5 }}>
            فاکتور های تکمیل شده
          </Typography>

          <Typography variant="h2" sx={{ textAlign: "center", padding: 5 }}>
            12
          </Typography>
        </TopBox>
      </CardContainer>
    </Grid>
  );
}
export default TopCards;
