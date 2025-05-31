import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Collapse,
  Checkbox,
  IconButton,
  Box,
  Drawer,
  Button,
} from "@mui/material";
import PublicLayout from "../../layout/index";
import ProductList from "./ProductList";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../../redux/reducers/productSlice";
import { useRouter } from "next/router";
import { ExpandMore, ExpandLess, ChevronLeft, Menu } from "@mui/icons-material";

function Categories({ cats }) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { category: categoryParam } = router.query;
  const productRef = useRef(null);

  // Color palette
  const colors = {
    primary: "#4f46e5",
    secondary: "#06b6d4",
    lightBg: "#f8fafc",
    darkText: "#1e293b",
    lightText: "#64748b",
    hoverBg: "#e0e7ff",
    border: "#e2e8f0",
    activeBg: "#f5f3ff",
  };

  // Initialize selected category from URL
  useEffect(() => {
    if (categoryParam) {
      if (categoryParam === "all") {
        setSelectedCategory(null);
        dispatch(setFilter("all"));
      } else {
        // Find category in main categories
        const foundCategory = cats.find(
          (cat) => cat.category_name === categoryParam
        );

        // If not found in main categories, check subcategories
        if (!foundCategory) {
          for (const cat of cats) {
            if (cat.subCategories) {
              const foundSubCategory = cat.subCategories.find(
                (subCat) => subCat.category_name === categoryParam
              );
              if (foundSubCategory) {
                setSelectedCategory(foundSubCategory);
                setExpandedCategory(cat.category_id);
                dispatch(setFilter(foundSubCategory.category_name));
                break;
              }
            }
          }
        } else {
          setSelectedCategory(foundCategory);
          dispatch(setFilter(foundCategory.category_name));
        }
      }
    } else {
      // Default to "all" if no category in URL
      setSelectedCategory(null);
      dispatch(setFilter("all"));
    }
  }, [categoryParam, cats, dispatch]);

  const handleCategoryClick = (category) => {
    if (category) {
      dispatch(setFilter(category.category_name));
      setSelectedCategory(category);
    } else {
      dispatch(setFilter("all"));
      setSelectedCategory(null);
    }

    if (isMobile) {
      setMobileOpen(false);
    }

    setTimeout(() => {
      productRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleExpandClick = (categoryId, event) => {
    event.stopPropagation();
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const FilterContent = () => (
    <>
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
        {/* All Products */}
        <ListItem
          disablePadding
          dense
          secondaryAction={
            <Checkbox
              edge="end"
              checked={!selectedCategory}
              onChange={() => handleCategoryClick(null)}
              sx={{
                color: colors.primary,
                "&.Mui-checked": {
                  color: colors.primary,
                },
                padding: "8px",
              }}
            />
          }
        >
          <ListItemButton
            onClick={() => handleCategoryClick(null)}
            selected={!selectedCategory}
            sx={{
              borderRadius: "8px",
              mb: 1,
              minHeight: "40px",
              transition: "all 0.2s ease",
              "&.Mui-selected": {
                backgroundColor: colors.activeBg,
                "&:hover": {
                  backgroundColor: colors.activeBg,
                },
              },
              "&:hover": {
                backgroundColor: colors.hoverBg,
              },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "'Segoe UI', Tahoma, sans-serif",
                    fontSize: "0.9rem",
                    color: !selectedCategory ? colors.primary : colors.darkText,
                  }}
                >
                  همه محصولات
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1, borderColor: colors.border, opacity: 0.6 }} />

        {/* Categories with sub-items */}
        {cats.map((category) => (
          <Box key={category.category_id} sx={{ mb: 1 }}>
            <ListItem
              disablePadding
              dense
              secondaryAction={
                category.subCategories && (
                  <IconButton
                    edge="end"
                    onClick={(e) => handleExpandClick(category.category_id, e)}
                    size="small"
                    sx={{
                      color:
                        expandedCategory === category.category_id
                          ? colors.primary
                          : colors.lightText,
                    }}
                  >
                    {expandedCategory === category.category_id ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                )
              }
            >
              <ListItemButton
                onClick={() => {
                  handleCategoryClick(category);
                  if (category.subCategories) {
                    setExpandedCategory(
                      expandedCategory === category.category_id
                        ? null
                        : category.category_id
                    );
                  }
                }}
                selected={selectedCategory?.id === category.category_id}
                sx={{
                  borderRadius: "8px",
                  minHeight: "40px",
                  transition: "all 0.2s ease",
                  "&.Mui-selected": {
                    backgroundColor: colors.activeBg,
                    "&:hover": {
                      backgroundColor: colors.activeBg,
                    },
                  },
                  "&:hover": {
                    backgroundColor: colors.hoverBg,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "32px" }}>
                  <Checkbox
                    edge="start"
                    checked={
                      selectedCategory?.category_id === category.category_id
                    }
                    tabIndex={-1}
                    disableRipple
                    sx={{
                      color: colors.primary,
                      "&.Mui-checked": {
                        color: colors.primary,
                      },
                      padding: "6px",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        fontFamily: "'Segoe UI', Tahoma, sans-serif",
                        fontSize: "0.9rem",
                        color:
                          selectedCategory?.id === category.category_id
                            ? colors.primary
                            : colors.darkText,
                      }}
                    >
                      {category.category_name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>

            {/* Sub-items */}
            {category.subCategories && (
              <Collapse
                in={expandedCategory === category.category_id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding sx={{ pl: 2 }}>
                  {category.subCategories.map((subCat) => (
                    <ListItem key={subCat.id} disablePadding dense>
                      <ListItemButton
                        onClick={() => handleCategoryClick(subCat)}
                        selected={selectedCategory?.id === subCat.id}
                        sx={{
                          borderRadius: "6px",
                          minHeight: "36px",
                          pl: 4,
                          transition: "all 0.2s ease",
                          "&.Mui-selected": {
                            backgroundColor: colors.activeBg,
                            "&:hover": {
                              backgroundColor: colors.activeBg,
                            },
                          },
                          "&:hover": {
                            backgroundColor: colors.hoverBg,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "28px" }}>
                          <ChevronLeft
                            fontSize="small"
                            sx={{
                              color:
                                selectedCategory?.id === subCat.id
                                  ? colors.primary
                                  : colors.lightText,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                fontFamily: "'Segoe UI', Tahoma, sans-serif",
                                fontSize: "0.85rem",
                                color:
                                  selectedCategory?.id === subCat.id
                                    ? colors.primary
                                    : colors.darkText,
                              }}
                            >
                              {subCat.category_name}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </>
  );

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
        {/* Mobile Filter Button */}
        {isMobile && (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={
                <Menu
                  sx={{
                    ml: 4,
                  }}
                />
              }
              onClick={handleDrawerToggle}
              sx={{
                mb: 2,
                width: "100%",
                justifyContent: "flex-start",
                borderColor: colors.border,
                color: colors.darkText,
                "&:hover": {
                  borderColor: colors.primary,
                },
              }}
            >
              فیلتر دسته‌بندی‌ها
            </Button>
          </Grid>
        )}

        {/* Categories Sidebar - Desktop */}
        {!isMobile && (
          <Grid item xs={12} md={2}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                position: "sticky",
                top: 20,
                maxHeight: "calc(100vh +200px)",
                overflowY: "auto",
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: `1px solid ${colors.border}`,
              }}
            >
              <FilterContent />
            </Paper>
          </Grid>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              p: 2,
            },
          }}
        >
          <FilterContent />
        </Drawer>

        {/* Main Products Section */}
        <Grid item xs={12} md={isMobile ? 12 : 10} ref={productRef}>
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
