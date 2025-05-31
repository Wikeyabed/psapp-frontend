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
import { useState, useEffect } from "react";
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

  useEffect(() => {
    // هنگام لود صفحه یا تغییر پارامتر URL دسته‌بندی را بررسی می‌کنیم
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
  };

  const stickySidebarStyles = {
    position: isMobile ? "static" : "sticky",
    top: isMobile ? 0 : 20,
  };

  return (
    <PublicLayout>
      <Grid container spacing={3} sx={{ p: { xs: 1, md: 3 } }}>
        {/* سایدبار دسته‌بندی‌ها */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              ...stickySidebarStyles,
              bgcolor: "background.paper",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#6366f1",
                textAlign: "center",
                py: 1,
                borderBottom: "2px solid",
                borderColor: "divider",
                fontFamily: "'Segoe UI', Tahoma, sans-serif",
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
                    "&.Mui-selected": {
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        opacity: 0.9,
                      },
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "medium",
                      fontFamily: "'Segoe UI', Tahoma, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    همه محصولات
                  </Typography>
                </ListItemButton>
              </ListItem>

              <Divider sx={{ my: 1 }} />

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
                      "&.Mui-selected": {
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "white",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          opacity: 0.9,
                        },
                      },
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "medium",
                        fontFamily: "'Segoe UI', Tahoma, sans-serif",
                        textAlign: "center",
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

        {/* بخش اصلی محصولات */}
        <Grid item xs={12} md={9}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: "text.primary",
              position: "relative",
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              textAlign: "center",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                right: "50%",
                transform: "translateX(50%)",
                width: 120,
                height: 4,
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                borderRadius: 2,
              },
            }}
          >
            {selectedCategory ? selectedCategory.category_name : "همه محصولات"}
          </Typography>

          <ProductList cats={cats} />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default Categories;
