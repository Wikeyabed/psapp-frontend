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
  Chip,
  Avatar,
  InputAdornment,
  Skeleton,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ToPersianDate from "../../../src/TimestampToPersian";
import Link from "../../../src/Link";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RefreshIcon from "@mui/icons-material/Refresh";

const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& th": {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: "0.875rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    cursor: "pointer",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px",
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-outlined": {
    transformOrigin: "right",
    right: "24px",
    left: "auto",
  },
  "& .MuiInputAdornment-root": {
    marginLeft: theme.spacing(1),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 16px",
  textAlign: "right",
  borderColor: theme.palette.divider,
  "& a": {
    color: theme.palette.text.primary,
    textDecoration: "none",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
}));

const RoleChip = styled(Chip)(({ theme, role }) => ({
  fontWeight: 600,
  backgroundColor:
    role === "1"
      ? theme.palette.success.light
      : role === "2"
      ? theme.palette.warning.light
      : theme.palette.info.light,
  color:
    role === "1"
      ? theme.palette.success.contrastText
      : role === "2"
      ? theme.palette.warning.contrastText
      : theme.palette.info.contrastText,
}));

const UsersTable = ({ users, loading }) => {
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users
    ? users.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const search = searchValue.toLowerCase();
        return (
          fullName.includes(search) ||
          user.email?.toLowerCase().includes(search) ||
          user.phone?.includes(searchValue)
        );
      })
    : [];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleRefresh = () => {
    // Add your refresh logic here
    setSearchValue("");
    setPage(0);
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="600">
            مدیریت کاربران
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <RtlTextField
          fullWidth
          variant="outlined"
          value={searchValue}
          onChange={handleSearch}
          placeholder="جستجوی کاربر..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchValue("")}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableHeaderRow>
                  <StyledTableCell>کاربر</StyledTableCell>
                  <StyledTableCell>نقش</StyledTableCell>
                  <StyledTableCell>تاریخ ثبت‌نام</StyledTableCell>
                  <StyledTableCell>معرف</StyledTableCell>
                  <StyledTableCell>وضعیت</StyledTableCell>
                </StyledTableHeaderRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  // Loading skeleton
                  Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Box display="flex" alignItems="center">
                          <Skeleton variant="circular" width={40} height={40} />
                          <Box ml={2}>
                            <Skeleton width={100} height={20} />
                            <Skeleton width={80} height={16} />
                          </Box>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton width={80} height={24} />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton width={100} height={20} />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton width={80} height={20} />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton width={60} height={24} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : filteredUsers.length > 0 ? (
                  filteredUsers
                    .sort((a, b) => b.register_date - a.register_date)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <StyledTableRow key={user.id} hover>
                        <StyledTableCell>
                          <Link href={`users/${user.id}`}>
                            <Box display="flex" alignItems="center">
                              <Avatar
                                sx={{ width: 40, height: 40, mr: 2, ml:2 }}
                                src={user.avatar}
                                alt={`${user.first_name} ${user.last_name}`}
                              >
                                
                              </Avatar>
                              <Box>
                                <Typography fontWeight="500">
                                  {user.first_name} {user.last_name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {user.email || user.phone}
                                </Typography>
                              </Box>
                            </Box>
                          </Link>
                        </StyledTableCell>

                        <StyledTableCell>
                          <RoleChip
                            size="small"
                            label={
                              user.role === "3"
                                ? "کاربر معمولی"
                                : user.role === "1"
                                ? "ادمین"
                                : "فروشنده"
                            }
                            role={user.role}
                          />
                        </StyledTableCell>

                        <StyledTableCell>
                          <Tooltip
                            title={
                              <ToPersianDate
                                timestamp={user.register_date}
                                full
                              />
                            }
                          >
                            <Box>
                              <ToPersianDate timestamp={user.register_date} />
                            </Box>
                          </Tooltip>
                        </StyledTableCell>

                        <StyledTableCell>
                          <Chip
                            size="small"
                            label="ایباکس"
                            variant="outlined"
                          />
                        </StyledTableCell>

                        <StyledTableCell>
                          <Chip
                            size="small"
                            label={user.is_active ? "فعال" : "غیرفعال"}
                            color={user.is_active ? "success" : "error"}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary">
                        کاربری یافت نشد
                      </Typography>
                      <Button
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        sx={{ mt: 1 }}
                      >
                        بارگذاری مجدد
                      </Button>
                    </TableCell>
                  </TableRow>
                )}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="تعداد در هر صفحه:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} از ${count !== -1 ? count : `more than ${to}`}`
            }
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UsersTable;
