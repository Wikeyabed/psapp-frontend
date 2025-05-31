import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PublicLayout from "../../layout/index";
import ProductList from "./ProductList";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../../redux/reducers/productSlice";
import { useRouter } from "next/router";

function Categories({ cats }) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { category } = router.query;
  const productRef = useRef(null); // 🔸 اضافه‌شده برای اسکرول

  // 🎨 پالت رنگی
  const colors = {
    primary: "#4f46e5",
    secondary: "#06b6d4",
    lightBg: "#f8fafc",
    darkText: "#1e293b",
    lightText: "#64748b",
    hoverBg: "#e0e7ff",
    border: "#e2e8f0",
  };

  useEffect(() => {
    if (category) {
      if (category === "all") {
        handleCategoryClick(null);
      } else {
        const foundCategory = cats.find(
          (cat) => cat.category_name === category
        );
        if (foundCategory) {
          handleCategoryClick(foundCategory);
        }
      }
    }
  }, [category, cats]);

  const handleCategoryClick = (category) => {
    if (category) {
      dispatch(setFilter(category.category_name));
      setSelectedCategory(category);
    } else {
      dispatch(setFilter("all"));
      setSelectedCategory(null);
    }

    // 🔸 اسکرول به بالای بخش محصولات
    setTimeout(() => {
      productRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const stickySidebarStyles = {
    position: isMobile ? "static" : "sticky",
    top: isMobile ? 0 : 20,
  };

  return (
    <PublicLayout>
      <Grid
        container
        spacing={3}
        sx={{
          p: { xs: 1, md: 3 },
          backgroundColor: colors.lightBg,
          minHeight: "100vh",
        }}
      >
        {/* 🟦 سایدبار دسته‌بندی‌ها */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              ...stickySidebarStyles,
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: colors.primary,
                textAlign: "center",
                py: 1,
                borderBottom: `2px solid ${colors.border}`,
                fontFamily: "'Segoe UI', Tahoma, sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.5px",
              }}
            >
              دسته‌بندی محصولات
            </Typography>

            <List sx={{ py: 0 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleCategoryClick(null)}
                  selected={!selectedCategory}
                  sx={{
                    borderRadius: "12px",
                    mb: 1,
                    minHeight: "48px",
                    display: "flex",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    "&.Mui-selected": {
                      backgroundColor: colors.primary,
                      color: "white",
                      "&:hover": {
                        backgroundColor: colors.primary,
                        opacity: 0.9,
                      },
                    },
                    "&:hover": {
                      backgroundColor: colors.hoverBg,
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "'Segoe UI', Tahoma, sans-serif",
                      textAlign: "center",
                      fontSize: "0.9rem",
                    }}
                  >
                    همه محصولات
                  </Typography>
                </ListItemButton>
              </ListItem>

              <Divider
                sx={{
                  my: 1,
                  borderColor: colors.border,
                  opacity: 0.6,
                }}
              />

              {cats.map((category) => (
                <ListItem key={category.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleCategoryClick(category)}
                    selected={selectedCategory?.id === category.id}
                    sx={{
                      borderRadius: "12px",
                      mb: 1,
                      minHeight: "48px",
                      display: "flex",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      "&.Mui-selected": {
                        backgroundColor: colors.primary,
                        color: "white",
                        "&:hover": {
                          backgroundColor: colors.primary,
                          opacity: 0.9,
                        },
                      },
                      "&:hover": {
                        backgroundColor: colors.hoverBg,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        fontFamily: "'Segoe UI', Tahoma, sans-serif",
                        textAlign: "center",
                        fontSize: "0.9rem",
                        color:
                          selectedCategory?.id === category.id
                            ? "white"
                            : colors.darkText,
                      }}
                    >
                      {category.category_name}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 🟩 بخش اصلی محصولات */}
        <Grid item xs={12} md={9} ref={productRef}>
          <Typography
            variant="h1"
            sx={{
              mb: 4,
              fontWeight: 800,
              color: colors.darkText,
              position: "relative",
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
              fontSize: { xs: "1.5rem", md: "2rem" },
              textAlign: "center",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -12,
                right: "50%",
                transform: "translateX(50%)",
                width: "150px",
                height: "4px",
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                borderRadius: "2px",
              },
            }}
          >
            {selectedCategory ? selectedCategory.category_name : "همه محصولات"}
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: `1px solid ${colors.border}`,
              minHeight: "60vh",
            }}
          >
            <ProductList cats={cats} />
          </Paper>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default Categories;
