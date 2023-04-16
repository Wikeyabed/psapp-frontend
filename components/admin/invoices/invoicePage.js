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

const theme = createTheme({
  direction: "rtl",
});

const InvoiceTable = () => {
  // Sample data
  const [rows, setRows] = useState([
    { id: 1, name: "محصول A", price: 40, quantity: 50 },
    { id: 2, name: "محصول B", price: 20, quantity: 150 },
    { id: 3, name: "محصول C", price: 30, quantity: 450 },
  ]);

  const [status, setStatus] = useState("Pending");

  const calculateTotalPrice = () => {
    let total = 0;
    rows.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const router = useRouter();
  const { id } = router.query;

  const [createdAt, setCreatedAt] = useState(new Date());

  useEffect(() => {
    setCreatedAt(new Date());
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              تاریخ صدور: {createdAt.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              شماره تماس: 09123456789
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              صادر کننده: آقای یوسفی
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              شماره فاکتور: {id}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              یوسفی: آقای/خانم
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
                  <ListItem key={row.id}>
                    <ListItemText
                      primary={`${row.name}`}
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
                      primary={`${row.quantity}`}
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
                      primary={`${row.price}`}
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
                      primary={`${row.price * row.quantity} تومان`}
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
                secondary={`${calculateTotalPrice()}  تومان`}
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
export default InvoiceTable;
