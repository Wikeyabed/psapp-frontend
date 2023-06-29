import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";

function Quantity() {
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
    <ButtonGroup
      sx={{
        direction: "ltr",
        mt: 2,
      }}
      size="small"
      aria-label="small outlined button group"
    >
      <Button color="info" onClick={handleIncrement}>
        +
      </Button>
      {displayCounter && <Button disabled>{counter}</Button>}
      {displayCounter && (
        <Button color="info" onClick={handleDecrement}>
          -
        </Button>
      )}
    </ButtonGroup>
  );
}

export default Quantity;
