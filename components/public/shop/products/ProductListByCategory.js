import { Grid, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import usePagination from "../../../../src/usePagination";
import Swipe from "../../layout/swiper/DraggableSwipe";
import ShopSwiperCards from "./ShopSwiperCards";
// get product list from database

function ProductListByCategory() {
  let [uniqueCategories, setUniqueCategories] = useState([]);

  const productList = useSelector((state) => state.product.products);

  const productCategories = () => {
    let categories = [];
    productList.map((product) => {
      categories.push(product.category);
    });

    setUniqueCategories([...new Set(categories)]);
  };

  useEffect(() => {
    productCategories();
  }, [productList]);

  const setCategoryItems = (category) => {
    return productList.filter((product) => product.category === category);
  };
  return (
    <Grid container>
      <Grid
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
        }}
        item
        xs={12}
        container
      >
        {uniqueCategories.map((category) => {
          return (
            <Swipe
              key={category}
              title={category}
              items={setCategoryItems(category)}
            >
              <ShopSwiperCards />
            </Swipe>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default ProductListByCategory;
