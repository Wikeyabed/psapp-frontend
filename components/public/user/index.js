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
import UserOrders from "./UserOrders";
import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";
import UserComments from "./UserComments";

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
      {value === index && <Box>{children}</Box>}
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
          <Grid
            sx={{
              borderRadius: "10px !important",
              minHeight: "800px",
            }}
            elevation={2}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "primary.main",
                  borderRadius: "10px",
                  px: 2,
                }}
              >
                <Tabs
                  orientation="horizontal"
                  value={value}
                  onChange={handleChange}
                  aria-label="eebox"
                  variant="fullWidth"
                >
                  <Tab label="اطلاعات کاربر" {...a11yProps(0)} />
                  <Tab label="تغییر رمز عبور" {...a11yProps(1)} />
                  <Tab label="مشاهده فاکتور ها" {...a11yProps(2)} />
                  <Tab label="دیدگاه ها" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserProfile hello="hello" />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ChangePassword />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <UserOrders />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <UserComments />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2.25}></Grid>
      </Grid>
    </PublicLayout>
  );
}

export default User;
