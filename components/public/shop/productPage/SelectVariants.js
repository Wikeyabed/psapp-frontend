import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

export default function SelectVariants({ variants, select }) {
  return (
    <FormControl
      sx={{
        width: "100%",
        my: 4,
      }}
    >
      <FormLabel
        sx={{
          color: "#000 !important",
          mb: 4,
          pt: 4,
          borderTop: "1px solid #ccc",
        }}
        id="demo-radio-buttons-group-label"
      >
        انتخاب تنوع
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={variants[0].variant_name}
        name="radio-buttons-group"
      >
        {variants.map((variant, i) => {
          return (
            <Box
              key={i}
              sx={{
                position: "relative",
              }}
            >
              <FormControlLabel
                onChange={() => select(variant)}
                value={variant.variant_uuid}
                control={
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: "primary",
                      },
                    }}
                  />
                }
                label={variant.variant_name}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 11,
                  right: -10,
                  width: 30,
                  height: 20,
                  border: "1px solid #444",
                  backgroundColor: variant.variant_color
                    ? variant.variant_color
                    : "#fff",
                  borderRadius: "10px",
                }}
              ></Box>
            </Box>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
