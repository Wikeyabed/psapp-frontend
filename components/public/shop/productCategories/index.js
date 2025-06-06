import React from "react";
import PublicLayout from "../../layout";
import { Box, Grid, Button, Paper, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "../../../../src/Link";
import MoreIcon from "@mui/icons-material/More";
function ProductCategories({ categories }) {
  console.log(categories);
  return (
    <PublicLayout>
      <Container>
        <Typography
          sx={{
            my: 4,
            fontSize: { xs: 20, md: 25 },
          }}
          variant="h2"
          textAlign={"center"}
        >
          لیست محصولات
        </Typography>

        <Grid sx={{ p: 2 }} container item spacing={4}>
          {categories
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((category, i) => {
              console.log(category.category_image);
              return (
                <Grid key={i} item xs={6} sm={4} md={3}>
                  <Paper
                    sx={{
                      height: { xs: 120, sm: 170, md: 200 },
                      position: "relative",
                      transition: { md: "ease-in .2s all" },
                      borderRadius: 4,
                      "&:hover": {
                        transform: {
                          md: "scale(1.1)",
                        },

                        zIndex: 100,
                      },
                    }}
                    elevation={5}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${category.category_image}`}
                      alt={category.category_name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: 16,
                        zIndex: -2,
                        opacity: 0.8,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        width: "100%",
                        left: 0,
                        height: "100%",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none !important",
                      }}
                      component={Link}
                      href={`/shop/categories?category=${category.category_name}`}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: "center",
                          position: "absolute",
                          bottom: "0",
                          border: "1px solid #fff",
                          borderBottomLeftRadius: 16,
                          borderBottomRightRadius: 16,
                          px: 1,
                          width: "100%",
                          backgroundColor: "#fff",
                          color: "#111",
                          fontWeight: "bold",
                          fontSize: { xs: 12, sm: 16 },
                          zIndex: 2,
                        }}
                      >
                        {category.category_name}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}

          <Grid item xs={6} sm={4} md={3}>
            <Paper
              elevation={5}
              className="parent-box"
              sx={{
                border: "1px solid #e2e2e2",
                height: { xs: 120, sm: 170, md: 200 },
                position: "relative",
                transition: { md: "ease-in .2s all" },
                borderRadius: 4,
                "&:hover": {
                  "& .more-icon": {
                    opacity: 1,
                  },
                  "& .more-text": {
                    mr: -1,
                    ml: 3,
                  },
                  zIndex: 100,
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  width: "100%",
                  left: 0,
                  height: "100%",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none !important",
                }}
                component={Link}
                href={"/shop/categories?category=all"}
              >
                <Typography
                  className="more-text"
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    transition: "ease .5s all",
                    mr: 4,
                    ml: 0,
                    p: 1,
                    color: "#111",
                    lineHeight: 2.5,
                    borderRadius: "25%",
                    fontWeight: "bold",
                    fontSize: { xs: 10, sm: 14 },
                    zIndex: 2,
                  }}
                >
                  نمایش تمامی محصولات{" "}
                </Typography>
                <MoreIcon
                  className="more-icon"
                  sx={{
                    color: "#DE935C",
                    transition: "linear .5s all",
                    fontSize: 45,
                    opacity: 0,
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
}

export default ProductCategories;
