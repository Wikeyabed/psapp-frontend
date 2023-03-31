import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import EditProductModal from "./EditProductModal";
import Image from "next/image";

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: "10px",
  backgroundColor: theme.palette.primary.main.lightBg,
  position: "relative",
  borderRadius: "10px",
  boxShadow: "rgb(0 0 0 / 4%) 0px 5px 22px, rgb(0 0 0 / 3%) 0px 0px 0px 0.5px",
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

const CardContainer = styled(Grid)(({ theme }) => ({
  // padding: "30px",
  marginTop: "30px",
}));

function ProductsTable({ products }) {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    console.log(products);
    setCategory(event.target.value);
  };

  const filteredProducts = products
    ? products.filter((product) => {
        if (category === "All") {
          return product.name.includes(searchValue);
        } else {
          return (
            product.category === category && product.name.includes(searchValue)
          );
        }
      })
    : [];

  return (
    <CardContainer container>
      <Grid item xs={12}>
        <Grid container>
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
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              padding: "10px",
            }}
          >
            <Select
              id="category-filter"
              value={category}
              onChange={handleCategoryChange}
              sx={{ width: "100%", margin: "auto" }}
              size="small"
            >
              <MenuItem value="All">تمام دسته بندی ها</MenuItem>
              {products
                ? [...new Set(products.map((product) => product.category))].map(
                    (category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    )
                  )
                : ""}
            </Select>
          </Grid>
        </Grid>
      </Grid>

      {filteredProducts.map((product) => (
        <Grid
          sx={{
            padding: "10px",
          }}
          item
          xs={12}
          sm={6}
          md={3}
          key={product.id}
        >
          <DashboardCard>
            <Box sx={{ position: "relative" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textAlign: "center", py: 1 }}
              >
                {product.name}
              </Typography>
              <Box sx={{ margin: "auto", textAlign: "center" }}>
                {" "}
                <Image
                  style={{
                    borderRadius: "10px",
                  }}
                  width={250}
                  height={230}
                  src={product.image}
                  alt={product.name}
                />
              </Box>

              <EditProductModal />
            </Box>
          </DashboardCard>
        </Grid>
      ))}
    </CardContainer>
  );
}

export default ProductsTable;
