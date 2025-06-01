import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "../../../src/Link";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
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
  Chip,
  Paper,
  Box,
  Skeleton,
  Avatar,
  Stack,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CheckCircleOutline,
  PendingActions,
  OpenInNew,
  Refresh,
  Comment,
} from "@mui/icons-material";

function UserComments() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUserComments = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-comment/`, requestOptions)
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
    getUserComments();
  }, []);

  const renderMobileView = () => (
    <Box sx={{ mt: 2 }}>
      {rows
        .sort((a, b) => b.comment_date - a.comment_date)
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
              <Typography variant="subtitle2" color="textSecondary">
                <ToPersianDate timestamp={row.comment_date} />
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ ml: 1 }}
                >
                  {row.is_active === "true" ? "تایید شده" : "در انتظار"}
                </Typography>
                {row.is_active === "true" ? (
                  <CheckCircleOutline
                    fontSize="small"
                    color="success"
                    sx={{ marginRight: "4px" }}
                  />
                ) : (
                  <PendingActions
                    fontSize="small"
                    color="warning"
                    sx={{ marginRight: "4px" }}
                  />
                )}
              </Box>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                mb: 2,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.content}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Chip
                component={Link}
                href={
                  row.post_type === "product"
                    ? `/products/${row.post_id}`
                    : `/blog/${row.post_id}`
                }
                label="مشاهده مطلب"
                size="small"
                clickable
                icon={<OpenInNew fontSize="small" />}
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              />
            </Box>
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
      <Table aria-label="user comments table">
        <TableHead>
          <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              محتوا
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "150px" }}>
              تاریخ
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "140px" }}>
              وضعیت
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "100px" }}>
              اقدامات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .sort((a, b) => b.comment_date - a.comment_date)
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
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.content}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color="textSecondary">
                    <ToPersianDate timestamp={row.comment_date} />
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography variant="caption" color="textSecondary">
                      {row.is_active === "true" ? "تایید شده" : "در انتظار"}
                    </Typography>
                    {row.is_active === "true" ? (
                      <CheckCircleOutline fontSize="small" color="success" />
                    ) : (
                      <PendingActions fontSize="small" color="warning" />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="مشاهده مطلب">
                    <IconButton
                      component={Link}
                      href={
                        row.post_type === "product"
                          ? `/products/${row.post_id}`
                          : `/blog/${row.post_id}`
                      }
                      size="small"
                      sx={{
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.dark,
                        },
                      }}
                    >
                      <OpenInNew fontSize="small" />
                    </IconButton>
                  </Tooltip>
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
            {isMobile ? "دیدگاه‌ها" : "دیدگاه‌های من"}
          </Typography>
          <Tooltip title="بروزرسانی">
            <IconButton
              onClick={getUserComments}
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
                height={isMobile ? 80 : 60}
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
              <Comment fontSize={isMobile ? "medium" : "large"} />
            </Avatar>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="textSecondary"
              gutterBottom
            >
              دیدگاهی یافت نشد
            </Typography>
            <Typography variant="body2" color="textSecondary">
              شما تاکنون دیدگاهی ارسال نکرده‌اید.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default UserComments;
