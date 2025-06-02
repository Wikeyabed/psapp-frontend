import { 
  Box, 
  Button, 
  Divider, 
  Grid, 
  Typography, 
  useMediaQuery,
  Paper,
  styled,
  ThemeProvider,
  createTheme,
  Container,
  Fade,
  CircularProgress
} from "@mui/material";
import moment from "moment-jalaali";
import { persianNumber } from "../../../src/PersianDigits";
import React, { useEffect, useState } from "react";
import UserOrderStatus from "./UserOrderStatus";
import Link from "../../../src/Link";
import PublicLayout from "../layout";
import {
  Receipt as ReceiptIcon,
  Print as PrintIcon,
  LocalShipping as ShippingIcon,
  CalendarToday as DateIcon,
  ConfirmationNumber as TicketIcon,
  Payment as PaymentIcon
} from "@mui/icons-material";

// تم سفارشی
const orderTheme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
    },
    secondary: {
      main: '#ffab00',
      light: '#ffdd4b',
      dark: '#c67c00',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Vazir", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.2)',
  },
}));

const OrderItemCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

function UserOrderPage({ order }) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery(orderTheme.breakpoints.down('md'));

  useEffect(() => {
    const parsedProducts = order.products.map(product => JSON.parse(product));
    setRows(parsedProducts);
  }, [order.products]);

  const getDeliveryMethod = () => {
    switch(order.delivery_type) {
      case "in-person":
        return "حضوری از انبار ما";
      case "snap":
        return "از طریق اسنپ (مخصوص تهران)";
      case "shipping":
        return "از طریق باربری (مخصوص شهرستان)";
      case "posting":
        return "ارسال از طریق پست یا تیپاکس";
      default:
        return "";
    }
  };

  return (
    <ThemeProvider theme={orderTheme}>
      <PublicLayout>
        <Box sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
          minHeight: '100vh',
          py: 6,
        }}>
          <Container maxWidth="lg">
            <Fade in timeout={800}>
              <Box>
                <GlassCard elevation={3}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    mb: 4,
                  }}>
                    <Typography variant="h4" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <ReceiptIcon sx={{ ml: 1 }} />
                      فاکتور خرید
                    </Typography>
                    
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<PrintIcon />}
                      component={Link}
                      href={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/user/print/${order.order_id}`}
                      target="_blank"
                      sx={{
                        mt: isMobile ? 2 : 0,
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                      }}
                    >
                      چاپ فاکتور
                    </Button>
                  </Box>

                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <InfoRow>
                        <DateIcon />
                        <Typography variant="body1">
                          <strong>تاریخ ثبت:</strong> {moment.unix(order.order_date).format("jYYYY/jMM/jDD")}
                        </Typography>
                      </InfoRow>

                      <InfoRow>
                        <DateIcon />
                        <Typography variant="body1">
                          <strong>تاریخ دریافت:</strong> {moment.unix(order.delivery_date).format("jYYYY/jMM/jDD")}
                        </Typography>
                      </InfoRow>

                      <InfoRow>
                        <TicketIcon />
                        <Typography variant="body1">
                          <strong>شماره فاکتور:</strong> {order.order_number}
                        </Typography>
                      </InfoRow>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InfoRow>
                        <ShippingIcon />
                        <Typography variant="body1">
                          <strong>نحوه دریافت:</strong> {getDeliveryMethod()}
                        </Typography>
                      </InfoRow>

                      <InfoRow>
                        <TicketIcon />
                        <Typography variant="body1">
                          <strong>شماره پیگیری:</strong> {order.track_id}
                        </Typography>
                      </InfoRow>

                      <InfoRow>
                        <UserOrderStatus status={order.status} />
                      </InfoRow>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 4 }} />

                  <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <PaymentIcon sx={{ ml: 1 }} />
                    اقلام سفارش
                  </Typography>

                  {isMobile ? (
                    // نمایش موبایلی
                    <Box>
                      {rows.sort((a, b) => a.total_price - b.total_price).map((row, i) => (
                        <OrderItemCard key={i} elevation={2}>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                            {row.product_name}
                          </Typography>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2">تعداد:</Typography>
                              <Typography variant="body1">{persianNumber(row.product_quantity)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2">قیمت واحد:</Typography>
                              <Typography variant="body1">{persianNumber(row.unit_price)} ریال</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2">قیمت کل:</Typography>
                              <Typography variant="body1">{persianNumber(row.total_price)} ریال</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2">تخفیف:</Typography>
                              <Typography variant="body1">{row.product_discount}%</Typography>
                            </Grid>
                          </Grid>
                        </OrderItemCard>
                      ))}
                    </Box>
                  ) : (
                    // نمایش دسکتاپ
                    <Paper sx={{ overflow: 'hidden' }}>
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                        bgcolor: 'primary.main',
                        color: 'white',
                        p: 2,
                      }}>
                        <Typography>نام محصول</Typography>
                        <Typography align="center">تعداد</Typography>
                        <Typography align="center">قیمت واحد</Typography>
                        <Typography align="center">قیمت کل</Typography>
                        <Typography align="center">تخفیف</Typography>
                      </Box>
                      
                      {rows.sort((a, b) => a.total_price - b.total_price).map((row, i) => (
                        <Box key={i} sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                          p: 2,
                          borderBottom: i !== rows.length - 1 ? '1px solid #eee' : 'none',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          }
                        }}>
                          <Typography>{row.product_name}</Typography>
                          <Typography align="center">{persianNumber(row.product_quantity)}</Typography>
                          <Typography align="center">{persianNumber(row.unit_price)} ریال</Typography>
                          <Typography align="center">{persianNumber(row.total_price)} ریال</Typography>
                          <Typography align="center">{row.product_discount}%</Typography>
                        </Box>
                      ))}
                    </Paper>
                  )}

                  <Box sx={{
                    mt: 4,
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography variant="h6">جمع کل فاکتور:</Typography>
                    <Typography variant="h5" color="primary">
                      {persianNumber(order.finished_price)} ریال
                    </Typography>
                  </Box>
                </GlassCard>
              </Box>
            </Fade>
          </Container>
        </Box>
      </PublicLayout>
    </ThemeProvider>
  );
}

export default UserOrderPage;