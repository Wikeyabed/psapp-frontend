"use client";
import React from "react";
import { Grid } from "@mui/material";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import DraggableSwipe from "../../layout/swiper/DraggableSwipe";
import RecommendedSingle from "./RecommendedSingle";

function RecommendedProduct({ products, allVariants }) {
  const randomProduct = [
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
  ];

  console.log("randoms", randomProduct);
  return (
    <>
      <Grid
        sx={{
          //   border: "1px solid #ccc",
          padding: 5,
          borderRadius: 5,
          my: 4,
        }}
        container
        spacing={1}
      >
        <DraggableSwipe title={"محصولات پیشنهادی"} items={randomProduct}>
          <RecommendedSingle />
        </DraggableSwipe>
      </Grid>
    </>
  );
}

export default RecommendedProduct;
