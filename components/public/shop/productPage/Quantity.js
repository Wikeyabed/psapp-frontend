import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PriceBox from "./PriceBox";
import { persianNumber } from "../../../../src/PersianDigits";
import AddToCart from "./AddToCart";
function Quantity({
  discount,
  price,
  stack,
  quantity,
  productId,
  showDetails = true,
  product_uuid,
  variant_uuid,
  product_name,
  variant_name,
  images_url,
}) {
  const [counter, setCounter] = useState(1);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const displayCounter = counter >= 1;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: showDetails ? 2 : 0,
        }}
      >
        {/* <Grid xs={12} md={6}> */}
        <AddToCart
          variant_stack={stack}
          product_name={product_name + "-" + variant_name}
          fullStack={stack * counter}
          price={price}
          counter={counter}
          productId={productId}
          showDetails={showDetails}
          product_uuid={product_uuid}
          instock={quantity}
          discount={discount}
          variant_uuid={product_uuid}
          images_url={images_url}
        />
        {/* </Grid> */}
        {/* <Grid xs={12} md={6}> */}{" "}
        <ButtonGroup
          sx={{
            direction: "ltr",
            borderRadius: "12px",
            height: "40px", // کمی کمتر از 48 برای جمع‌وجوری
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            bgcolor: "#f0f4ff",
            overflow: "hidden",
          }}
          size="small"
        >
          {/* دکمه افزایش */}
          <Button
            onClick={handleIncrement}
            sx={{
              minWidth: "40px",
              height: "40px",
              borderRadius: 0,
              bgcolor: "#6366f1",
              color: "#fff",
              "&:hover": {
                bgcolor: "#4f46e5",
              },
              fontSize: "1rem",
            }}
          >
            <AddIcon sx={{ fontSize: "20px" }} />
          </Button>

          {/* عدد میانی */}
          {displayCounter && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 1.5,
                minWidth: "48px",
                fontSize: "0.95rem",
                fontWeight: "bold",
                fontFamily: "Segoe UI",
                color: "#333",
              }}
            >
              {persianNumber(counter * stack)}
            </Box>
          )}

          {/* دکمه کاهش */}
          {displayCounter && (
            <Button
              onClick={handleDecrement}
              sx={{
                minWidth: "40px",
                height: "40px",
                borderRadius: 0,
                bgcolor: "#6366f1",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#0891b2",
                },
                fontSize: "1rem",
              }}
            >
              <RemoveIcon sx={{ fontSize: "20px" }} />
            </Button>
          )}
        </ButtonGroup>
        {/* </Grid> */}
      </Box>
      {showDetails ? (
        <>
          <PriceBox
            discount={discount}
            price={price}
            quantity={quantity}
            counter={counter}
            stack={stack}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Quantity;
