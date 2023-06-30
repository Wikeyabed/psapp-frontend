import React, { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
            border: "1px solid  #e2e2e2",
            mr: "1px",
            borderRadius: "50%",
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
            color="secondary"
            variant="outlined"
            disabled
          >
            {counter}
          </Button>
        )}
        {displayCounter && (
          <Button
            sx={{
              padding: "5px 2px !important",
              border: "1px solid  #e2e2e2",
              borderRadius: "50%",
            }}
            color="secondary"
            onClick={handleDecrement}
          >
            <RemoveIcon />
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
}

export default Quantity;
