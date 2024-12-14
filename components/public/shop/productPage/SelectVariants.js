import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
export default function SelectVariants({ variants, select }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = useState();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const variantParam = searchParams.get("variant");
    if (variantParam != null && variantParam != "undefined") {
      const defaultVariant = variants.filter((variant) => {
        return variantParam == variant.variant_uuid;
      });
      checkTheSelected(defaultVariant[0]);
    }
  }, []);

  const checkTheSelected = (variant) => {
    setSelectedVariant(variant.variant_uuid);
    router.push(
      pathname + "?" + createQueryString("variant", variant.variant_uuid)
    );
    select(variant);
  };

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
        defaultValue={variants[0].variant_name ? variants[0].variant_name : ""}
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
                checked={variant.variant_uuid == selectedVariant}
                onChange={() => checkTheSelected(variant)}
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
