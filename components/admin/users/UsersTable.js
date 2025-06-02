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
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import ToPersianDate from "../../../src/TimestampToPersian";
import Link from "../../../src/Link";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RefreshIcon from "@mui/icons-material/Refresh";

// پالت رنگی جدید
const primaryColor = '#6366f1';
const secondaryColor = '#06b6d4';

const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
  "& th": {
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: "0.875rem",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: alpha(primaryColor, 0.03),
  },
  "&:hover": {
    backgroundColor: alpha(primaryColor, 0.08),
    cursor: "pointer",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: theme.palette.common.white,
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: primaryColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: primaryColor,
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-outlined": {
    transformOrigin: "right",
    right: "24px",
    left: "auto",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  "& .MuiInputAdornment-root": {
    marginLeft: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  textAlign: "right",
  borderColor: theme.palette.grey[200],
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
  "& a": {
    color: theme.palette.text.primary,
    textDecoration: "none",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    "&:hover": {
      color: primaryColor,
      textDecoration: "underline",
    },
  },
}));

const RoleChip = styled(Chip)(({ theme, role }) => ({
  fontWeight: 600,
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
  backgroundColor:
    role === "1"
      ? alpha(primaryColor, 0.2)
      : role === "2"
      ? alpha(secondaryColor, 0.2)
      : theme.palette.grey[200],
  color:
    role === "1"
      ? primaryColor
      : role === "2"
      ? secondaryColor
      : theme.palette.text.secondary,
  border:
    role === "1"
      ? `1px solid ${primaryColor}`
      : role === "2"
      ? `1px solid ${secondaryColor}`
      : `1px solid ${theme.palette.grey[300]}`,
}));

const UsersTable = ({ users, loading }) => {
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setPage(0);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleRefresh = () => {
    setSearchValue("");
    setPage(0);
  };

  return (
    <Grid container spacing={3} sx={{ p: 3, fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="600" sx={{ color: primaryColor, fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
            مدیریت کاربران
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            sx={{
              backgroundColor: primaryColor,
              borderRadius: "12px",
              minHeight: "48px",
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
              "&:hover": {
                backgroundColor: alpha(primaryColor, 0.9),
              },
            }}
          >
            کاربر جدید
          </Button>
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
                <SearchIcon sx={{ color: alpha(primaryColor, 0.7) }} />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={() => setSearchValue("")}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(primaryColor, 0.1),
                    }
                  }}
                >
                  <RefreshIcon fontSize="small" sx={{ color: primaryColor }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
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
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  mr: 2, 
                                  ml: 2,
                                  backgroundColor: alpha(primaryColor, 0.1),
                                  color: primaryColor
                                }}
                                src={user.avatar}
                                alt={`${user.first_name} ${user.last_name}`}
                              />
                              <Box>
                                <Typography fontWeight="500" fontFamily="'Segoe UI', Tahoma, sans-serif">
                                  {user.first_name} {user.last_name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  fontFamily="'Segoe UI', Tahoma, sans-serif"
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
                            <Box fontFamily="'Segoe UI', Tahoma, sans-serif">
                              <ToPersianDate timestamp={user.register_date} />
                            </Box>
                          </Tooltip>
                        </StyledTableCell>

                        <StyledTableCell>
                          <Chip
                            size="small"
                            label="ایباکس"
                            variant="outlined"
                            sx={{
                              fontFamily: "'Segoe UI', Tahoma, sans-serif",
                              borderColor: theme => theme.palette.grey[300],
                              color: theme => theme.palette.text.secondary
                            }}
                          />
                        </StyledTableCell>

                        <StyledTableCell>
                        <Chip
  size="small"
  label={user.is_active ? "فعال" : "غیرفعال"}
  sx={(theme) => ({
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    backgroundColor: user.is_active 
      ? alpha(secondaryColor, 0.2) 
      : alpha(theme.palette.error.main, 0.2),
    color: user.is_active 
      ? secondaryColor 
      : theme.palette.error.main,
    border: user.is_active 
      ? `1px solid ${secondaryColor}` 
      : `1px solid ${theme.palette.error.main}`
  })}
/>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary" fontFamily="'Segoe UI', Tahoma, sans-serif">
                        کاربری یافت نشد
                      </Typography>
                      <Button
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        sx={{ 
                          mt: 1,
                          color: primaryColor,
                          fontFamily: "'Segoe UI', Tahoma, sans-serif",
                          "&:hover": {
                            backgroundColor: alpha(primaryColor, 0.1),
                          }
                        }}
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
            sx={{ 
              borderTop: "1px solid",
              borderColor: "divider",
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                fontFamily: "'Segoe UI', Tahoma, sans-serif",
              }
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UsersTable;