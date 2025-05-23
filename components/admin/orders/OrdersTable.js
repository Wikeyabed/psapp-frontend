"use client";

import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Button,
  MenuItem,
  Backdrop,
  IconButton,
  Tooltip,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  PhoneForwardedTwoToneIcon,
  Print,
  LocalShipping,
  Receipt,
  Search,
  ExpandMore,
  PhoneAndroid,
} from "@mui/icons-material";
import OrderStatus from "./OrderStatus";
import ToPersianDate from "../../../src/TimestampToPersian";
import Link from "../../../src/Link";
import { persianNumber } from "../../../src/PersianDigits";

const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& th": {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: "0.875rem",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 16px",
  textAlign: "right",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    paddingRight: "16px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td": {
    borderBottom: "none",
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
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
}));

const StatusBadge = styled(Box)(({ theme, status }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 12px",
  borderRadius: "16px",
  fontSize: "0.75rem",
  fontWeight: 600,
  color:
    status === "200"
      ? theme.palette.success.dark
      : status === "100"
      ? theme.palette.warning.dark
      : theme.palette.error.dark,
}));

const DeliveryBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "7px 12px",
  borderRadius: "16px",
  fontSize: "1rem",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: "unset",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "0.75rem",
  fontWeight: 500,
  textTransform: "none",
  marginLeft: "8px",
  "&:first-of-type": {
    marginLeft: 0,
  },
}));

