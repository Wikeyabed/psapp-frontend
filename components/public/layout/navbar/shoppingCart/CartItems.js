import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Stack,
  Divider,
  Badge,
  Tooltip,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { persianNumber } from "../../../../../src/PersianDigits";
import { useSelector, useDispatch } from "react-redux";
import DeleteFromCart from "./DeleteFromCart";
import {
  Delete,
  Add,
  Remove,
  LocalOffer,
  Inventory,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";
import { addToCart } from "../../../../../redux/reducers/productSlice";

const CartItemCard = styled(Card)(({ theme, isMobile }) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  borderRadius: 12,
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    transform: "translateY(-2px)",
  },
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "hidden",
}));

const ProductImage = styled(CardMedia)(({ theme, isMobile }) => ({
  width: isMobile ? "100%" : 120,
  height: isMobile ? 150 : 120,
  objectFit: "contain",
  padding: theme.spacing(1),
  borderRadius: isMobile ? "0" : 16,
  backgroundColor: theme.palette.background.default,
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 8,
  left: 8,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  fontWeight: 700,
  fontSize: "0.75rem",
  zIndex: 1,
}));

const QuantityControl = styled(Box)(({ theme, isMobile }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: 8,
  padding: theme.spacing(0.5),
  width: isMobile ? "100%" : 200,
  justifyContent: isMobile ? "space-between" : "center",
}));

export default function CartItems() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cartItems = useSelector((state) => state.product.shoppingCart);
  const dispatch = useDispatch();
  const [loadingItems, setLoadingItems] = useState({});
  const [error, setError] = useState(null);

  const handleQuantityChange = async (product, newQuantity) => {
    const stackAdjustedQuantity = Math.max(
      Math.round(newQuantity / product.variant_stack) * product.variant_stack,
      product.variant_stack
    );

    if (stackAdjustedQuantity === product.quantity) return;

    setLoadingItems((prev) => ({ ...prev, [product.variant_uuid]: true }));
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            product_uuid: product.product_uuid,
            variant_uuid: product.variant_uuid,
            cart_quantity:
              (stackAdjustedQuantity - product.quantity) /
              product.variant_stack,
            product_id: product.product_id,
            price: product.price,
            images_url: product.images_url,
            discount: product.discount,
            product_name: product.product_name,
            variant_calc_unit: product.calc_unit,
            variant_stack: product.variant_stack,
          }),
        }
      );

      const updatedCart = await response.json();
      dispatch(addToCart(updatedCart));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [product.variant_uuid]: false }));
    }
  };

  const handleIncrement = (product) => {
    handleQuantityChange(
      product,
      product.quantity * 1 + product.variant_stack * 1
    );
  };

  const handleDecrement = (product) => {
    handleQuantityChange(
      product,
      product.quantity * 1 - product.variant_stack * 1
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {cartItems.map((product) => {
        const discountedPrice = product.price * (1 - product.discount * 0.01);
        const totalItemPrice = discountedPrice * product.quantity;
        const isLoading = loadingItems[product.variant_uuid];
        const canDecrement = product.quantity > product.variant_stack;

        return (
          <CartItemCard key={product.variant_uuid} isMobile={isMobile}>
            <Box position="relative" sx={{ width: isMobile ? "100%" : "auto" }}>
              <ProductImage
                component="img"
                image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.images_url}`}
                alt={product.product_name}
                isMobile={isMobile}
              />
              {product.discount > 0 && (
                <DiscountBadge
                  size="small"
                  label={`${product.discount}% تخفیف`}
                  icon={<LocalOffer fontSize="small" />}
                />
              )}
              {isMobile && (
                <Box position="absolute" top={8} right={8}>
                  <DeleteFromCart product_uuid={product.variant_uuid} />
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                padding: isMobile ? 1.5 : 2,
                width: "100%",
              }}
            >
              {!isMobile && (
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight={600}>
                    {product.product_name}
                  </Typography>
                  <DeleteFromCart product_uuid={product.variant_uuid} />
                </Box>
              )}

              {isMobile && (
                <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 1 }}>
                  {product.product_name}
                </Typography>
              )}

              <Stack spacing={1} mt={1} mb={2}>
                <Box display="flex" alignItems="center">
                  <Inventory color="action" fontSize="small" sx={{ ml: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    موجود در انبار
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={isMobile ? "column" : "row"}
                >
                  <Typography variant="body2">
                    قیمت واحد:
                    {product.discount > 0 && (
                      <Typography
                        component="span"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          ml: 1,
                        }}
                      >
                        {persianNumber(product.price)} ریال
                      </Typography>
                    )}
                    <Typography
                      component="span"
                      color={
                        product.discount > 0 ? "success.main" : "text.primary"
                      }
                      fontWeight={600}
                      sx={{ ml: 1 }}
                    >
                      {persianNumber(discountedPrice)} ریال
                    </Typography>
                  </Typography>

                  {isMobile && (
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mt: 1 }}
                    >
                      جمع: {persianNumber(totalItemPrice)} ریال
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection={isMobile ? "column" : "row"}
                gap={isMobile ? 2 : 0}
              >
                <QuantityControl isMobile={isMobile}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      borderRadius: 2,
                      padding: "4px 8px",
                      minWidth: isMobile ? "100%" : 180,
                      justifyContent: "space-between",
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      border: "1px solid rgba(25, 118, 210, 0.2)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.12)",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    {/* Decrement Button */}
                    <IconButton
                      size="small"
                      disabled={
                        isLoading || product.quantity <= product.variant_stack
                      }
                      onClick={() => handleDecrement(product)}
                      sx={{
                        color:
                          isLoading || product.quantity <= product.variant_stack
                            ? "text.disabled"
                            : "error.main",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid",
                        borderColor:
                          isLoading || product.quantity <= product.variant_stack
                            ? "divider"
                            : "error.light",
                        "&:hover": {
                          backgroundColor:
                            isLoading ||
                            product.quantity <= product.variant_stack
                              ? "transparent"
                              : "error.light",
                          color:
                            isLoading ||
                            product.quantity <= product.variant_stack
                              ? "text.disabled"
                              : "error.dark",
                        },
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={14} />
                      ) : (
                        <Remove fontSize="small" />
                      )}
                    </IconButton>

                    {/* Quantity Display */}
                    <Box textAlign="center" sx={{ minWidth: 60 }}>
                      <Typography
                        variant="body1"
                        textAlign={"center"}
                        fontWeight="bold"
                        color="primary.main"
                      >
                        {persianNumber(product.quantity)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          textAlign: "center",
                          color: "text.secondary",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5,
                        }}
                      >
                        (بسته {product.variant_stack} تایی)
                      </Typography>
                    </Box>

                    {/* Increment Button */}
                    <IconButton
                      size="small"
                      disabled={isLoading}
                      onClick={() => handleIncrement(product)}
                      sx={{
                        color: isLoading ? "text.disabled" : "success.main",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid",
                        borderColor: isLoading ? "divider" : "success.light",
                        "&:hover": {
                          backgroundColor: isLoading
                            ? "transparent"
                            : "success.light",
                          color: isLoading ? "text.disabled" : "success.dark",
                        },
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={14} />
                      ) : (
                        <Add fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </QuantityControl>

                {!isMobile && (
                  <Typography variant="subtitle1" fontWeight={700}>
                    جمع: {persianNumber(totalItemPrice)} ریال
                  </Typography>
                )}
              </Box>
            </Box>
          </CartItemCard>
        );
      })}
    </Box>
  );
}
