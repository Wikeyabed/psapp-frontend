import PublicLayout from "../layout/index";

import * as React from "react";
import PropTypes from "prop-types";

import {
  Grid,
  Box,
  Typography,
  Tab,
  Tabs,
  Paper,
  Divider,
} from "@mui/material";
import UserInvoices from "./userInvoices";
import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

function User() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <PublicLayout>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              borderRadius: "10px !important",
              minHeight: "800px",
            }}
            elevation={2}
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  orientation="horizontal"
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="اطلاعات کاربر" {...a11yProps(0)} />
                  <Tab label="تغییر رمز عبور" {...a11yProps(1)} />
                  <Tab label="مشاهده فاکتور ها" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserProfile hello="hello" />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ChangePassword />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <UserInvoices />
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2.25}></Grid>
      </Grid>
    </PublicLayout>
  );
}

export default User;
