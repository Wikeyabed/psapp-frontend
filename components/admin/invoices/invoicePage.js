import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Divider,
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
    { id: 1, name: "محصول A", price: 10 },
    { id: 2, name: "محصول B", price: 20 },
    { id: 3, name: "محصول C", price: 30 },
  ]);

  // To keep track of selected status
  const [status, setStatus] = useState("Pending");

  // To calculate the final price
  const calculateTotalPrice = () => {
    let total = 0;
    rows.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const router = useRouter();
  const { id } = router.query;

  // To keep track of created date and time
  const [createdAt, setCreatedAt] = useState(new Date());

  // Set the date and time when the component mounts
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
        <h2 style={{ textAlign: "center" }}>
          فاکتور #{id} برای آقای یوسفی ({createdAt.toLocaleString()})
        </h2>
        <Divider
          color="#e2e2e2"
          sx={{
            height: 5,
            width: "300px",
            marginX: "auto",
            marginBottom: 2,
            boxShadow: "1px 1px 1px #e2e2e2",
          }}
        />
        <TableContainer component={Paper} sx={{ padding: "10px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">تعداد</TableCell>
                <TableCell align="right">نام محصول</TableCell>
                <TableCell align="center">قیمت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={
                    index % 2 ? { bgcolor: "#f5f5f5" } : { bgcolor: "#e1e1e1" }
                  }
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <strong>جمع کل: </strong>
                </TableCell>
                <TableCell align="center">{calculateTotalPrice()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Select value={status} onChange={handleStatusChange}>
                    <MenuItem value={"Pending"}>در انتظار</MenuItem>
                    <MenuItem value={"Processing"}>در حال پردازش</MenuItem>
                    <MenuItem value={"Complete"}>کامل شده</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </AdminLayout>
  );
};

export default InvoiceTable;
