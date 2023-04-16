import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ToPersianDate from "../../../src/TimestampToPersian";
import Link from "../../../src/Link";

const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.lightPrimary.main,
  borderRadius: "10px",
  color: theme.palette.primary.lightBg,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.lightBg,
  padding: "20px",
  textAlign: "right",
  minWidth: "180px",
}));

const UsersTable = (props) => {
  const [open, setOpen] = useState({});
  const handleOpen = (id) => setOpen({ ...open, [id]: true });
  const handleClose = (id) => setOpen({ ...open, [id]: false });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const invoices = [
    { id: 1, customerName: "جان دو", date: "2022-01-15", totalAmount: 500 },
    {
      id: 2,
      customerName: "جین اسمیت",
      date: "2022-01-20",
      totalAmount: 1000,
    },
    {
      id: 3,
      customerName: "باب جانسون",
      date: "2022-01-22",
      totalAmount: 750,
    },
    {
      id: 4,
      customerName: "آلیسون جونز",
      date: "2022-01-23",
      totalAmount: 2000,
    },
    {
      id: 5,
      customerName: "مریم شجاع",
      date: "2022-01-23",
      totalAmount: 300,
    },
    {
      id: 6,
      customerName: "فواد عزیزی",
      date: "2022-01-24",
      totalAmount: 900,
    },
    {
      id: 7,
      customerName: "صالح رحمانی",
      date: "2022-01-25",
      totalAmount: 600,
    },
    {
      id: 8,
      customerName: "سارا عباسی",
      date: "2022-01-26",
      totalAmount: 1500,
    },
    {
      id: 9,
      customerName: "جواد عزیزی",
      date: "2022-01-27",
      totalAmount: 800,
    },
    {
      id: 10,
      customerName: "آرمین شاهین",
      date: "2022-01-28",
      totalAmount: 1200,
    },
    {
      id: 11,
      customerName: "نرگس حسینی",
      date: "2022-01-29",
      totalAmount: 400,
    },
  ];

  return (
    <Grid xs={12} sx={{ marginTop: "20px", padding: "20px" }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: "10px", textAlign: "center" }}
      >
        کاربران
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
        }}
      >
        <Table>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledTableCell>نام مشتری</StyledTableCell>
              <StyledTableCell>تاریخ صدور</StyledTableCell>
              <StyledTableCell>تعداد فاکتور ها</StyledTableCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {invoices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell style={{ textAlign: "right" }}>
                    <Link href={`users/${invoice.id}`}>
                      کاربر {invoice.customerName}
                    </Link>
                  </TableCell>

                  <TableCell style={{ textAlign: "right" }}>
                    <ToPersianDate timestamp={1677148856} />
                  </TableCell>

                  <TableCell style={{ textAlign: "right" }}>
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          count={invoices.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد ردیف ها در صفحه"
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </TableContainer>
    </Grid>
  );
};

export default UsersTable;
