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
} from "@mui/material";
import DropZone from "./DropZone";
import AddIcon from "@mui/icons-material/Add";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";

import { MuiColorInput } from "mui-color-input";

const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: 10,
  padding: 20,
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
function AddProductVariant({ product }) {
  const handleSetValues = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const setColorValue = (color) => {
    setData({
      color: color,
    });
  };
  const [data, setData] = useState({
    name: "",
    description: "",
    color: "",
    price: "",
    quantity: "",
    stack: "",
    discount: "",
  });

  return (
    <div>
      {" "}
      <Grid component={Item} container>
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
          <Button></Button>
          <RtlTextField
            onChange={handleSetValues}
            name="discount"
            size="small"
            fullWidth
            label="درصد تخفیف"
          />
        </Grid>

        <Grid
          sx={{ px: 1, fontFamily: "sans-serif !important" }}
          item
          xs={12}
          md={4}
        >
          <Box
            sx={{
              mb: 2,
            }}
          >
            رنگ انتخابی{" "}
          </Box>
          <MuiColorInput
            size="small"
            variant="outlined"
            sx={{
              width: "140px",
              fontFamily: "sans-serif !important",
            }}
            value={data.color}
            format="hex"
            onChange={setColorValue}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddProductVariant;
