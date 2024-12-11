import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Button, Paper } from "@mui/material";
import Link from "../../../../src/Link";

export default function FullScreenSlider({ slides }) {
  console.log("easy", slides[0].img);
  return (
    <>
      <Paper
        elevation={4}
        component={Swiper}
        pagination={{
          type: "progressbar",
        }}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        sx={{
          borderRadius: "10px",
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            style={{
              position: "relative",
            }}
            key={index}
          >
            <Image
              width={0}
              height={0}
              loading="eager"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              unoptimized
              src={slide.img}
              alt={"ایباکس"}
            />
            {slide.text ? (
              <Button
                component={Link}
                href={slide.href}
                color="lightPrimary"
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: "400",
                  padding: "10px 50px",
                  color: "#fff",
                  borderTop: "1px solid #fff",
                  borderRight: "1px solid #fff",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "0px !important",
                  borderBottomRightRadius: "0px !important",
                }}
              >
                {slide.text}
              </Button>
            ) : (
              ""
            )}
          </SwiperSlide>
        ))}
      </Paper>
    </>
  );
}
