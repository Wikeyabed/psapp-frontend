import {
  Divider,
  Grid,
  Collapse,
  Typography,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@mui/material";
import usePagination from "../../../../src/usePagination";
import parse from "html-react-parser";

// get product list from database

function ProductList({ cats }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);
  const searchValue = useSelector((state) => state.product.search);
  const category = useSelector((state) => state.product.filter);
  const priceSort = useSelector((state) => state.product.priceSort);
  const [showMore, setShowMore] = useState(false);

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  const filteredProductList = productList
    .filter(
      (product) =>
        (product.info.category == category || category == "all") &&
        product.info.product_name.includes(searchValue)
    )
    .sort((a, b) => {
      if (priceSort == "cheap") {
        return (
          a.variants[0].variant_price * 1 - b.variants[0].variant_price * 1
        );
      } else {
        return (
          b.variants[0].variant_price * 1 - a.variants[0].variant_price * 1
        );
      }
    });

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    _DATA.jump(1);
  }, [category]);

  const _DATA = usePagination(filteredProductList, PER_PAGE);
  const count = Math.ceil(filteredProductList.length / PER_PAGE);
  return (
    <Grid container>
      {filteredProductList.length > 0 ? (
        _DATA.currentData().map((product, i) => {
          return (
            <Grid
              sx={{
                p: 2,
              }}
              key={i}
              item
              xs={12}
              sm={6}
              md={4}
              xl={3}
            >
              <ProductCard
                productName={product.info.product_name}
                productCode={product.info.product_id}
                category={product.info.category}
                product_uuid={product.info.product_uuid}
                variant_uuid={product.variants[0].variant_uuid}
                variant_name={product.variants[0].variant_name}
                price={product.variants[0].variant_price}
                stack={product.variants[0].variant_stack}
                imageUrl={product.info.images_url}
                discount={product.variants[0].variant_discount}
                quantity={product.variants[0].variant_quantity}
                stock={product.variants[0].variant_quantity}
              />
            </Grid>
          );
        })
      ) : (
        <Typography
          sx={{
            textAlign: "center !important",
            marginX: "auto",
          }}
          variant="h6"
        >
          {" "}
          موردی یافت نشد...
        </Typography>
      )}

      <Grid
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
        }}
        item
        xs={12}
      >
        <Pagination
          color="standard"
          count={count}
          size="large"
          page={page}
          shape="rounded"
          onChange={handleChange}
        />
      </Grid>
      <Divider
        sx={{
          my: 10,
          padding: 2,
          width: "100%",
          display: "block",
        }}
      />
      <Grid
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
        }}
        item
        container
        xs={12}
      >
        <Grid item xs={12}>
          {" "}
          <Typography
            component={"div"}
            sx={{
              width: "100%",
              textAlign: "center",
              mb: 5,
            }}
            variant="h5"
          >
            {category}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {cats.map((currentCategory) => {
            if (
              category == currentCategory.category_name &&
              currentCategory.category_description != null
            ) {
              return (
                <Collapse
                  collapsedSize={200}
                  in={showMore}
                  orientation="vertical"
                >
                  <Typography
                    component={"div"}
                    sx={{
                      width: "100%",
                      p: 2,
                    }}
                  >
                    {parse(currentCategory.category_description)}
                  </Typography>
                </Collapse>
              );
            }
          })}
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            {" "}
            <FormControlLabel
              sx={{
                mt: 5,
                mx: 0,
                border: "2px solid purple",
                backgroundColor: "rgba(139, 86, 204, .3)",
                color: "darkred",

                p: 2,
                borderRadius: "35px",
              }}
              control={
                <Switch
                  size="medium"
                  sx={{
                    textAlign: "center",
                    mx: 0,
                    fontSize: "22px !important",
                  }}
                  checked={showMore}
                  onChange={handleShowMore}
                />
              }
              label="نمایش بیشتر"
            />{" "}
          </Box>
        </Grid>

        {/* */}
      </Grid>
    </Grid>
  );
}

export default ProductList;
