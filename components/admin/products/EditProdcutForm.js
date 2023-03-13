import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
} from "@mui/material";
import DropZone from "./DropZone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: 10,
  padding: 20,
}));

const Card = styled(Grid)(({ theme }) => ({
  margin: "auto",
  backgroundColor: theme.palette.primary.lightBg,
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

const SelectIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  position: "absolute",
  right: "90% !important",
}));

const EnterProductId = ({ handleProductId }) => {
  return (
    <>
      <Grid sx={{ px: 1, mb: 6 }} item xs={12}>
        <RtlTextField fullWidth label="کد محصول" />
      </Grid>
      <Grid sx={{ px: 1 }} item xs={3}>
        <Button
          onClick={handleProductId}
          sx={{ p: 1 }}
          fullWidth
          variant="outlined"
        >
          تایید
        </Button>
      </Grid>
    </>
  );
};

const EditForm = () => {
  return (
    <>
      <Grid sx={{ px: 1 }} item xs={6}>
        <RtlTextField fullWidth label="نام محصول" />
        <RtlTextField
          SelectProps={{
            IconComponent: SelectIcon,
          }}
          select
          fullWidth
          label="دسته بندی محصول"
        >
          <MenuItem value={"1"}>item 1</MenuItem>
          <MenuItem value={"2"}>item 2</MenuItem>
          <MenuItem value={"3"}>item 3</MenuItem>
        </RtlTextField>
      </Grid>
      <Grid sx={{ px: 1 }} item xs={6}>
        <RtlTextField fullWidth label="کد محصول" />
        <RtlTextField
          SelectProps={{
            IconComponent: SelectIcon,
          }}
          select
          fullWidth
          label="دسته بندی محصول"
        >
          <MenuItem value={"1"}>item 1</MenuItem>
          <MenuItem value={"2"}>item 2</MenuItem>
          <MenuItem value={"3"}>item 3</MenuItem>
        </RtlTextField>
      </Grid>
      <Grid sx={{ px: 1, mb: 6 }} item xs={6}>
        <RtlTextField type="number" fullWidth label="مقدار عمده فروشی" />
      </Grid>
      <Grid sx={{ px: 1, mb: 6 }} item xs={6}>
        <RtlTextField fullWidth label="تعداد در هر بسته" />
      </Grid>
      <Grid sx={{ px: 1, mb: 6 }} item xs={12}>
        <RtlTextField fullWidth label="قیمت محصول" />
      </Grid>
      <Grid sx={{ px: 1, mb: 6 }} item xs={12}>
        <RtlTextField fullWidth label="درصد تخفیف" />
      </Grid>
      <Grid sx={{ px: 1, mb: 6 }} item xs={6}>
        <RtlTextField multiline rows={7} fullWidth label="توضیحات..." />
      </Grid>
      <Grid sx={{ mb: 6, mt: 0.5, px: 1 }} item xs={6}>
        <DropZone />
      </Grid>
      <Grid xs={6} item>
        <Button sx={{ p: 1 }} fullWidth variant="outlined">
          ایجاد محصول جدید
        </Button>
      </Grid>
    </>
  );
};

function EditProductForm() {
  const [productId, setProductId] = useState(false);

  const handleProductId = () => {
    setProductId(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component={FormControl} container spacing={2}>
        <Card item xs={12}>
          <Grid component={Item} container>
            {productId ? (
              <EditForm />
            ) : (
              <EnterProductId handleProductId={handleProductId} />
            )}
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}

export default EditProductForm;
