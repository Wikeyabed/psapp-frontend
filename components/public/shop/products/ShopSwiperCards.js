import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "../../../../src/Link";
import { persianNumber } from "../../../../src/PersianDigits";
import Quantity from "../productPage/Quantity";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Chip,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Skeleton
} from "@mui/material";
import {
  ShoppingCart,
  ArrowDropDown,
  LocalOffer,
  Inventory,
  Close,
} from "@mui/icons-material";

function ShopSwiperCards({ item }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuantity, setActiveQuantity] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // اگر داده‌ها آماده هستند، اسکلتون را مخفی کن
    if (item && item.variants && item.variants.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [item]);

  const selectedVariant = item?.variants?.[selectedVariantIndex] || item?.variants?.[0];

  // محاسبه قیمت با تخفیف
  const calculatePrice = () => {
    if (!selectedVariant) return 0;
    const price = selectedVariant.variant_price;
    const discount = selectedVariant.variant_discount || 0;
    return Math.round(price * (1 - discount / 100));
  };

  // نمایش اسکلتون در حالت لودینگ
  if (isLoading || !item || !selectedVariant) {
    return (
      <Card sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
        height: "100%"
      }}>
        {/* بخش تصویر */}
        <Box sx={{ position: "relative", width: "100%", height: 220 }}>
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height="100%"
            sx={{ 
              bgcolor: 'grey.100',
              transform: 'none', // غیرفعال کردن انیمیشن موجی برای ظاهر واقعی‌تر
            }}
          />
        </Box>

        <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
          {/* عنوان محصول */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            mb: 2,
            minHeight: 70
          }}>
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
          </Box>
          
          {/* انتخاب واریانت */}
          <Skeleton 
            variant="rounded" 
            width="100%" 
            height={40} 
            sx={{ 
              mb: 2,
              bgcolor: 'grey.100'
            }} 
          />
          
          {/* قیمت و جزئیات */}
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Box>
              <Skeleton variant="text" width={100} height={30} />
              <Skeleton variant="text" width={80} height={20} sx={{ mt: 0.5 }} />
            </Box>
            <Skeleton 
              variant="rounded" 
              width={120} 
              height={32}
              sx={{
                bgcolor: 'grey.100'
              }}
            />
          </Box>
        </CardContent>
        
        {/* دکمه افزودن به سبد خرید */}
        <CardActions sx={{ p: 2.5, pt: 0 }}>
          <Skeleton 
            variant="rounded" 
            width="100%" 
            height={45}
            sx={{
              borderRadius: '12px',
              bgcolor: 'grey.300'
            }}
          />
        </CardActions>
      </Card>
    );
  }

  // مدیریت منوی انتخاب واریانت
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleVariantSelect = (index) => {
    setSelectedVariantIndex(index);
    setActiveQuantity(false);
    handleMenuClose();
  };

  // مدیریت دکمه افزودن به سبد خرید
  const handleAddToCartClick = () => setActiveQuantity(true);
  const handleQuantityClose = () => setActiveQuantity(false);

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
        transition: "all 0.3s ease",
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* نشانگر تخفیف */}
      {selectedVariant.variant_discount > 0 && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            <Box sx={{
              bgcolor: "error.main",
              color: "#fff",
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
            }}>
              <Typography variant="caption" fontWeight="bold">
                {persianNumber(selectedVariant.variant_discount)}%
              </Typography>
            </Box>
          }
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        />
      )}

      {/* تصویر محصول */}
      <Box sx={{
        position: "relative",
        width: "100%",
        height: 220,
        overflow: "hidden",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Link href={`/products/${item.info.product_id}?category=${item.info.product_name}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${item.info.images_url[0]}`}
            fill
            style={{
              objectFit: "contain",
              padding: "20px",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
            alt={item.info.product_name}
            priority
            onLoadingComplete={() => {
              setImageLoaded(true);
              setIsLoading(false);
            }}
          />
        </Link>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        {/* نام محصول */}
        <Typography
          component={Link}
          href={`/products/${item.info.product_id}?category=${item.info.product_name}`}
          variant="h6"
          sx={{
            textDecoration: "none",
            mb: 1.5,
            fontWeight: 700,
            color: "text.primary",
            textAlign: "center",
            minHeight: 70,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.info.product_name}
        </Typography>

        {/* انتخاب واریانت */}
        <Box sx={{
          mb: 2,
          position: "relative",
          bgcolor: "rgba(0,0,0,0.03)",
          borderRadius: 1,
          p: 1,
        }}>
          <Button
            fullWidth
            onClick={handleMenuOpen}
            endIcon={<ArrowDropDown />}
            sx={{
              justifyContent: "space-between",
              color: "text.primary",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
              <Inventory fontSize="small" sx={{ ml: 2, color: "primary.main" }} />
              <Typography noWrap>{selectedVariant.variant_name}</Typography>
            </Box>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                maxHeight: 300,
                width: 'calc(100% - 32px)',
                mt: 1,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }
            }}
          >
            {item.variants.map((variant, index) => (
              <MenuItem
                key={variant.variant_uuid}
                onClick={() => handleVariantSelect(index)}
                selected={index === selectedVariantIndex}
                sx={{
                  borderRadius: 1,
                  m: 0.5,
                  transition: "all 0.2s ease",
                  "&.Mui-selected": {
                    bgcolor: "#6366f1",
                    color: "#fff",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#4f46e5",
                    },
                  },
                  "&:hover": {
                    bgcolor: "#f3f4f6",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Inventory
                      fontSize="small"
                      sx={{
                        ml: 2,
                        color: index === selectedVariantIndex ? "#fff" : "primary.main",
                      }}
                    />
                    <Typography>{variant.variant_name}</Typography>
                  </Box>
                  <Typography variant="body2" color={index === selectedVariantIndex ? "#fff" : "text.secondary"}>
                    {persianNumber(variant.variant_price)} ریال
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* قیمت و جزئیات */}
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}>
          <Box>
            <Typography variant="body1" color="primary" fontWeight={700}>
              {persianNumber(calculatePrice())} ریال
            </Typography>
            {selectedVariant.variant_discount > 0 && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.disabled",
                }}
              >
                {persianNumber(selectedVariant.variant_price)} ریال
              </Typography>
            )}
          </Box>

          <Chip
            icon={<LocalOffer fontSize="small" />}
            label={`${persianNumber(selectedVariant.variant_stack)} عدد در بسته`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: "divider",
              color: "text.secondary",
            }}
          />
        </Box>
      </CardContent>

      {/* دکمه افزودن به سبد خرید */}
      <CardActions sx={{ p: 2.5, pt: 0 }}>
        {!activeQuantity ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart sx={{ ml: 2 }} />}
            onClick={handleAddToCartClick}
            disabled={selectedVariant.variant_quantity <= 0}
            sx={{
              height: 45,
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "1rem",
              bgcolor: "#6366f1",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#4f46e5",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              },
              transition: 'all 0.3s ease'
            }}
          >
            {selectedVariant.variant_quantity > 0 ? "افزودن به سبد خرید" : "تماس بگیرید"}
          </Button>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <IconButton onClick={handleQuantityClose} size="small">
                <Close fontSize="small" />
              </IconButton>
            </Box>
            <Quantity
              productId={item.info.product_id}
              product_name={item.info.product_name}
              variant_name={selectedVariant.variant_name}
              stack={selectedVariant.variant_stack}
              images_url={item.info.images_url}
              quantity={selectedVariant.variant_quantity}
              discount={selectedVariant.variant_discount}
              price={selectedVariant.variant_price}
              showDetails={false}
              product_uuid={selectedVariant.variant_uuid}
              onClose={handleQuantityClose}
            />
          </Box>
        )}
      </CardActions>
    </Card>
  );
}

export default ShopSwiperCards;