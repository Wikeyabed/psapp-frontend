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

const CartItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
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
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  width: 120,
  height: 120,
  objectFit: "contain",
  padding: theme.spacing(1),
  borderRadius: 16,
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
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.action.selected,
  borderRadius: 8,
  padding: theme.spacing(0.5),
  width : 200,
}));


export default function CartItems() {
  const cartItems = useSelector((state) => state.product.shoppingCart);
  const dispatch = useDispatch();
  const [loadingItems, setLoadingItems] = useState({});
  const [error, setError] = useState(null);

const handleQuantityChange = async (product, newQuantity) => {
  // Calculate quantity based on stack
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
            (stackAdjustedQuantity - product.quantity) / product.variant_stack,
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
    console.log(error)
    setError(error.message);
  } finally {
    setLoadingItems((prev) => ({ ...prev, [product.variant_uuid]: false }));
  }
};

const handleIncrement = (product) => {
  handleQuantityChange(product, product.quantity * 1 + product.variant_stack *1);
};

const handleDecrement = (product) => {
  handleQuantityChange(product, product.quantity *1 - product.variant_stack*1);
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
          <CartItemCard key={product.variant_uuid}>
            {/* Delete button and other components remain the same */}
            <Box position="relative">
              <ProductImage
                component="img"
                image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.images_url}`}
                alt={product.product_name}
              />
              {product.discount > 0 && (
                <DiscountBadge
                  size="small"
                  label={`${product.discount}% تخفیف`}
                  icon={<LocalOffer fontSize="small" />}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                padding: 2,
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={600}>
                  {product.product_name}
                </Typography>
                <DeleteFromCart product_uuid={product.variant_uuid} />
              </Box>

              <Stack spacing={1} mt={1} mb={2}>
                <Box display="flex" alignItems="center">
                  <Inventory color="action" fontSize="small" sx={{ ml: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    موجودی انبار: {product.stack} عدد
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
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
                </Box>
              </Stack>
              {/* Quantity control section */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <QuantityControl>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: 2,
                      padding: "4px 8px",
                      minWidth: 180,
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Decrement Button */}
                    <IconButton
                      size="small"
                      disabled={
                        isLoading || product.quantity <= product.variant_stack
                      }
                      onClick={() => handleDecrement(product)}
                    >
                      {isLoading ? (
                        <CircularProgress size={14} />
                      ) : (
                        <Remove fontSize="small" />
                      )}
                    </IconButton>

                    {/* Quantity Display */}
                    <Box textAlign="center">
                      <Typography variant="body1" fontWeight="bold">
                        {persianNumber(product.quantity)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        (بسته {product.variant_stack} تایی)
                      </Typography>
                    </Box>

                    {/* Increment Button */}
                    <IconButton
                      size="small"
                      disabled={isLoading}
                      onClick={() => handleIncrement(product)}
                    >
                      {isLoading ? (
                        <CircularProgress size={14} />
                      ) : (
                        <Add fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </QuantityControl>

                <Typography variant="subtitle1" fontWeight={700}>
                  جمع: {persianNumber(totalItemPrice)} ریال
                </Typography>
              </Box>
            </Box>
          </CartItemCard>
        );
      })}
    </Box>
  );
}
