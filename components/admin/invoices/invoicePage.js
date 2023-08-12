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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";

const theme = createTheme({
  direction: "rtl",
});

const InvoicePage = ({ invoice }) => {
  // Sample data
  const [rows, setRows] = useState([]);

  const [status, setStatus] = useState("Pending");

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
  };

  return (
    <AdminLayout>
      <ThemeProvider theme={theme}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            فاکتور شماره: {id}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="subtitle1" gutterBottom>
              تاریخ صدور:
            </Typography>
            <ToPersianDate timestamp={invoice.invoice_date} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              شماره فاکتور: {id}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              آقا/خانم : {invoice.customer_name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              وضعیت: {status}
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
          <MenuItem value={"Pending"}>در انتظار</MenuItem>
          <MenuItem value={"Processing"}>در حال پردازش</MenuItem>
          <MenuItem value={"Complete"}>کامل شده</MenuItem>
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
                {rows.map((row) => (
                  <ListItem key={row.invoice_id}>
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
                      primary={`${row.product_quantity}`}
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
                      primary={`${row.unit_price} ریال`}
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
                      primary={`${row.total_price} ریال`}
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
