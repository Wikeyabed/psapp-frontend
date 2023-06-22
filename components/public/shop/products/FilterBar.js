import { Grid, Box, Paper, TextField, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Scale } from "@mui/icons-material";
// Styled component for the text field with right-to-left direction and custom styles
const RtlTextField = styled(TextField)(({ theme }) => ({
  marginTop: 2,
  minWidth: "100%",
  direction: "rtl",
  border: "1px solid transparent",
  textAlign: "center !important",
  transform: "scale(.9)",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
    top: -5,
  },
  "& fieldset.MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover": {
    "& fieldset.MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  "&:focus": {
    "& fieldset.MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  "&:active": {
    "& fieldset.MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
}));
// Styled component for the select icon with custom styles
const SelectIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  position: "absolute",
  right: "90% !important",
}));
// Main component for the filter bar
function FilterBar() {
  return (
    <Grid container sx={{ marginBottom: 5 }}>
      {/* Empty grid item */}
      <Grid item lg={3}></Grid>
      {/* Grid item for product category select field */}
      <Grid item lg={2.5}>
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
      {/* Empty grid item */}
      <Grid item lg={1}></Grid>
      {/* Grid item for sorting select field */}
      <Grid item lg={2.5}>
        <RtlTextField
          SelectProps={{
            IconComponent: SelectIcon,
          }}
          select
          fullWidth
          label="مرتب سازی بر اساس"
        >
          <MenuItem value={"1"}>پربازدید ترین</MenuItem>
          <MenuItem value={"2"}>ارزانترین</MenuItem>
          <MenuItem value={"3"}>گرانترین</MenuItem>
        </RtlTextField>
      </Grid>
    </Grid>
  );
}
export default FilterBar;
