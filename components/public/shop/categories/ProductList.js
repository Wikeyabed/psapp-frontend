import {
  Grid,
  Typography,
  Pagination,
  Divider,
  Collapse,
  FormControlLabel,
  Switch,
  Box,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import usePagination from "../../../../src/usePagination";
import parse from "html-react-parser";

function ProductList({ cats }) {
  const productList = useSelector((state) => state.product.products);
  const searchValue = useSelector((state) => state.product.search);
  const category = useSelector((state) => state.product.filter);
  const priceSort = useSelector((state) => state.product.priceSort);
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filteredProductList = productList
    .filter(
      (product) =>
        (product.info.category === category || category === "all") &&
        product.info.product_name.includes(searchValue)
    )
    .sort((a, b) => {
      return priceSort === "cheap"
        ? a.variants[0].variant_price - b.variants[0].variant_price
        : b.variants[0].variant_price - a.variants[0].variant_price;
    });

  const _DATA = usePagination(filteredProductList, PER_PAGE);
  const count = Math.ceil(filteredProductList.length / PER_PAGE);

  useEffect(() => {
    _DATA.jump(1);
    setPage(1);
  }, [category, searchValue, priceSort]);

  const currentCategory = cats.find((cat) => cat.category_name === category);

  return (
    <Box sx={{ mb: 4 }}>
      {/* لیست محصولات */}
      <Grid container spacing={3}>
        {filteredProductList.length > 0 ? (
          _DATA.currentData().map((product, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: "center", my: 4 }}>
              محصولی یافت نشد
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* صفحه‌بندی */}
      {filteredProductList.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={count}
            page={page}
            onChange={(e, p) => {
              setPage(p);
              _DATA.jump(p);
            }}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1rem",
                "&.Mui-selected": {
                  fontWeight: "bold",
                },
              },
            }}
          />
        </Box>
      )}

      {/* توضیحات دسته‌بندی */}
      {currentCategory?.category_description && (
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            درباره دسته‌بندی {currentCategory.category_name}
          </Typography>
          <Collapse in={showMore} collapsedSize={200}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {parse(currentCategory.category_description)}
            </Box>
          </Collapse>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Chip
              label={showMore ? "نمایش کمتر" : "نمایش بیشتر"}
              onClick={() => setShowMore(!showMore)}
              sx={{
                cursor: "pointer",
                backgroundColor: "#06b6d4",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0891b2", // یک رنگ کمی تیره‌تر برای hover
                },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductList;
