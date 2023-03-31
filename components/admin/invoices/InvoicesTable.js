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
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ModalBox from "../layout/Modal";
import ReceiptIcon from "@mui/icons-material/Receipt";

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "20%",
  margin: "auto",
  marginBottom: "10px",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderRadius: "50%",
  opacity: "0.5",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

const InvoicesTable = (props) => {
  const [open, setOpen] = useState({});
  const handleOpen = (id) => setOpen({ ...open, [id]: true });
  const handleClose = (id) => setOpen({ ...open, [id]: false });

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
  ];

  return (
    <Grid xs={12} sx={{ marginTop: "20px" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "10px", textAlign: "center" }}
      >
        فاکتور ها
      </Typography>
      <StyledDivider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ direction: "rtl" }}>
              <StyledTableCell style={{ textAlign: "right" }}>
                نام مشتری
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                تاریخ صدور
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                مبلغ کل
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell style={{ textAlign: "right" }}>
                  <ModalBox
                    handleOpen={() => handleOpen(invoice.id)}
                    handleClose={() => handleClose(invoice.id)}
                    open={open[invoice.id] || false}
                    buttonText={invoice.customerName}
                    icon={<ReceiptIcon />}
                  >
                    <h1 style={{ padding: 50 }}>
                      {invoice.id} {invoice.customerName}
                    </h1>
                  </ModalBox>
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  {invoice.date}
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default InvoicesTable;
