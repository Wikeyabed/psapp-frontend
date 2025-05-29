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
  Stack,
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
import {
  setOrderPrice,
  setProductsInOrder,
} from "../../../../redux/reducers/orderSlice";
import styled from "@emotion/styled";

const CartContainer = styled(Card)(({ theme }) => ({
  maxWidth: 1200,
  margin: "40px auto",
  borderRadius: 16,
  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
  overflow: "hidden",
  border: `2px solid ${theme.palette.divider}`,
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  background: theme.palette.background.paper,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  border: `1px solid ${theme.palette.divider}`,
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "none",
  letterSpacing: 0.5,
  background: `linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)`,
  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(99, 102, 241, 0.4)",
    transform: "translateY(-1px)",
  },
  transition: "all 0.3s ease",
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "rgba(6, 182, 212, 0.2)",
  color: "#06b6d4",
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
    return (
      sum + product.price * (1 - product.discount * 0.01) * product.quantity
    );
  }, 0);

  const totalItems = cartItems.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const sendToCheckout = () => {
    const orderProduct = cartItems.map((product) => ({
      product_discount: `${product.discount}%`,
      product_name: product.product_name,
      product_id: product.product_id,
      variant_uuid: product.variant_uuid,
      product_quantity: product.quantity,
      unit_price: product.price * (1 - product.discount * 0.01),
      total_price:
        product.price * (1 - product.discount * 0.01) * product.quantity,
    }));

    dispatch(setOrderPrice({ totalPrice }));
    dispatch(setProductsInOrder({ products: orderProduct }));
    router.push("/shop/checkout");
  };

  const OrderSummary = () => (
    <>
      <SummaryCard>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CheckCircle sx={{ ml: 1, color: "#06b6d4" }} />
          خلاصه سفارش
        </Typography>

        <Stack spacing={2} mb={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              <LocalShipping
                fontSize="small"
                sx={{ ml: 1, verticalAlign: "middle", color: "#6366f1" }}
              />
              هزینه ارسال:
            </Typography>
            <Typography variant="body1" color="#06b6d4">
              به عهده مشتری
            </Typography>
          </Box>

          {cartItems.some((item) => item.discount > 0) && (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary">
                <Discount
                  fontSize="small"
                  sx={{ ml: 1, verticalAlign: "middle", color: "#6366f1" }}
                />
                تخفیف:
              </Typography>
              <Typography variant="body2" color="#06b6d4">
                {cartItems
                  .reduce(
                    (sum, item) =>
                      sum + item.price * item.discount * 0.01 * item.quantity,
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
          <Typography variant="body1" color="#6366f1" fontWeight={800}>
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
            startIcon={<Payment sx={{ ml: 2 }} />}
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
            startIcon={<Login sx={{ ml: 2 }} />}
            sx={{ py: 1.5 }}
          >
            ورود و ادامه سفارش
          </CheckoutButton>
        )}

        <Typography
          component={Link}
          href="/roles"
          variant="caption"
          color="text.secondary"
          mt={2}
          display="block"
          textAlign="center"
          sx={{
            textDecoration: "none",
            color: "#6366f1",
            transition: "0.3s ease all",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          با کلیک بر روی دکمه پرداخت،{" "}
          <span style={{ color: "red" }}>قوانین و مقررات</span> را پذیرفته‌اید
        </Typography>
      </SummaryCard>

      <Box
        mt={3}
        p={3}
        sx={{
          backgroundColor: "rgba(6, 182, 212, 0.1)",
          borderRadius: 12,
          border: `1px solid #06b6d4`,
        }}
      >
        <Typography
          variant="body2"
          color="#6366f1"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CheckCircle fontSize="small" sx={{ ml: 1, color: "#06b6d4" }} />
          کالاهای موجود در سبد شما تنها به مدت 72 ساعت رزرو شده‌اند
        </Typography>
      </Box>
    </>
  );

  return (
    <PublicLayout>
      <CartContainer>
        <Grid container spacing={4} p={4}>
          {/* خلاصه سفارش در موبایل */}
          {cartItems.length > 0 && (
            <Grid item xs={12} display={{ xs: "block", md: "none" }}>
              <OrderSummary />
            </Grid>
          )}

          <Grid item xs={12} md={8}>
            {cartItems.length > 0 ? (
              <>
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Button
                    component={Link}
                    href="/shop"
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{
                      borderRadius: 8,
                      borderColor: "#6366f1",
                      color: "#6366f1",
                    }}
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
                  sx={{
                    borderRadius: 8,
                    px: 4,
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  }}
                >
                  بازگشت به فروشگاه
                </Button>
              </Box>
            )}
          </Grid>

          {/* خلاصه سفارش در دسکتاپ */}
          {cartItems.length > 0 && (
            <Grid item xs={12} md={4} display={{ xs: "none", md: "block" }}>
              <OrderSummary />
            </Grid>
          )}
        </Grid>
      </CartContainer>
    </PublicLayout>
  );
}

export default ShoppingCart;
