import React from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
function ProductVariantList({ variants }) {
  return (
    <Grid container spacing={1}>
      {variants != null
        ? variants.map((variant, i) => {
            <Grid key={i} item xs={12} md={6}>
              <Card
                elevation={4}
                sx={{
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    my: 1,
                  }}
                >
                  نام تنوع :{variant.variant_name}
                </Typography>
                <Typography
                  sx={{
                    my: 1,
                  }}
                >
                  قیمت به ریال:{" "}
                </Typography>
                <Typography
                  sx={{
                    my: 1,
                  }}
                >
                  {" "}
                  درصد تخفیف :{" "}
                </Typography>
                <Typography
                  sx={{
                    my: 1,
                  }}
                >
                  مقدار موجودی:{" "}
                </Typography>
                <Typography
                  sx={{
                    my: 1,
                  }}
                >
                  تعداد در بسته:{" "}
                </Typography>

                <FormControlLabel
                  label={
                    <Typography variant="body2">
                      فعال / غیر فعال سازی تنوع
                    </Typography>
                  }
                  sx={{
                    lineHeight: 1,
                  }}
                  control={
                    <Checkbox
                      name="isActive"
                      // onClick={changeActiveStatus}
                      // defaultChecked={data.isActive}
                      size="medium"
                      sx={{
                        mr: "-20px !important",
                      }}
                    />
                  }
                />
              </Card>
            </Grid>;
          })
        : ""}
    </Grid>
  );
}

export default ProductVariantList;
