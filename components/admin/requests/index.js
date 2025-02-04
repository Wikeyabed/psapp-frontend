import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AdminLayout from "./../layout/index";
import ContactList from "./ContactList";
import OrdersList from "./OrdersList";
import PartnershipList from "./PartnershipList";

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
        <Box sx={{ p: 3 }}>
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

export default function RequestTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AdminLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              display: "flex !important",
              justifyContent: "center",
            }}
          >
            <Tab label="همکاری" {...a11yProps(0)} />
            <Tab label="سفارش محصول" {...a11yProps(1)} />
            <Tab label="تماس با ما" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PartnershipList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <OrdersList />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <ContactList />
        </CustomTabPanel>
      </Box>
    </AdminLayout>
  );
}
