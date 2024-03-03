import { Grid, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import usePagination from "../../../../src/usePagination";
import Swipe from "../../layout/swiper/DraggableSwipe";
import ShopSwiperCards from "./ShopSwiperCards";
// get product list from database

function ProductListByCategory() {
  let [uniqueCategories, setUniqueCategories] = useState([]);

  const productList = useSelector((state) => state.product.products);

  const getAllCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`);
    const categories = await res.json();

    setUniqueCategories(categories);

    console.log("first", uniqueCategories);
  };
  // const productCategories = () => {
  //   let categories = [];
  //   productList.map((product) => {
  //     categories.push(product.category);
  //   });

  //   setUniqueCategories([...new Set(categories)]);
  // };

  useEffect(() => {
    getAllCategories();
  }, []);

  const setCategoryItems = (category) => {
    return productList.filter(
      (product) => product.category === category && product.is_active
    );
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
        {uniqueCategories
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((category) => {
            return (
              <Swipe
                key={category.category_id}
                title={category.category_name}
                items={setCategoryItems(category.category_name)}
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
