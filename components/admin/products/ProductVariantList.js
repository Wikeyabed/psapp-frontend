import React from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ProductVariantDelete from "./ProductVariantDelete";

import { styled } from "@mui/material/styles";
import ProductVariantEdit from "./ProductVariantEdit";

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginTop: 2,
  // display: "block",
  marginBottom: 5,
  minWidth: "200px",
  direction: "rtl",
  textAlign: "center !important",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
  },
}));

function ProductVariantList({ variants }) {
  const [edit, setEdit] = useState({ currentId: "" });

  const [data, setData] = useState({
    variant_name: "",
    variant_price: "",
    variant_discount: "",
    variant_quantity: "",
    variant_stack: "",
    is_active: "",
    variant_sort: "",
  });

  const changeActiveStatus = (uuid, currentId) => {
    if (uuid == currentId) {
      setData({ ...data, is_active: !data.is_active });
      console.log(data);
    }
  };

  const clearId = () => {
    setEdit({ currentId: "" });
  };

  const handleSetValues = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  const SetCurrentEdit = (id, variant) => {
    setEdit({ currentId: id });
    if (id == variant.variant_uuid) {
      setData({
        variant_name: variant.variant_name,
        variant_price: variant.variant_price,
        variant_discount: variant.variant_discount,
        variant_quantity: variant.variant_quantity,
        variant_stack: variant.variant_stack,
        is_active: variant.is_active,
        variant_sort: variant.variant_sort,
      });
    }
  };

  return (
    <Grid container spacing={4}>
      {variants !== null
        ? variants.map((variant, i) => {
            return (
              <Grid key={variant.variant_uuid} item xs={12} md={6}>
                <Card
                  elevation={4}
                  sx={{
                    p: 2,
                    position: "relative",
                    minHeight: "300px",
                  }}
                >
                  {edit.currentId != variant.variant_uuid ? (
                    <>
                      <EditIcon
                        onClick={() =>
                          SetCurrentEdit(variant.variant_uuid, variant)
                        }
                        color="info"
                        sx={{
                          cursor: "pointer",
                          position: "absolute",

                          left: 15,
                          top: 15,
                        }}
                      />

                      <ProductVariantDelete
                        mainProductId={variant.variant_product_id}
                        uuid={variant.variant_uuid}
                      />
                    </>
                  ) : (
                    <ProductVariantEdit
                      variant={data}
                      mainProductId={variant.variant_product_id}
                      uuid={variant.variant_uuid}
                      clearId={clearId}
                    />
                  )}
                  {edit.currentId == variant.variant_uuid ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyItems: "center",
                        }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            ml: 2,
                            mt: 1,
                          }}
                        >
                          نام تنوع:
                        </Typography>
                        <RtlTextField
                          onChange={handleSetValues}
                          name="variant_name"
                          variant="standard"
                          value={data.variant_name}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyItems: "center",
                        }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            ml: 2,
                            mt: 1,
                          }}
                        >
                          قیمت تنوع:
                        </Typography>
                        <RtlTextField
                          onChange={handleSetValues}
                          name="variant_price"
                          variant="standard"
                          value={data.variant_price}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyItems: "center",
                        }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            ml: 2,
                            mt: 1,
                          }}
                        >
                          درصد تخفیف:
                        </Typography>
                        <RtlTextField
                          onChange={handleSetValues}
                          name="variant_discount"
                          variant="standard"
                          value={data.variant_discount}
                        />
                      </Box>{" "}
                      <Box
                        sx={{
                          display: "flex",
                          justifyItems: "center",
                        }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            ml: 2,
                            mt: 1,
                          }}
                        >
                          مقدار موجودی:
                        </Typography>
                        <RtlTextField
                          onChange={handleSetValues}
                          name="variant_quantity"
                          variant="standard"
                          value={data.variant_quantity}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyItems: "center",
                        }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            ml: 2,
                            mt: 1,
                          }}
                        >
                          تعداد در بسته:
                        </Typography>
                        <RtlTextField
                          onChange={handleSetValues}
                          name="variant_stack"
                          variant="standard"
                          value={data.variant_stack}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            ml: 2,
                            mt: 1,
                          }}
                        >
                          ترتیب:
                        </Typography>
                        <RtlTextField
                          onChange={handleSetValues}
                          name="variant_sort"
                          variant="standard"
                          value={data.variant_sort}
                        />
                      </Box>
                    </>
                  ) : (
                    <>
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
                        قیمت به ریال:{variant.variant_price}
                      </Typography>
                      <Typography
                        sx={{
                          my: 1,
                        }}
                      >
                        {" "}
                        درصد تخفیف :{variant.variant_discount} درصد
                      </Typography>
                      <Typography
                        sx={{
                          my: 1,
                        }}
                      >
                        مقدار موجودی:{variant.variant_quantity}
                      </Typography>
                      <Typography
                        sx={{
                          my: 1,
                        }}
                      >
                        تعداد در بسته:{variant.variant_stack}
                      </Typography>

                      <Typography
                        sx={{
                          my: 1,
                        }}
                      >
                        ترتیب:{variant.variant_sort}
                      </Typography>

                      <Typography
                        sx={{
                          my: 1,
                        }}
                      >
                        وضعیت تنوع:{" "}
                        <span
                          style={{
                            color: variant.is_active ? "green" : "red",
                          }}
                        >
                          {" "}
                          {variant.is_active ? "فعال" : "غیر فعال"}
                        </span>{" "}
                      </Typography>
                    </>
                  )}

                  {edit.currentId == variant.variant_uuid ? (
                    <>
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
                            name="is_active"
                            onClick={() =>
                              changeActiveStatus(
                                variant.variant_uuid,
                                edit.currentId
                              )
                            }
                            value={data.is_active}
                            defaultChecked={data.is_active}
                            size="medium"
                            sx={{
                              mr: "-20px !important",
                            }}
                          />
                        }
                      />
                    </>
                  ) : (
                    <Box
                      sx={{
                        position: "relative",
                        mt: 3,
                      }}
                    >
                      <Typography
                        sx={{
                          display: "inline-block",
                        }}
                      >
                        {" "}
                        رنگ :{" "}
                      </Typography>
                      <div
                        style={{
                          display: "inline-block",
                          width: 28,
                          height: 28,
                          position: "absolute",
                          bottom: -1,
                          marginRight: 20,
                          backgroundColor: `${variant.variant_color}`,
                          borderRadius: "12px",
                        }}
                      ></div>{" "}
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })
        : ""}
    </Grid>
  );
}

export default ProductVariantList;
