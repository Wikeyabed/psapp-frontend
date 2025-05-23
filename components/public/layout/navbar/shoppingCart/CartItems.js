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
} from "@mui/material";
import { persianNumber } from "../../../../../src/PersianDigits";
import { useSelector } from "react-redux";
import DeleteFromCart from "./DeleteFromCart";
import {
  Delete,
  Add,
  Remove,
  LocalOffer,
  Inventory,
} from "@mui/icons-material";
import styled from "@emotion/styled";

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
  position: "relative", // Added for delete button positioning
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
}));

export default function CartItems() {
  const cartItems = useSelector((state) => state.product.shoppingCart);

  return (
    <Box sx={{ width: "100%" }}>
      {cartItems.map((product, i) => {
        const discountedPrice = product.price * (1 - product.discount * 0.01);
        const totalItemPrice = discountedPrice * product.quantity;

        return (
          <CartItemCard key={i}>
            {/* Delete Button - Now Always Visible */}

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
              <Typography variant="subtitle1" fontWeight={600}>
                {product.product_name}

         
      

                      <DeleteFromCart product_uuid={product.product_uuid} />
       
        
              </Typography>

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

              <Divider sx={{ my: 1 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <QuantityControl>
                  <IconButton size="small" sx={{ color: "primary.main" }}>
                    <Remove fontSize="small" />
                  </IconButton>
                  <Badge
                    badgeContent={product.quantity}
                    color="primary"
                    sx={{ mx: 1 }}
                  />
                  <IconButton size="small" sx={{ color: "primary.main" }}>
                    <Add fontSize="small" />
                  </IconButton>
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
