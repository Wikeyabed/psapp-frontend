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

export default function FullScreenSlider({ slides }) {
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        style={{
          borderRadius: "5px",
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              style={{
                width: "100%",
                aspectRatio: "4/3",
                height: "100%",
                objectFit: "fill",
                borderRadius: "10px",
              }}
              src={slide.src}
              alt={"ایباکس"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
