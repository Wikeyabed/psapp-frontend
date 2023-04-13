import React, { useState, useEffect } from "react";
import FormTile from "../layout/FormTile";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem, Select } from "@mui/material";
import { css } from "@emotion/react";

const containerStyles = css`
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 90%;
  @media (min-width: 700px) {
    max-width: 70%;
  }
`;

const InvoiceForm = ({ invoice }) => {
  const [status, setStatus] = useState(invoice.status);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/posts"
      );
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <FormTile title={`فاکتور شماره ${invoice.id}`} />
      <div css={{ textAlign: "center" }}>
        <Select
          value={status}
          label="وضعیت"
          placeholder="وضعیت"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={"unpaid"}>پرداخت نشده</MenuItem>
          <MenuItem value={"paid"}>پرداخت شده</MenuItem>
          <MenuItem value={"pending"}>در انتظار تایید</MenuItem>
          <MenuItem value={"cancelled"}>لغو شده</MenuItem>
        </Select>
      </div>
      <TableContainer component={Paper} css={containerStyles}>
        <Table css={{ minWidth: 650 }} aria-label="جدول محصولات">
          <TableHead>
            <TableRow>
              <TableCell align="right" css={{ fontWeight: "bold" }}>
                نام محصول
              </TableCell>
              <TableCell align="right" css={{ fontWeight: "bold" }}>
                تعداد
              </TableCell>
              <TableCell align="right" css={{ fontWeight: "bold" }}>
                قیمت هر محصول
              </TableCell>
              <TableCell align="right" css={{ fontWeight: "bold" }}>
                قیمت کل
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="right" component="th" scope="row">
                  {product.title.slice(0, 10)}
                </TableCell>
                <TableCell align="right">{product.id}</TableCell>
                <TableCell align="right">{product.userId}</TableCell>
                <TableCell align="right">
                  {product.id * product.userId * 1000}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvoiceForm;
