import { useState } from "react";
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
  Avatar,
  Collapse,
} from "@mui/material";
import {
  ShoppingCart,
  ArrowDropDown,
  FavoriteBorder,
  LocalOffer,
  Inventory,
  Star,
  Close,
} from "@mui/icons-material";

function ShopSwiperCards({ item }) {
  const [activeQuantity, setActiveQuantity] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const selectedVariant =
    item.variants?.[selectedVariantIndex] || item.variants?.[0];

  if (!selectedVariant) return null;

  // Menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleVariantSelect = (index) => {
    setSelectedVariantIndex(index);
    setActiveQuantity(false);
    handleMenuClose();
  };

  // Price calculation
  const calculatePrice = () => {
    const price = selectedVariant.variant_price;
    const discount = selectedVariant.variant_discount || 0;
    return Math.round(price * (1 - discount / 100));
  };

  const handleAddToCartClick = () => {
    setActiveQuantity(true);
  };

  const handleQuantityClose = () => {
    setActiveQuantity(false);
  };

  return (
    <Card
      sx={{
        width: 300,
        // Adjust height when quantity selector is active
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",

        background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {selectedVariant.variant_discount > 0 && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            <Box
              sx={{
                bgcolor: "error.main",
                color: "#fff",
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
              }}
            >
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

      {/* Product Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
          overflow: "hidden",
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/products/${item.info.product_id}?category=${item.info.product_name}`}
        >
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
          />
        </Link>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2.5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Product Name */}
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

        {/* Variant Selection */}
        <Box
          sx={{
            mb: 2,
            position: "relative",
            bgcolor: "rgba(0,0,0,0.03)",
            borderRadius: 1,
            p: 1,
          }}
        >
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Inventory
                fontSize="small"
                sx={{ ml: 2, color: "primary.main" }}
              />
              <Typography noWrap>{selectedVariant.variant_name}</Typography>
            </Box>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
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
                    bgcolor: "#6366f1", // رنگ اصلی بنفش
                    color: "#fff",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#4f46e5", // رنگ بنفش تیره‌تر در حالت hover
                    },
                  },
                  "&:hover": {
                    bgcolor: "#f3f4f6", // خاکستری روشن (هاور برای گزینه‌های انتخاب‌نشده)
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Inventory
                      fontSize="small"
                      sx={{
                        ml: 2,
                        color:
                          index === selectedVariantIndex
                            ? "#fff"
                            : "primary.main",
                      }}
                    />
                    <Typography>{variant.variant_name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {persianNumber(variant.variant_price)} ریال
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Price & Details */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
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
            label={`${persianNumber(
              selectedVariant.variant_stack
            )} عدد در بسته`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: "divider",
              color: "text.secondary",
            }}
          />
        </Box>
      </CardContent>

      {/* Add to Cart Button */}
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
              borderRadius: "12px", // انحنا طبق راهنما
              fontWeight: 700,
              fontSize: "1rem",
              bgcolor: "#6366f1", // رنگ اصلی
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#4f46e5", // رنگ تیره‌تر برای hover
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              },
            }}
          >
            {selectedVariant.variant_quantity > 0
              ? "افزودن به سبد خرید"
              : "تماس بگیرید"}
          </Button>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 1,
              }}
            >
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
