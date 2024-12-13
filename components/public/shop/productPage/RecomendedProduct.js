import React from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import DraggableSwipe from "../../layout/swiper/DraggableSwipe";

function RecomendedProduct({ products }) {
  //   const random = Math.floor(Math.random() * products.length);

  const randomProduct = [
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)],
  ];

  console.log("randoms", randomProduct);
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          borderTop: "1px solid #ccc",
          mt: 4,
          pt: 4,
          textAlign: "center",
        }}
      >
        محصولات پیشنهادی
      </Typography>

      <Grid
        sx={{
          //   border: "1px solid #ccc",
          padding: 5,
          borderRadius: 5,
          my: 4,
        }}
        container
        spacing={1}
      >
        <DraggableSwipe
          title={"محصولات پیشنهادی"}
          items={randomProduct}
          key={"1"}
        >
          <div>sdsd</div>
        </DraggableSwipe>
        {/* {randomProduct.map((product, i) => {
          return (
            <Swiper
              item
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <Paper
                component={SwiperSlide}
                elevation={5}
                sx={{
                  borderRadius: 2,
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${product.images_url[0]}`}
                  alt="ایباکس"
                />
                <Box
                  sx={{
                    padding: 3,
                  }}
                >
                  {product.product_name}
                </Box>
              </Paper>
            </Swiper>
          );
        })} */}
      </Grid>
    </>
  );
}

export default RecomendedProduct;
