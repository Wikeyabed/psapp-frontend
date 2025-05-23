import React from "react";
import CartItems from "../../layout/navbar/shoppingCart/CartItems";
import PublicLayout from "../../layout";
import { 
  Grid, 
  Button, 
  Box, 
  Typography, 
  Card, 
  Divider, 
  Paper, 
  useTheme,
  Chip,
  Badge,
  IconButton,
  Stack
} from "@mui/material";
import { 
  Payment, 
  Login, 
  ShoppingCart as CartIcon,
  ArrowBack,
  LocalShipping,
  Discount,
  CheckCircle,
  Delete,
  Add,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import Link from "../../../../src/Link";
import { useRouter } from "next/router";
import { setOrderPrice, setProductsInOrder } from "../../../../redux/reducers/orderSlice";
import styled from "@emotion/styled";

const CartContainer = styled(Card)(({ theme }) => ({
  maxWidth: 1200,
  margin: '40px auto',
  borderRadius: 16,
  boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

const CartHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to bottom, #2F2235, #543d5e , #7B6D8D )",
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  textAlign: "center",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
    height: 20,
    background: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, transparent 100%)`,
    opacity: 0.2,
  },
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  background: theme.palette.background.paper,
  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  border: `1px solid ${theme.palette.divider}`,
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 700,
  textTransform: 'none',
  letterSpacing: 0.5,
  background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.3s ease',
}));

const ProductCountBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 5,
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.getContrastText(theme.palette.warning.main),
    fontWeight: 'bold',
  },
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontWeight: 700,
  marginLeft: theme.spacing(1),
}));

function ShoppingCart() {
  const theme = useTheme();
  const cartItems = useSelector((state) => state.product.shoppingCart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, product) => {
    return sum + (product.price * (1 - product.discount * 0.01) * product.quantity)
  }, 0);

  const totalItems = cartItems.reduce((sum, product) => sum + product.quantity, 0);

  const sendToCheckout = () => {
    const orderProduct = cartItems.map((product) => ({
      product_discount: `${product.discount}%`,
      product_name: product.product_name,
      product_id: product.product_id,
      variant_uuid: product.variant_uuid,
      product_quantity: product.quantity,
      unit_price: product.price * (1 - product.discount * 0.01),
      total_price: product.price * (1 - product.discount * 0.01) * product.quantity,
    }));

    dispatch(setOrderPrice({ totalPrice }));
    dispatch(setProductsInOrder({ products: orderProduct }));
    router.push("/shop/checkout");
  };

  return (
    <PublicLayout>
      <CartContainer>
        <CartHeader>
          <ProductCountBadge badgeContent={totalItems} color="primary">
            <CartIcon sx={{ fontSize: 60, opacity: 0.9 }} />
          </ProductCountBadge>
          <Typography variant="h3" fontWeight={800} mt={2}>
            سبد خرید شما
          </Typography>
          <Typography variant="subtitle1" mt={1} sx={{ opacity: 0.9 }}>
            {cartItems.length} محصول در سبد خرید
          </Typography>
        </CartHeader>

        <Grid container spacing={4} p={4}>
          <Grid item xs={12} md={8}>
            {cartItems.length > 0 ? (
              <>
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Button
                    component={Link}
                    href="/shop"
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{ borderRadius: 8 }}
                  >
                    ادامه خرید
                  </Button>
                  <Typography variant="h6" color="text.secondary">
                    مجموع: {totalItems} کالا
                  </Typography>
                </Box>
                <CartItems />
              </>
            ) : (
              <Box textAlign="center" py={8}>
                <CartIcon
                  sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
                />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  سبد خرید شما خالی است
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                  می‌توانید برای مشاهده محصولات به صفحه فروشگاه بروید
                </Typography>
                <Button
                  component={Link}
                  href="/shop"
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  sx={{ borderRadius: 8, px: 4 }}
                >
                  بازگشت به فروشگاه
                </Button>
              </Box>
            )}
          </Grid>

          {cartItems.length > 0 && (
            <Grid item xs={12} md={4}>
              <SummaryCard>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  mb={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CheckCircle color="success" sx={{ ml: 1 }} />
                  خلاصه سفارش
                </Typography>

                <Stack spacing={2} mb={3}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" color="text.secondary">
                      <LocalShipping
                        fontSize="small"
                        sx={{ ml: 1, verticalAlign: "middle" }}
                      />
                      هزینه ارسال:
                    </Typography>
                    <Typography variant="body1" color="success.main">
                      به عهده مشتری
                    </Typography>
                  </Box>

                  {cartItems.some((item) => item.discount > 0) && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1" color="text.secondary">
                        <Discount
                          fontSize="small"
                          sx={{ ml: 1, verticalAlign: "middle" }}
                        />
                        تخفیف:
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        {cartItems
                          .reduce(
                            (sum, item) =>
                              sum +
                              item.price * item.discount * 0.01 * item.quantity,
                            0
                          )
                          .toLocaleString()}{" "}
                        ریال
                      </Typography>
                    </Box>
                  )}
                </Stack>

                <Divider
                  sx={{
                    my: 2,
                    borderColor: theme.palette.divider,
                    borderBottomWidth: 2,
                    borderStyle: "dashed",
                  }}
                />

                <Box display="flex" justifyContent="space-between" mb={4}>
                  <Typography variant="body1" fontWeight={700}>
                    مبلغ قابل پرداخت:
                  </Typography>
                  <Typography variant="body1" color="primary" fontWeight={800}>
                    {totalPrice.toLocaleString()} ریال
                    {cartItems.some((item) => item.discount > 0) && (
                      <DiscountChip
                        label={`${
                          cartItems.find((item) => item.discount > 0)?.discount
                        }% تخفیف`}
                        size="small"
                      />
                    )}
                  </Typography>
                </Box>

                {isLoggedIn ? (
                  <CheckoutButton
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={sendToCheckout}
                    startIcon={
                      <Payment
                        sx={{
                          ml: 2,
                        }}
s                      />
                    }
                    sx={{ py: 1.5 }}
                  >
                    پرداخت و ثبت سفارش
                  </CheckoutButton>
                ) : (
                  <CheckoutButton
                    component={Link}
                    href="/auth/login"
                    fullWidth
                    size="large"
                    variant="contained"
                    startIcon={
                      <Login
                        sx={{
                          ml: 2,
                        }}
                      />
                    }
                    sx={{ py: 1.5 }}
                  >
                    ورود و ادامه سفارش
                  </CheckoutButton>
                )}

                <Typography
                  variant="caption"
                  color="text.secondary"
                  mt={2}
                  display="block"
                  textAlign="center"
                >
                  با کلیک بر روی دکمه پرداخت، قوانین و شرایط را پذیرفته‌اید
                </Typography>
              </SummaryCard>

              <Box
                mt={3}
                p={3}
                sx={{
                  backgroundColor: theme.palette.warning.light,
                  borderRadius: 12,
                  border: `1px solid ${theme.palette.warning.main}`,
                }}
              >
                <Typography
                  variant="body2"
                  color="warning.dark"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CheckCircle fontSize="small" sx={{ ml: 1 }} />
                  کالاهای موجود در سبد شما تنها به مدت ۲۴ ساعت رزرو شده‌اند
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CartContainer>
    </PublicLayout>
  );
}

export default ShoppingCart;