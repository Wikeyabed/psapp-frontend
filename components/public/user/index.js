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
  useMediaQuery,
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
      {value === index && (
        <Box
          sx={{
            p: 3,
            backgroundColor: "#f8fafc",
            borderRadius: "0 0 12px 12px",
          }}
        >
          {children}
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
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

function User() {
  const [value, setValue] = React.useState(0);
  const isMobile = useMediaQuery("(max-width:50px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PublicLayout>
      <Grid
        container
        sx={{
          height: "100%",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e6f0f9 100%)",
          py: 4,
        }}
      >
        <Grid item xs={false} md={3} />
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              borderRadius: "12px !important",
              minHeight: "800px",
              boxShadow: "0 8px 32px rgba(99, 102, 241, 0.1)",
              overflow: "hidden",
              border: "1px solid rgba(99, 2, 241, 0.2)",
            }}
            elevation={0}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  backgroundColor: "#f9fafb",
                  borderBottom: 1,
                  borderColor: "divider",
                  borderRadius: "12px 12px 0 0",
                  px: 1,
                  overflowX: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons={false}
                  sx={{
                    minWidth: isMobile ? "400px" : "100%",
                    "& .MuiTab-root": {
                      fontSize: "0.875rem",
                      minHeight: "48px",
                      minWidth: "unset",
                      px: 1.5,
                      flex: 1,
                      color: "#000",
                      "&.Mui-selected": {
                        color: "#6366f1",
                        fontWeight: "bold",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#6366f1",
                      height: "3px",
                    },
                  }}
                >
                  <Tab label="اطلاعات کاربر" {...a11yProps(0)} />
                  <Tab label="تغییر رمز عبور" {...a11yProps(1)} />
                  <Tab label="سفارشات من" {...a11yProps(2)} />
                  <Tab label="دیدگاه‌ها" {...a11yProps(3)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <UserProfile />
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
          </Paper>
        </Grid>
        <Grid item xs={false} md={3} />
      </Grid>
    </PublicLayout>
  );
}

export default User;
