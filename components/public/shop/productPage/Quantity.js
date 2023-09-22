import React, { useState } from "react";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PriceBox from "./PriceBox";
import { persianNumber } from "../../../../src/PersianDigits";
import AddToCart from "./AddToCart";
function Quantity({ discount, price, stack, quantity, productId }) {
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
          textAlign: "center",
        }}
      >
        <ButtonGroup
          sx={{
            direction: "ltr",
            my: 4,
            // transform: "scale(.8)",
          }}
          component={"div"}
          size="small"
          aria-label="small outlined button group"
        >
          <Button
            variant="text"
            sx={{
              // padding: "5px 2px !important",
              borderBottom: "2px solid !important",
              borderTop: "2px solid !important",

              mr: "1px",
              borderRadius: "20%",
            }}
            color="success"
            onClick={handleIncrement}
          >
            <AddIcon />
          </Button>
          {displayCounter && (
            <Button
              sx={{
                padding: "2px !important",
                fontSize: 18,
                textAlign: "center",
                mx: "10px !important",
                borderRadius: "20% !important",
                border: "2px solid !important",
                fontWeight: "bold",
              }}
              color="info"
              variant="text"
            >
              {persianNumber(counter)}
            </Button>
          )}
          {displayCounter && (
            <Button
              sx={{
                // padding: "5px 2px !important",
                borderBottom: "2px solid !important",
                borderTop: "2px solid !important",

                borderRadius: "20%",
              }}
              color="warning"
              onClick={handleDecrement}
              variant="text"
            >
              <RemoveIcon />
            </Button>
          )}
        </ButtonGroup>
      </Box>
      <PriceBox
        discount={discount}
        price={price}
        quantity={quantity}
        counter={counter}
        stack={stack}
      />
      <AddToCart
        fullStack={stack * counter}
        counter={counter}
        productId={productId}
      />
    </>
  );
}

export default Quantity;
