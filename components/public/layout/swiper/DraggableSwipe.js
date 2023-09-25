import React, { useRef, useState, useCallback } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
// next modules
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Box, Grid, Typography } from "@mui/material";
import { persianNumber } from "../../../../src/PersianDigits";
import { cloneElement } from "react";
import Link from "../../../../src/Link";
export default function DraggableSwipe({ title, items, effect, children }) {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          gutterBottom
          sx={{
            width: "100% !important",
            fontWeight: "bold",
            textDecoration: "underline",
            textDecorationColor: "#007aff",
            textDecorationThickness: "4px",
            textUnderlineOffset: 12,
          }}
          variant="h6"
          component={Link}
          href={`/shop/categories?${createQueryString("category", title)}`}
        >
          {title}
        </Typography>
      </Grid>

      <Grid
        sx={{
          mt: 2,
          mb: 10,
        }}
        item
        xs={12}
      >
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
                    {/* <ShopSwiperCards item={item} /> */}
                    {cloneElement(children, { item: item })}
                  </SwiperSlide>
                );
              })
            : ""}
        </Swiper>
      </Grid>
    </Grid>
  );
}
