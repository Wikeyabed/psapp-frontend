import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Select,
  MenuItem,
  Typography,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import InvoiceStatus from "./InvoiceStatus";
import { getCookie } from "cookies-next";

const theme = createTheme({
  direction: "rtl",
});

const InvoicePage = ({ invoice }) => {
  // Sample data
  const [rows, setRows] = useState([]);

  const [status, setStatus] = useState(invoice.status);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    let prodArr = [];
    invoice.products.map((prod) => {
      prodArr.push(JSON.parse(prod));
    });

    setRows(prodArr);

    console.log(prodArr);
  }, []);

  // Handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", getCookie("x-auth-token"));

    var raw = JSON.stringify({
      status: e.target.value,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${invoice.order_id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <AdminLayout>
      <ThemeProvider theme={theme}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            فاکتور شماره: {invoice.order_number}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="subtitle1" gutterBottom>
              تاریخ صدور:
            </Typography>
            <ToPersianDate timestamp={invoice.order_date} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography component={"div"} variant="subtitle1" gutterBottom>
              تاریخ دریافت:{" "}
              <Box
                sx={{
                  color: "primary.main",
                }}
                component={"span"}
              >
                {" "}
                {moment.unix(invoice.order_date).format("jYYYY/jMM/jDD")}
              </Box>{" "}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              شماره فاکتور: {invoice.order_number}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              آقا/خانم : {invoice.customer_name}
            </Typography>
            <Typography display={"flex"} variant="subtitle1" gutterBottom>
              وضعیت: <InvoiceStatus status={status} />
            </Typography>
          </div>
        </div>
        <Divider sx={{ marginY: 2 }} />

        <Select
          size="small"
          sx={{
            marginBottom: 1,
          }}
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value={invoice.status}>وضعیت فعلی</MenuItem>
          <MenuItem value={"11"}>در حال پردازش</MenuItem>
          <MenuItem value={"20"}>تکمیل شده</MenuItem>
          <MenuItem value={"404"}>کنسل شده</MenuItem>
        </Select>

        <Paper elevation={2} sx={{ padding: 2 }}>
          <List sx={{ padding: 0 }}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <ListItem
                  disablePadding
                  sx={{
                    borderBottom: "1px solid #e2e2e2",
                    paddingRight: 2,
                    paddingBottom: 2,
                  }}
                >
                  <ListItemText
                    primary="نام محصول"
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      align: "right",
                    }}
                  />
                </ListItem>
                {rows.map((row, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={`${row.product_name}`}
                      primaryTypographyProps={{ variant: "subtitle1" }}
                    />
                  </ListItem>
                ))}
              </Grid>
              <Grid item xs={2}>
                <ListItem
                  disablePadding
                  sx={{
                    borderBottom: "1px solid #e2e2e2",
                    paddingRight: 2,
                    paddingBottom: 2,
                  }}
                >
                  <ListItemText
                    primary={"تعداد"}
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      align: "right",
                    }}
                  />
                </ListItem>
                {rows.map((row) => (
                  <ListItem key={row.id}>
                    <ListItemText
                      primary={`${persianNumber(row.product_quantity)}`}
                      primaryTypographyProps={{ variant: "subtitle1" }}
                    />
                  </ListItem>
                ))}
              </Grid>
              <Grid item xs={3}>
                <ListItem
                  disablePadding
                  sx={{
                    borderBottom: "1px solid #e2e2e2",
                    paddingRight: 2,
                    paddingBottom: 2,
                  }}
                >
                  <ListItemText
                    primary={"قیمت هر عدد"}
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      align: "right",
                    }}
                  />
                </ListItem>
                {rows.map((row) => (
                  <ListItem key={row.id}>
                    <ListItemText
                      primary={`${persianNumber(row.unit_price)} ریال`}
                      primaryTypographyProps={{ variant: "subtitle1" }}
                    />
                  </ListItem>
                ))}
              </Grid>
              <Grid item xs={3}>
                <ListItem
                  disablePadding
                  sx={{
                    borderBottom: "1px solid #e2e2e2",
                    paddingRight: 2,
                    paddingBottom: 2,
                  }}
                >
                  <ListItemText
                    primary={"قیمت کل "}
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      align: "right",
                    }}
                  />
                </ListItem>
                {rows.map((row) => (
                  <ListItem key={row.id}>
                    <ListItemText
                      primary={`${persianNumber(row.total_price)} ریال`}
                      primaryTypographyProps={{
                        variant: "subtitle1",
                        align: "right",
                      }}
                    />
                  </ListItem>
                ))}
              </Grid>
            </Grid>
            <ListItem
              // disablePadding
              sx={{
                borderTop: "1px solid #e2e2e2",
              }}
            >
              <ListItemText
                primary={` مبلغ کل `}
                secondary={`${persianNumber(invoice.finished_price)}  ریال`}
                primaryTypographyProps={{
                  variant: "h5",
                  align: "left",
                }}
                secondaryTypographyProps={{
                  variant: "subtitle2",
                  align: "left",
                  marginTop: 1,
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </ThemeProvider>
    </AdminLayout>
  );
};
export default InvoicePage;
