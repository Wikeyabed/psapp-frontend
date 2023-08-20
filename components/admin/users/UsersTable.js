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

const UsersTable = ({ users }) => {
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

  return (
    <Grid item xs={12} sx={{ marginTop: "20px", padding: "20px" }}>
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
              <StyledTableCell>نام یوزر</StyledTableCell>
              <StyledTableCell>سمت</StyledTableCell>
              <StyledTableCell>تعداد فاکتور ها</StyledTableCell>
              <StyledTableCell>تاریخ ثبت نام</StyledTableCell>

              <StyledTableCell>معرف</StyledTableCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {users.length > 0
              ? users
                  .sort((a, b) => a.role - b.role)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell style={{ textAlign: "right" }}>
                        <Link
                          sx={{
                            textDecoration: "none !important",
                          }}
                          href={`users/${user.id}`}
                        >
                          {user.first_name + " " + user.last_name}
                        </Link>
                      </TableCell>

                      <TableCell style={{ textAlign: "right" }}>
                        {user.role === "3"
                          ? "کاربر معمولی"
                          : user.role == "1"
                          ? "ادمین"
                          : "فروشنده"}
                      </TableCell>

                      <TableCell style={{ textAlign: "right" }}>
                        {user.totalAmount}
                      </TableCell>

                      <TableCell style={{ textAlign: "right" }}>
                        <ToPersianDate timestamp={user.register_date} />
                      </TableCell>

                      <TableCell style={{ textAlign: "right" }}>
                        {user.refer != null ? user.refer : "ایباکس"}
                      </TableCell>
                    </TableRow>
                  ))
              : ""}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          count={50}
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
