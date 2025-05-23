import React, { useState, useEffect } from "react";
import FormTile from "../layout/FormTile";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem, Select, Typography, Box } from "@mui/material";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const StatusSelect = styled(Select)(({ theme }) => ({
  minWidth: 200,
  margin: "16px 0",
  "& .MuiSelect-select": {
    padding: "12px 32px 12px 12px",
  },
}));

const ProductTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const ProductTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const ProductTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const containerStyles = css`
  margin: 2rem auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  @media (min-width: 700px) {
    max-width: 85%;
  }
`;

const OrderForm = ({ order }) => {
  const [status, setStatus] = useState(order.status);
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
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <FormTile title={`فاکتور شماره ${order.id}`} />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StatusSelect
          value={status}
          label="وضعیت"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={"unpaid"}>پرداخت نشده</MenuItem>
          <MenuItem value={"paid"}>پرداخت شده</MenuItem>
          <MenuItem value={"pending"}>در انتظار تایید</MenuItem>
          <MenuItem value={"cancelled"}>لغو شده</MenuItem>
        </StatusSelect>
      </Box>

      <TableContainer component={Paper} css={containerStyles}>
        <ProductTable>
          <TableHead>
            <TableRow>
              <ProductTableCell align="right">نام محصول</ProductTableCell>
              <ProductTableCell align="right">تعداد</ProductTableCell>
              <ProductTableCell align="right">قیمت هر محصول</ProductTableCell>
              <ProductTableCell align="right">قیمت کل</ProductTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <ProductTableRow key={product.id} hover>
                <TableCell align="right">
                  {product.title.slice(0, 10)}
                </TableCell>
                <TableCell align="right">{product.id}</TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("fa-IR").format(product.userId * 1000)}{" "}
                  ریال
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("fa-IR").format(
                    product.id * product.userId * 1000
                  )}{" "}
                  ریال
                </TableCell>
              </ProductTableRow>
            ))}
            <ProductTableRow>
              <TableCell colSpan={3} align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  جمع کل:
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {new Intl.NumberFormat("fa-IR").format(
                    products.reduce(
                      (sum, product) =>
                        sum + product.id * product.userId * 1000,
                      0
                    )
                  )}{" "}
                  ریال
                </Typography>
              </TableCell>
            </ProductTableRow>
          </TableBody>
        </ProductTable>
      </TableContainer>
    </Box>
  );
};

export default OrderForm;
