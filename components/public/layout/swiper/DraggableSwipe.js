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
import { Box, Grid, Typography } from "@mui/material";
import ShopSwiperCards from "./ShopSwiperCards";
import { persianNumber } from "../../../../src/PersianDigits";
export default function DraggableSwipe({ title, items, effect }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          sx={{
            mt: 10,
            mb: 2,
            width: "100% !important",
            fontWeight: "bold",
            textDecoration: "underline",
            textDecorationColor: "#007aff",
            textDecorationThickness: "4px",
            textUnderlineOffset: 12,
          }}
          variant="h6"
          component={"div"}
        >
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Swiper
          grabCursor={true}
          height={"auto"}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
              return (
                '<span class="' +
                className +
                '">' +
                persianNumber(index + 1) +
                "</span>"
              );
            },
          }}
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
                    style={{
                      backgroundColor: "transparent",
                      padding: 5,
                      paddingBottom: 70,
                    }}
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
