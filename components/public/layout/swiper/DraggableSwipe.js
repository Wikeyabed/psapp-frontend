import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { Grid, Typography } from "@mui/material";
import ShopSwiperCards from "./ShopSwiperCards";
export default function DraggableSwipe({ title, items, effect }) {
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
          navigation={true}
          height={"auto"}
          slidesPerView={1}
          spaceBetween={10}
          width={1024}
          breakpoints={{
            680: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          freeMode={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {items.length > 0
            ? items.map((item, i) => {
                return (
                  <SwiperSlide
                    style={{ backgroundColor: "transparent", padding: 5 }}
                    key={i}
                  >
                    <ShopSwiperCards item={item} />
                  </SwiperSlide>
                );
              })
            : ""}
        </Swiper>
      </Grid>
    </Grid>
  );
}
