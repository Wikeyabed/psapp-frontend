import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Box,
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

const RtlTextField = styled(TextField)(({ theme }) => ({
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
  },
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
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loadMore, setLoadMore] = useState(15);
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleLoadMore = () => {
    if (loadMore < users.length) {
      setLoadMore(loadMore + 25);
    }
  };

  const filteredUsers = users
    ? users.filter((user) => {
        return user.first_name + " " + user.last_name.includes(searchValue);
      })
    : [];

  return (
    <Grid item xs={12} sx={{ marginTop: "20px", padding: "20px" }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: "10px", textAlign: "center" }}
      >
        کاربران
      </Typography>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          padding: "10px",
        }}
      >
        <RtlTextField
          id="search-products"
          variant="outlined"
          onChange={handleSearch}
          placeholder="جستجو کنید"
          sx={{ width: "100%", margin: "auto" }}
          size="small"
        />
      </Grid>
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
              {/* <StyledTableCell>تعداد فاکتور ها</StyledTableCell> */}
              <StyledTableCell>تاریخ ثبت نام</StyledTableCell>

              <StyledTableCell>معرف</StyledTableCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0
              ? filteredUsers
                  .sort((a, b) => b.register_date - a.register_date)
                  .slice(0, loadMore)
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

                      {/* <TableCell style={{ textAlign: "right" }}>
                        {user.totalAmount}
                      </TableCell> */}

                      <TableCell style={{ textAlign: "right" }}>
                        <ToPersianDate timestamp={user.register_date} />
                      </TableCell>

                      <TableCell style={{ textAlign: "right" }}>
                        {"ایباکس"}
                      </TableCell>
                    </TableRow>
                  ))
              : ""}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              mt: 5,
              px: 15,
              py: 2,
              fontSize: 16,
            }}
            disabled={loadMore > users.length}
            variant="contained"
            onClick={handleLoadMore}
          >
            نمایش بیشتر
          </Button>
        </Box>
      </TableContainer>
    </Grid>
  );
};

export default UsersTable;
