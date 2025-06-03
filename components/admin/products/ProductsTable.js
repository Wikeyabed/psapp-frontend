import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Divider,
  Tooltip,
  Skeleton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import Image from "next/image";
import { getCookie } from "cookies-next";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditProductModal from "./EditProductModal";
import DeleteProduct from "./DeleteProduct";
import AddVariantModal from "./AddVariantModal";

const ProductCard = ({ product, fetchProducts, isMobile }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "12px",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[6],
        },
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "none",
        background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "100%",
            overflow: "hidden",
          }}
        >
          {product.images_url?.length > 0 ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.images_url[0]}`}
              alt={product.product_name}
              layout="fill"
              objectFit="contain"
              style={{
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                transition: "transform 0.3s",
              }}
            />
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "action.hover",
                borderRadius: "12px 12px 0 0",
              }}
            >
              <InventoryIcon fontSize="large" color="disabled" />
            </Box>
          )}
        </Box>

        <CardContent sx={{ pb: 1, px: 2 }}>
          <Tooltip title={product.product_name} arrow>
            <Typography
              variant={isMobile ? "body1" : "body2"}
              fontWeight={600}
              sx={{
                mb: 1,
                color: theme.palette.primary.dark,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: isMobile ? "auto" : "44px",
              }}
            >
              {product.product_name}
            </Typography>
          </Tooltip>

          <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1.5 }}>
            <Chip
              label={`#${product.product_id}`}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.75rem",
                borderColor: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
              }}
            />
            {product.category && (
              <Chip
                label={product.category}
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  backgroundColor: theme.palette.info.light,
                  color: theme.palette.info.contrastText,
                }}
              />
            )}
          </Box>

          <Divider sx={{ my: 1.5, borderColor: theme.palette.divider, opacity: 0.5 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
              <LocalOfferIcon fontSize="small" sx={{ mr: 0.5 }} />
              قیمت:
            </Typography>

            <Box display="flex" gap={1} alignItems="baseline">
              {product.discount > 0 ? (
                <>
                  <Typography
                    variant={isMobile ? "body1" : "body2"}
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {product.price?.toLocaleString()}
                  </Typography>
                  <Typography
                    variant={isMobile ? "h6" : "body1"}
                    fontWeight={700}
                    color={theme.palette.success.dark}
                  >
                    {(product.price * (1 - product.discount / 100)).toLocaleString()}
                    <Typography component="span" variant="caption" color="text.secondary">
                      تومان
                    </Typography>
                  </Typography>
                </>
              ) : (
                <Typography
                  variant={isMobile ? "h6" : "body1"}
                  fontWeight={700}
                  color={theme.palette.primary.main}
                >
                  {product.price?.toLocaleString()}
                  <Typography component="span" variant="caption" color="text.secondary">
                    تومان
                  </Typography>
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Action buttons with icons only */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-around",
          borderTop: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.default,
          borderRadius: "0 0 12px 12px",
        }}
      >
        <EditProductModal
          product={product}
          size="small"
          sx={{
            minWidth: 'auto',
            borderRadius: '8px',
            p: 1,
            color: theme.palette.primary.dark,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            }
          }}
        >
          <EditIcon fontSize={isMobile ? "small" : "medium"} />
        </EditProductModal>

        <AddVariantModal
          product={product}
          size="small"
          sx={{
            minWidth: 'auto',
            borderRadius: '8px',
            p: 1,
            color: theme.palette.secondary.dark,
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
            }
          }}
        >
          <AddIcon fontSize={isMobile ? "small" : "medium"} />
        </AddVariantModal>

        <DeleteProduct
          fetchProducts={fetchProducts}
          id={product.product_id}
          size="small"
          sx={{
            minWidth: 'auto',
            borderRadius: '8px',
            p: 1,
            color: theme.palette.error.dark,
            '&:hover': {
              backgroundColor: theme.palette.error.light,
            }
          }}
        >
          <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
        </DeleteProduct>
      </Box>
    </Card>
  );
};

