import parse from "html-react-parser";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Comments from "../../comments";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2, px: 2 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BottomTabs({ description, postId }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: { xs: 0, md: 1 }, minHeight: "280px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab
            sx={{
              fontSize: value == 0 ? 16 : 12,
              border: value == 0 ? "1px solid #ccc" : "none",
              borderTopRightRadius: "20px",
              backgroundColor: value == 0 ? "#eee" : "#fff",
            }}
            label="دیدگاه ها"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontSize: value == 1 ? 16 : 12,
              border: value == 1 ? "1px solid #ccc" : "none",
              borderTopLeftRadius: "20px",
              backgroundColor: value == 1 ? "#eee" : "#fff",
            }}
            label="توضیحات"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Comments postId={postId} postType={"product"} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {" "}
        {parse(description)}
      </CustomTabPanel>
    </Box>
  );
}
