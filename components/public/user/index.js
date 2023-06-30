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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
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
        <Grid item xs={12} md={2.25}></Grid>
        <Grid item xs={12} md={7.5}>
          <Paper
            sx={{
              borderRadius: "10px !important",
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
                  <Tab label="پروفایل" {...a11yProps(0)} />
                  <Tab label="مشاهده فاکتور ها" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserProfile />
              </TabPanel>
              <TabPanel value={value} index={1}>
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
