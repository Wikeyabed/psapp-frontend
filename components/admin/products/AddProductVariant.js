import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { setProductVariant } from "../../../redux/reducers/productSlice";
import { MuiColorInput } from "mui-color-input";
import ProductVariantList from "./ProductVariantList";

// استایل‌های سفارشی با پالت رنگی جدید
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  background: "#ffffff",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const FormHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
  color: "#6366f1",
  fontWeight: 700,
  fontSize: "1.5rem",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1.25rem",
  },
}));

const ProductInfoBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
  borderRadius: "12px",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  border: "1px solid rgba(99, 102, 241, 0.2)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    '& fieldset': {
      borderColor: "#e2e8f0",
    },
    '&:hover fieldset': {
      borderColor: "#cbd5e1",
    },
    '&.Mui-focused fieldset': {
      borderColor: "#6366f1",
    },
  },
  '& .MuiInputLabel-root': {
    right: 0,
    left: 'auto',
    transformOrigin: 'right',
    color: "#64748b",
    fontSize: "0.875rem",
    paddingLeft: "8px", // اضافه کردن padding برای جلوگیری از بریده شدن متن
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(-12px, -9px) scale(0.75)',
    backgroundColor: "#f8fafc",
    padding: "0 4px",
  },
  '& .MuiInputBase-input': {
    textAlign: "right",
    padding: "12px 14px",
  },
}));

const ColorPickerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  '& .MuiTypography-root': {
    color: "#334155",
    fontWeight: 500,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px 24px",
  fontSize: "1rem",
  fontWeight: 600,
  background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
  color: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  minHeight: "48px",
  '&:hover': {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
    background: "linear-gradient(135deg, #5658d1 0%, #05a5c0 100%)",
  },
  '&:disabled': {
    background: "#e2e8f0",
    color: "#94a3b8",
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
}));

const SectionDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  borderColor: "#e2e8f0",
  borderWidth: "1px",
}));

const ActiveCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#6366f1 !important",
  '&.Mui-checked': {
    color: "#6366f1 !important",
  },
}));

function AddProductVariant({ product }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const productVariants = useSelector((state) => state.product.productVariants);

  const [data, setData] = useState({
    name: "",
    color: "",
    price: "",
    quantity: "",
    stack: "",
    discount: "",
    isActive: true,
    sort: "",
  });

  useEffect(() => {
    getProductVariants(product.product_id);
  }, []);

  const getProductVariants = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products-variant/${id}`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch(setProductVariant(result));
      })
      .catch((error) => console.log("error", error));
  };

  const handleSetValues = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const changeActiveStatus = () => {
    setData({ ...data, isActive: !data.isActive });
  };

  const setColorValue = (color) => {
    setData({ ...data, color });
  };

  const handleCreateVariant = async () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    const urlencoded = new URLSearchParams();
    urlencoded.append("variant_name", data.name);
    urlencoded.append("variant_stack", data.stack * 1);
    urlencoded.append("variant_quantity", data.quantity * 1);
    urlencoded.append("variant_color", data.color);
    urlencoded.append("variant_price", data.price * 1);
    urlencoded.append("variant_discount", data.discount * 1);
    urlencoded.append("is_active", data.isActive);
    urlencoded.append("variant_sort", data.sort * 1);
    urlencoded.append("variant_product_id", product.product_id);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products-variant/add`, {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      });
      const result = await response.json();
      getProductVariants(product.product_id);
      setData({
        name: "",
        color: "",
        price: "",
        quantity: "",
        stack: "",
        discount: "",
        isActive: true,
        sort: "",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <FormContainer elevation={0}>
      <FormHeader variant="h1">افزودن تنوع محصول</FormHeader>
      
      <ProductInfoBox>
        <Typography variant="h6" gutterBottom sx={{ color: "#334155", fontWeight: 600 }}>
          نام محصول: {product.product_name}
        </Typography>
        <Typography variant="h6" sx={{ color: "#334155", fontWeight: 600 }}>
          کد محصول: {product.product_id}
        </Typography>
      </ProductInfoBox>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledTextField
            onChange={handleSetValues}
            name="name"
            size="medium"
            fullWidth
            label="نام تنوع"
            value={data.name}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledTextField
            onChange={handleSetValues}
            name="price"
            size="medium"
            fullWidth
            label="قیمت تنوع (ریال)"
            value={data.price}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledTextField
            onChange={handleSetValues}
            name="discount"
            size="medium"
            fullWidth
            label="درصد تخفیف"
            value={data.discount}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledTextField
            onChange={handleSetValues}
            name="quantity"
            size="medium"
            fullWidth
            label="مقدار موجودی"
            value={data.quantity}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledTextField
            onChange={handleSetValues}
            name="stack"
            size="medium"
            fullWidth
            label="تعداد در بسته"
            value={data.stack}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledTextField
            onChange={handleSetValues}
            name="sort"
            size="medium"
            fullWidth
            label="ترتیب نمایش"
            value={data.sort}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ColorPickerContainer>
            <Typography variant="subtitle1">رنگ محصول</Typography>
            <MuiColorInput
              size="small"
              variant="outlined"
              sx={{ 
                width: isMobile ? "100%" : 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: "12px",
                },
              }}
              value={data.color}
              format="hex"
              onChange={setColorValue}
            />
          </ColorPickerContainer>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <ActiveCheckbox
                checked={data.isActive}
                onChange={changeActiveStatus}
              />
            }
            label="فعال بودن تنوع"
            sx={{ '& .MuiTypography-root': { color: "#334155" } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <SubmitButton
              onClick={handleCreateVariant}
              variant="contained"
              startIcon={<AddIcon />}
              disabled={!data.name || !data.price}
            >
              افزودن تنوع جدید
            </SubmitButton>
          </Box>
        </Grid>
      </Grid>

      <SectionDivider />

      <ProductVariantList variants={productVariants} />
    </FormContainer>
  );
}

export default AddProductVariant;