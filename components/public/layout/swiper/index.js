import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Grid, Typography } from "@mui/material";
import ShopSwiperCards from "./ShopSwiperCards";
export default function Swipe({ title, items }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          sx={{
            mt: 10,
            mb: 2,
          }}
          variant="h5"
          display={"block"}
        >
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {items.length > 0
            ? items.map((item, i) => {
                return (
                  <SwiperSlide
                    style={{ backgroundColor: "transparent", padding: 5 }}
                    key={i}
                  >
                    <ShopSwiperCards>{item}</ShopSwiperCards>
                  </SwiperSlide>
                );
              })
            : ""}
        </Swiper>
      </Grid>
    </Grid>
  );
}
