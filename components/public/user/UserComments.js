import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Divider, TablePagination, Typography, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import ToPersianDate from "../../../src/TimestampToPersian";
import OrderStatus from "../../admin/orders/OrderStatus";
import { persianNumber } from "../../../src/PersianDigits";
import Link from "../../../src/Link";

function UserComments() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [rows, setRows] = useState([]);

  const getUserComments = () => {
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
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getUserComments();
  }, []);

  return (
    <>
      {" "}
      {rows.length > 0 ? (
        <>
          {" "}
          <Typography variant="h5" sx={{ textAlign: "center", mt: 4, mb: 2 }}>
            دیدگاه ها
          </Typography>
          <Divider />
          <TableContainer
            sx={{
              minHeight: 600,
            }}
          >
            <Table
              sx={{
                minWidth: 650,
                direction: "rtl !important",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: 450,
                    }}
                    align="right"
                  >
                    محتویات
                  </TableCell>
                  <TableCell align="right">تاریخ </TableCell>
                  <TableCell align="right">وضعیت</TableCell>

                  <TableCell align="right">لینک</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .sort((a, b) => b.comment_date - a.comment_date)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      key={row.i}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="right">{row.content}</TableCell>
                      <TableCell align="right">
                        <ToPersianDate timestamp={row.comment_date} />
                      </TableCell>
                      <TableCell align="right">
                        {row.is_active == "true" ? (
                          <Chip color="success" label="تایید شده" />
                        ) : (
                          <Chip color="warning" label="در انتظار تایید" />
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <Link
                          href={
                            row.post_type == "product"
                              ? `/products/${row.post_id}`
                              : `/blog/${row.post_id}`
                          }
                        >
                          کلیک کنید
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              rowsPerPageOptions={[10, 25]}
              rowsPerPage={rowsPerPage}
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="تعداد ردیف ها در صفحه"
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </TableContainer>
        </>
      ) : (
        "دیدگاهی موجود نیست"
      )}
    </>
  );
}

export default UserComments;
