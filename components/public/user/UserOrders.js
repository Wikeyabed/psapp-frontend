import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "../../../src/Link";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import UserOrderStatus from "./UserOrderStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  TablePagination,
  Typography,
  Paper,
  Box,
  Skeleton,
  Avatar,
  Stack,
  Tooltip,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Receipt, Print, Refresh, ArrowForwardIos } from "@mui/icons-material";

function UserOrders() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOrdersByUserId = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/client-orders/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRows(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleOrdersByUserId();
  }, []);

  const renderMobileView = () => (
    <Box sx={{ mt: 2 }}>
      {rows
        .sort((a, b) => b.order_number - a.order_number)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="subtitle2" color="primary" fontWeight="bold">
                فاکتور {row.order_number}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                <ToPersianDate timestamp={row.order_date} />
              </Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="body2">وضعیت:</Typography>
              <UserOrderStatus status={row.status} />
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="body2">مبلغ کل:</Typography>
              <Typography variant="body2" fontWeight="bold">
                {persianNumber(row.finished_price)} ریال
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                component={Link}
                href={`/user/orders/${row.order_id}`}
                variant="outlined"
                size="small"
                endIcon={<ArrowForwardIos fontSize="small" />}
                sx={{
                  minWidth: "unset",
                  px: 1,
                }}
              >
                جزئیات
              </Button>
              <Button
                component={Link}
                href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/user/print/${row.order_id}`}
                target="_blank"
                variant="contained"
                size="small"
                startIcon={<Print fontSize="small" />}
                sx={{
                  minWidth: "unset",
                  px: 1,
                  bgcolor: "#6366f1",
                  "&:hover": { bgcolor: "#4f4fcc" },
                }}
              >
                چاپ فاکتور
              </Button>
            </Stack>
          </Paper>
        ))}
    </Box>
  );

  const renderDesktopView = () => (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
      }}
    >
      <Table aria-label="user orders table">
        <TableHead>
          <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              شماره فاکتور
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "150px" }}>
              تاریخ صدور
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "120px" }}>
              وضعیت
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "120px" }}>
              مبلغ کل
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "150px" }}>
              اقدامات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .sort((a, b) => b.order_number - a.order_number)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  align="right"
                  component={Link}
                  href={`/user/orders/${row.order_id}`}
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  فاکتور {row.order_number}
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color="textSecondary">
                    <ToPersianDate timestamp={row.order_date} />
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <UserOrderStatus status={row.status} />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {persianNumber(row.finished_price)} ریال
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/user/print/${row.order_id}`}
                    target="_blank"
                    variant="contained"
                    size="small"
                    startIcon={<Print fontSize="small" />}
                    sx={{
                      fontSize: "0.75rem",
                      px: 1.5,
                      py: 0.5,
                      bgcolor: "#6366f1",
                      "&:hover": { bgcolor: "#4f4fcc" },
                    }}
                  >
                    چاپ فاکتور
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ maxWidth: "100%", overflow: "hidden", p: isMobile ? 1 : 3 }}>
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          p: isMobile ? 1 : 3,
          borderRadius: isMobile ? 0 : 4,
          backgroundColor: theme.palette.background.paper,
          boxShadow: isMobile ? "none" : undefined,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            {isMobile ? "سفارشات من" : "سفارشات و فاکتورهای من"}
          </Typography>
          <Tooltip title="بروزرسانی">
            <IconButton
              onClick={handleOrdersByUserId}
              color="primary"
              size={isMobile ? "small" : "medium"}
              sx={{
                backgroundColor: theme.palette.action.hover,
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                },
              }}
            >
              <Refresh fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box sx={{ width: "100%" }}>
            {[...Array(isMobile ? 3 : 5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={isMobile ? 120 : 60}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  width: "100%",
                }}
              />
            ))}
          </Box>
        ) : rows.length > 0 ? (
          <>
            {isMobile ? renderMobileView() : renderDesktopView()}

            <TablePagination
              component="div"
              rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 25]}
              rowsPerPage={rowsPerPage}
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="تعداد در صفحه:"
              labelDisplayedRows={({ from, to, count }) =>
                `${persianNumber(from)}-${persianNumber(to)} از ${persianNumber(
                  count
                )}`
              }
              sx={{
                mt: 2,
                "& .MuiTablePagination-toolbar": {
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  px: isMobile ? 0 : undefined,
                },
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  {
                    fontSize: isMobile ? "0.8rem" : undefined,
                  },
              }}
            />
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              p: isMobile ? 2 : 4,
              backgroundColor: theme.palette.action.hover,
              borderRadius: 3,
            }}
          >
            <Avatar
              sx={{
                width: isMobile ? 50 : 60,
                height: isMobile ? 50 : 60,
                mx: "auto",
                mb: 2,
                bgcolor: theme.palette.grey[300],
              }}
            >
              <Receipt fontSize={isMobile ? "medium" : "large"} />
            </Avatar>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="textSecondary"
              gutterBottom
            >
              فاکتوری یافت نشد
            </Typography>
            <Typography variant="body2" color="textSecondary">
              شما تاکنون سفارشی ثبت نکرده‌اید.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default UserOrders;
