import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function ProductSlicer({ images }) {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,

      slides: {
        perView: 4,
        spacing: 20,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <Box
        style={{
          borderRadius: "20px",
        }}
        ref={sliderRef}
        className="keen-slider"
      >
        {images.map((image, i) => (
          <Box
            sx={{
              width: "101%",
              height: { xs: 250, md: 400 },
            }}
            key={image + i}
            className="keen-slider__slide"
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              width={0}
              height={0}
              sizes="100vw"
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${image}`}
              alt="ایباکس"
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          pb: 10,
        }}
        ref={thumbnailRef}
        className="keen-slider thumbnail"
      >
        {images.map((image, i) => (
          <Box
            key={image + i}
            sx={{
              borderRadius: "20px",
              height: { xs: "80px !important", md: "140px !important" },
            }}
            className="keen-slider__slide number-slide2"
          >
            <Image
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
              }}
              width={0}
              height={0}
              sizes="100vw"
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${image}`}
              alt="ایباکس"
            />
          </Box>
        ))}

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            zIndex: 1000,
            textAlign: "center",
            width: "100%",
          }}
        >
          {loaded && instanceRef.current && (
            <div className="dots">
              {[
                ...Array(
                  instanceRef.current.track.details.slides.length
                ).keys(),
              ]
                .reverse()
                .map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={
                        "dot" + (currentSlide === idx ? " active" : "")
                      }
                    ></button>
                  );
                })}
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
