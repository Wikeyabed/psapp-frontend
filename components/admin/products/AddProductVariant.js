import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  Typography,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DropZone from "./DropZone";
import AddIcon from "@mui/icons-material/Add";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import { setProductVariant } from "../../../redux/reducers/productSlice";

import { useSelector } from "react-redux";

import { MuiColorInput } from "mui-color-input";
import ProductVariantList from "./ProductVariantList";

const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: 10,
  padding: 20,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
  margin: "auto",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderRadius: "50%",
  opacity: "0.5",
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginTop: 2,
  marginBottom: 5,
  minWidth: "100%",
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
function  AddProductVariant({ product }) {
  const productVariants = useSelector((state) => state.product.productVariants);

  const dispatch = useDispatch();
  const handleSetValues = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  const changeActiveStatus = () => {
    setData({ ...data, isActive: !data.isActive });
    console.log(data.isActive);
  };

  const setColorValue = (color) => {
    setData({
      ...data,
      color: color,
    });
  };
  const [data, setData] = useState({
    name: "",
    color: "",
    price: "",
    quantity: "",
    stack: "",
    discount: "",
    isActive: true,
  });

  useEffect(() => {
    getProductVariants(product.product_id);
  }, []);

  const getProductVariants = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products-variant/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("all the variant for this id ", result);
        dispatch(setProductVariant(result));
      })
      .catch((error) => console.log("error", error));
  };

  const handleCreateVariant = async () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var urlencoded = new URLSearchParams();
    urlencoded.append("variant_name", data.name);
    urlencoded.append("variant_stack", data.stack * 1);
    urlencoded.append("variant_quantity", data.quantity * 1);
    urlencoded.append("variant_color", data.color);
    urlencoded.append("variant_price", data.price * 1);
    urlencoded.append("variant_discount", data.discount * 1);
    urlencoded.append("is_active", data.isActive);
    urlencoded.append("variant_product_id", product.product_id);

    console.log(urlencoded);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products-variant/add`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getProductVariants(product.product_id);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {" "}
      <Grid component={Item} container>
        <Grid xs={12}>
          {" "}
          <Typography
            variant="h4"
            sx={{
              p: 1,
              my: 2,
              textAlign: "center",
            }}
          >
            اضافه کردن تنوع{" "}
          </Typography>
        </Grid>
        <Grid
          sx={{
            my: 4,
          }}
          xs={12}
        >
          <Typography variant="h6">
            {" "}
            نام محصول : {product.product_name}
          </Typography>
          <Typography variant="h6"> کد محصول : {product.product_id}</Typography>
        </Grid>
        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="name"
            size="small"
            fullWidth
            label="نام تنوع"
          />
        </Grid>
        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="price"
            size="small"
            fullWidth
            label=" قیمت تنوع به ریال"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="discount"
            size="small"
            fullWidth
            label="درصد تخفیف"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="quantity"
            size="small"
            fullWidth
            label="مقدار موجودی"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="stack"
            size="small"
            fullWidth
            label="تعداد در بسته"
          />
        </Grid>

        <Grid sx={{ px: 1, fontFamily: "sans-serif !important" }} item xs={12}>
          <Box
            sx={{
              mt: 3,
              mb: 1,
            }}
          >
            رنگ انتخابی
          </Box>
          <MuiColorInput
            size="small"
            variant="outlined"
            sx={{
              width: "140px",
              direction: "rtl !important",
            }}
            value={data.color}
            format="hex"
            onChange={setColorValue}
          />
        </Grid>

        <Grid
          sx={{
            mt: 4,
          }}
          item
          xs={12}
        >
          {" "}
          <FormControlLabel
            label={<Typography variant="body2">فعال سازی محصول</Typography>}
            sx={{
              lineHeight: 1,
            }}
            control={
              <Checkbox
                name="isActive"
                onClick={changeActiveStatus}
                defaultChecked={data.isActive}
                size="medium"
                sx={{
                  mr: "-16px !important",
                }}
              />
            }
          />
        </Grid>

        <Grid sx={{ px: 1, mx: "auto", mb: 12 }} xs={12} item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Button
              onClick={handleCreateVariant}
              sx={{
                p: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "primary.main",
                borderRadius: "8px",
                transition: ".2s ease-in-out",
                "& .MuiButton-startIcon": {
                  marginLeft: "12px",
                  fontSize: "148px",
                },
              }}
              endIcon={
                <AddIcon
                  sx={{
                    marginRight: 1,
                  }}
                />
              }
              variant="contained"
            >
              اضافه کردن تنوع
            </Button>
          </Box>
          <StyledDivider sx={{ mt: 4 }} />
        </Grid>
        <ProductVariantList variants={productVariants} />
      </Grid>
    </div>
  );
}

export default AddProductVariant;
