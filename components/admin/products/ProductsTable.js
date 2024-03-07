import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import EditProductModal from "./EditProductModal";
import Image from "next/image";
import { getCookie } from "cookies-next";
import DeleteProduct from "./DeleteProduct";

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

function ProductsTable() {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category]);

  const fetchProducts = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log("error", error));
  };

  const fetchCategories = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCategoryList(result))
      .catch((error) => console.log("error", error));
  };

  const handleCategoryChange = (event) => {
    // console.log("cats", categories);
    setCategory(event.target.value);
  };

  const filteredProducts = products
    ? products.filter((product) => {
        if (category === "All") {
          return product.product_name.includes(searchValue);
        } else {
          return (
            product.category === category &&
            product.product_name.includes(searchValue)
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
              onOpen={fetchCategories}
              id="category-filter"
              value={category}
              onChange={handleCategoryChange}
              sx={{ width: "100%", margin: "auto" }}
              size="small"
            >
              <MenuItem value="All">تمام دسته بندی ها</MenuItem>

              {categoryList
                ? categoryList.map((category) => {
                    return (
                      <MenuItem
                        value={category.category_name}
                        key={category.category_id}
                      >
                        {category.category_name}
                      </MenuItem>
                    );
                  })
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
          xl={4}
          key={product.product_id}
        >
          <DashboardCard>
            <Box sx={{ position: "relative" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textAlign: "center", py: 1 }}
              >
                {product.product_name}
              </Typography>
              <Box sx={{ margin: "auto", textAlign: "center" }}>
                {" "}
                <Image
                  style={{ width: "100%", height: "300px", borderRadius: 5 }}
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.images_url[0]}`}
                  alt={product.product_name}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant={"subtitle1"}>
                  کد محصول : {product.product_id}
                  <br />
                  قیمت: {product.price * (1 - product.discount * 0.01)}
                  <br />
                  در صد تخفیف : {product.discount}
                  <br />
                  موجودی: {product.product_quantity}
                </Typography>
              </Box>
              <Box
                sx={{
                  py: 3,
                  mt: 2,
                  borderTop: "1px solid #e2e2e2",
                }}
                display={"flex"}
                justifyContent={"center"}
              >
                <EditProductModal product={product} />
                <DeleteProduct
                  fetchProducts={fetchProducts}
                  id={product.product_id}
                />
              </Box>
            </Box>
          </DashboardCard>
        </Grid>
      ))}
    </CardContainer>
  );
}

export default ProductsTable;
