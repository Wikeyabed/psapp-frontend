import React from "react";
import PublicLayout from "../../layout";
import { Box, Grid, Button, Paper, Container, Typography } from "@mui/material";
import Image from "next/image";
import Dog from "../../../../public/images/dog.jpg";

function ProductCategories({ categories }) {
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
          تمامی محصولات
        </Typography>

        <Grid sx={{ p: 2 }} container item spacing={4}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
            return (
              <Grid key={i} item xs={6} sm={4} md={3}>
                <Paper
                  sx={{
                    height: { xs: 120, sm: 170, md: 200 },
                    position: "relative",
                    transition: { md: "ease-in .2s all" },
                    borderRadius: 8,
                    "&:hover": {
                      transform: {
                        md: "scale(1.1)",
                      },

                      zIndex: 100,
                    },
                  }}
                  elevation={7}
                >
                  <Image
                    src={`https://picsum.photos/id/${i * 5}/256/210`}
                    alt={"hello"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: 32,
                      zIndex: -2,
                      opacity: 0.5,
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
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        position: "absolute",
                        top: "40%",
                        textAlign: "center",
                        width: "100%",
                        p: 1,
                        borderBottom: "5px solid #DE935C",
                        borderRadius: "50%",
                        fontSize: { xs: 15, md: 20 },
                        zIndex: 2,
                      }}
                    >
                      کارتن پستی
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </PublicLayout>
  );
}

export default ProductCategories;