// Main component remains the same as previous version
function ProductsTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("token", getCookie("x-auth-token"));

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/`,
        requestOptions
      );
      const result = await response.json();
      setProducts(result);
      setTotalProducts(result.length);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("خطا در بارگذاری محصولات. لطفاً مجدداً تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("token", getCookie("x-auth-token"));

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/`,
        requestOptions
      );
      const result = await response.json();
      setCategoryList(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleRefresh = () => {
    setSearchValue("");
    setCategory("All");
    fetchProducts();
  };

  const filteredProducts = products
    ? products.filter((product) => {
        const matchesSearch =
          product.product_name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          product.product_id.toString().includes(searchValue);
        const matchesCategory =
          category === "All" || product.category === category;
        return matchesSearch && matchesCategory;
      })
    : [];

  return (
    <Box sx={{ p: isMobile ? 1 : 3, background: theme.palette.background.default }}>
      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight={700}
              color={theme.palette.primary.dark}
            >
              مدیریت محصولات
            </Typography>
          </Box>
        </Grid>

        {/* Filters */}
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            value={searchValue}
            onChange={handleSearch}
            placeholder="جستجوی محصول..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "12px",
                background: theme.palette.background.paper,
                "& fieldset": {
                  borderColor: theme.palette.divider,
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            size={isMobile ? "small" : "medium"}
            value={category}
            onChange={handleCategoryChange}
            displayEmpty
            sx={{
              borderRadius: "12px",
              background: theme.palette.background.paper,
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
            }}
          >
            <MenuItem value="All">
              <Box display="flex" alignItems="center">
                <CategoryIcon
                  sx={{ mr: 1, color: theme.palette.text.secondary }}
                />
                <Typography>همه دسته‌بندی‌ها</Typography>
              </Box>
            </MenuItem>
            {categoryList.map((cat) => (
              <MenuItem
                value={cat.category_name}
                key={cat.category_id}
              >
                {cat.category_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Stats */}
        <Grid item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            gap={isMobile ? 1 : 2}
            sx={{
              p: isMobile ? 1 : 2,
              borderRadius: "12px",
              background: theme.palette.background.paper,
              boxShadow: theme.shadows[1],
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Button
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{
                borderRadius: "12px",
                fontWeight: 500,
                width: isMobile ? "100%" : "auto",
              }}
            >
              بروزرسانی لیست
            </Button>

            <Box 
              display="flex" 
              alignItems="center" 
              gap={1}
              sx={{
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "space-between" : "flex-start",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                نمایش:
              </Typography>
              <Chip
                label={`${filteredProducts.length} محصول`}
                size={isMobile ? "small" : "medium"}
                variant="outlined"
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            </Box>

            {!isMobile && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
                از مجموع {totalProducts} محصول
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Loading state */}
        {loading && (
          <Grid item xs={12}>
            <Grid container spacing={isMobile ? 1 : 3}>
              {Array.from(new Array(isMobile ? 2 : 4)).map((_, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ borderRadius: "12px" }}>
                    <Skeleton
                      variant="rectangular"
                      height={isMobile ? 150 : 200}
                      sx={{
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                    <CardContent>
                      <Skeleton width="80%" height={32} sx={{ mb: 2 }} />
                      <Box display="flex" gap={1} sx={{ mb: 2 }}>
                        <Skeleton width="30%" height={28} />
                        <Skeleton width="40%" height={28} />
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" justifyContent="space-between">
                        <Skeleton width="40%" height={36} />
                        <Skeleton width="30%" height={36} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* Error state */}
        {error && (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: isMobile ? 2 : 4,
                textAlign: "center",
                borderRadius: "12px",
                background: theme.palette.error.light,
              }}
            >
              <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                خطا در بارگذاری محصولات
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {error}
              </Typography>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                startIcon={<RefreshIcon />}
                onClick={fetchProducts}
                sx={{
                  borderRadius: "12px",
                  px: 4,
                }}
              >
                تلاش مجدد
              </Button>
            </Paper>
          </Grid>
        )}

        {/* Products list */}
        {!loading && !error && filteredProducts.length > 0 && (
          <Grid item xs={12}>
            <Grid container spacing={isMobile ? 1 : 3}>
              {filteredProducts.map((product) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.product_id}
                >
                  <ProductCard
                    product={product}
                    fetchProducts={fetchProducts}
                    isMobile={isMobile}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProducts.length === 0 && (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: isMobile ? 3 : 6,
                textAlign: "center",
                borderRadius: "12px",
                background: theme.palette.background.paper,
              }}
            >
              <InventoryIcon
                sx={{
                  fontSize: isMobile ? 48 : 64,
                  color: theme.palette.text.disabled,
                  mb: 2,
                }}
              />
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 1 }}>
                محصولی یافت نشد
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                هیچ محصولی با مشخصات جستجو شده وجود ندارد
              </Typography>
              <Button
                variant="outlined"
                size={isMobile ? "medium" : "large"}
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{
                  borderRadius: "12px",
                  px: 4,
                }}
              >
                بازنشانی فیلترها
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default ProductsTable;