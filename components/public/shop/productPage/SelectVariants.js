import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SelectVariants({ variants, select }) {
  return (
    <FormControl
      sx={{
        width: "100%",
        my: 4,
      }}
    >
      <FormLabel id="demo-radio-buttons-group-label">انتخاب تنوع</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={variants[0].variant_name}
        name="radio-buttons-group"
      >
        {variants.map((variant, i) => {
          return (
            <FormControlLabel
              onChange={() => select(variant)}
              value={variant.variant_uuid}
              control={
                <Radio
                  sx={{
                    "&, &.Mui-checked": {
                      color: variant.variant_color,
                    },
                  }}
                />
              }
              label={variant.variant_name}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
