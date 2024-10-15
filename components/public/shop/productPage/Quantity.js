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
          product_name={product_name + "-" + variant_name}
          fullStack={stack * counter}
          price={price}
          counter={counter}
          productId={productId}
          showDetails={showDetails}
          product_uuid={product_uuid}
          instock={quantity}
          discount={discount}
          variant_uuid={variant_uuid}
          images_url={images_url}
        />
        {/* </Grid> */}
        {/* <Grid xs={12} md={6}> */}{" "}
        <ButtonGroup
          sx={{
            direction: "ltr",
            // transform: "scale(.8)",
            borderRadius: "5px!important",
            p: 0.5,
          }}
          color="secondary"
          component={"div"}
          aria-label="small outlined button group"
          size="small"
        >
          <Button
            variant="text"
            sx={{
              // padding: "5px 2px !important",
              // borderBottom: "2px solid !important",
              // borderTop: "2px solid !important",
              fontSize: 10,

              borderRadius: "20%",
            }}
            color="secondary"
            onClick={handleIncrement}
          >
            <AddIcon
              sx={{
                fontSize: 18,
              }}
            />
          </Button>
          {displayCounter && (
            <Button
              sx={{
                padding: "2px !important",
                fontSize: 15,
                textAlign: "center",
                borderRadius: "20% !important",
                // border: "2px solid !important",
                fontWeight: "bold",
              }}
              color="info"
              variant="text"
            >
              {persianNumber(counter * stack)}
            </Button>
          )}
          {displayCounter && (
            <Button
              sx={{
                fontSize: 10,

                borderRadius: "20%",
              }}
              color="secondary"
              onClick={handleDecrement}
              variant="text"
            >
              <RemoveIcon
                sx={{
                  fontSize: 18,
                }}
              />
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