export default  function OrdersTable  ({ orders })  {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("All");
  const [loadMore, setLoadMore] = useState(15);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPhone, setShowPhone] = useState({
    id: "",
    phone: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log("orders from table ", orders);
  }, [orders]);

  const handlePhoneTrigger = (id, phone) => {
    handleOpen();
    setShowPhone({ id, phone });
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoadMore((prev) => prev + 25);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredOrders = orders
    ? orders.filter((order, i) => {
        if (category == "All") {
          return (
            order.customer_name.includes(searchValue) ||
            order.order_number.toString().includes(searchValue)
          );
        } else if (category == "finished") {
          return (
            (order.customer_name.includes(searchValue) &&
              order.status == "200") ||
            (order.order_number.toString().includes(searchValue) &&
              order.status == "200")
          );
        } else if (category == "in-progress") {
          return (
            (order.customer_name.includes(searchValue) &&
              order.status == "100") ||
            (order.order_number.toString().includes(searchValue) &&
              order.status == "100")
          );
        } else if (category == "last") {
          return (
            (order.customer_name.includes(searchValue) &&
              order.status != "100" &&
              order.status != "200") ||
            (order.order_number.toString().includes(searchValue) &&
              order.status != "100" &&
              order.status != "200")
          );
        } else {
          return (
            (order.customer_name.includes(searchValue) &&
              i >= orders.length - 10) ||
            (order.order_number.toString().includes(searchValue) &&
              i >= orders.length - 10)
          );
        }
      })
    : [];

  return (
    <Box sx={{ p: 3 }}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(4px)",
        }}
        open={open}
        onClick={handleClose}
      >
        <Box
          sx={{
            width: 300,
            height: 200,
            backgroundColor: "background.paper",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            شماره تماس مشتری
          </Typography>
          <Typography
            component={Link}
            href={`tel:+98${showPhone.phone}`}
            sx={{
              color: "primary.main",
              fontSize: "1.5rem",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {showPhone.phone}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            component={Link}
            href={`tel:+98${showPhone.phone}`}
          >
            تماس
          </Button>
        </Box>
      </Backdrop>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        مدیریت فاکتورها
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <SearchField
          variant="outlined"
          placeholder="جستجو بر اساس نام یا شماره فاکتور"
          value={searchValue}
          onChange={handleSearch}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Select
          value={category}
          onChange={handleCategoryChange}
          size="small"
          sx={{ minWidth: 200 }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="All">همه فاکتورها</MenuItem>
          <MenuItem value="finished">تکمیل شده</MenuItem>
          <MenuItem value="in-progress">در حال انجام</MenuItem>
          <MenuItem value="last">کنسل شده</MenuItem>
        </Select>
      </Box>

      <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableHeaderRow>
                <StyledTableCell>نام مشتری</StyledTableCell>
                <StyledTableCell>شماره تماس</StyledTableCell>
                <StyledTableCell>شماره فاکتور</StyledTableCell>
                <StyledTableCell>تاریخ صدور</StyledTableCell>
                <StyledTableCell>وضعیت</StyledTableCell>
                <StyledTableCell>مبلغ کل</StyledTableCell>
                <StyledTableCell>نحوه تحویل</StyledTableCell>
                <StyledTableCell>عملیات</StyledTableCell>
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .reverse()
                .sort((a, b) => b.order_number - a.order_number)
                .slice(0, loadMore)
                .map((order) => (
                  <StyledTableRow key={order.order_id} hover>
                    <StyledTableCell>
                      <Link
                        href={`users/${order.user_id}`}
                        sx={{
                          color: "primary.main",
                          fontWeight: 500,
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {order.customer_name}
                      </Link>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Tooltip title="نمایش شماره تماس">
                        <IconButton
                          onClick={() =>
                            handlePhoneTrigger(
                              order.order_id,
                              order.customer_phone
                            )
                          }
                          sx={{
                            color: "primary.main",
                            backgroundColor: "primary.light",
                            "&:hover": {
                              backgroundColor: "primary.main",
                              color: "primary.contrastText",
                            },
                          }}
                        >
                          <PhoneAndroid fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Link
                        href={`orders/${order.order_id}`}
                        sx={{
                          color: "primary.main",
                          fontWeight: 500,
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {order.order_number}
                      </Link>
                    </StyledTableCell>

                    <StyledTableCell>
                      <ToPersianDate timestamp={order.order_date} />
                    </StyledTableCell>

                    <StyledTableCell>
                      <StatusBadge status={order.status}>
                        <OrderStatus order={order} />
                      </StatusBadge>
                    </StyledTableCell>

                    <StyledTableCell>
                      {persianNumber(order.finished_price)} ریال
                    </StyledTableCell>

                    <StyledTableCell>
                      <DeliveryBadge>
                        {order.delivery_type == "in-person"
                          ? "حضوری"
                          : order.delivery_type == "snap"
                          ? "اسنپ"
                          : order.delivery_type == "shipping"
                          ? "باربری"
                          : order.delivery_type == "posting"
                          ? "پست"
                          : ""}
                      </DeliveryBadge>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Tooltip title="چاپ فاکتور">
                          <ActionButton
                            component={Link}
                            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/print/${order.order_id}`}
                            target="_blank"
                            variant="outlined"
                            startIcon={
                              <Print
                                fontSize="small"
                                sx={{
                                  ml: 2,
                                }}
                              />
                            }
                          >
                            فاکتور
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="چاپ بارنامه">
                          <ActionButton
                            component={Link}
                            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/shipping/${order.order_id}`}
                            target="_blank"
                            variant="outlined"
                            startIcon={
                              <LocalShipping
                                fontSize="small"
                                sx={{
                                  ml: 2,
                                }}
                              />
                            }
                          >
                            بارنامه
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="چاپ بیجک">
                          <ActionButton
                            component={Link}
                            href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/admin/orders/bijack/${order.order_id}`}
                            target="_blank"
                            variant="outlined"
                            startIcon={
                              <Receipt
                                fontSize="small"
                                sx={{
                                  ml: 2,
                                }}
                              />
                            }
                          >
                            بیجک
                          </ActionButton>
                        </Tooltip>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {loadMore < filteredOrders.length && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <ExpandMore />
            }
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            {loading ? "در حال بارگیری..." : "نمایش بیشتر"}
          </Button>
        </Box>
      )}
    </Box>
  );
};


