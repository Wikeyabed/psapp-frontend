import React, { useState } from "react";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PriceBox from "./PriceBox";
import { persianNumber } from "../../../../src/PersianDigits";
function Quantity({ discount, price }) {
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
            mt: 4,
            // transform: "scale(.8)",
          }}
          component={"div"}
          size="small"
          aria-label="small outlined button group"
        >
          <Button
            sx={{
              padding: "5px 2px !important",
              border: "1px solid  #ccc",
              mr: "1px",
              borderRadius: "20%",
            }}
            color="secondary"
            onClick={handleIncrement}
          >
            <AddIcon />
          </Button>
          {displayCounter && (
            <Button
              sx={{
                padding: "5px 0px !important",
              }}
              disabled
              color="secondary"
              variant="outlined"
            >
              {persianNumber(counter)}
            </Button>
          )}
          {displayCounter && (
            <Button
              sx={{
                padding: "5px 2px !important",
                border: "1px solid  #ccc",
                borderRadius: "20%",
              }}
              color="secondary"
              onClick={handleDecrement}
            >
              <RemoveIcon />
            </Button>
          )}
        </ButtonGroup>
      </Box>
      <PriceBox discount={discount} price={price} quantity={counter} />
    </>
  );
}

export default Quantity;
