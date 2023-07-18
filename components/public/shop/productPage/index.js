import { Paper, Grid, Button, Typography, Divider, Box } from "@mui/material";

import Slider from "./Slider";
import CircularProgress from "@mui/material/CircularProgress";
import AlertBar from "../products/AlertBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BottomTabs from "./BottomTabs";
import SmallDescription from "./SmallDescription";
import PriceBox from "./PriceBox";
import { useState, useEffect } from "react";

import Quantity from "./Quantity";

const ProductPage = ({ product }) => {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAlertOpen = () => {
    setAlert(true);
    handleLoading();
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
    return () => {};
  }, [alert]);
  return (
    <>
      <Grid container display={"flex"} justifyContent={"center"} spacing={3}>
        <AlertBar openAlert={alert} />

        {/* <Grid item xs={false} md={2} lg={2.5}></Grid> */}
        <Grid
          sx={{
            p: { xs: 2, md: 0 },
          }}
          item
          xs={12}
          md={8}
          lg={8}
        >
          <Paper
            elevation={7}
            sx={{
              padding: { xs: 0, md: 4 },

              marginY: { xs: 2, sm: 5, md: 10 },

              borderRadius: "20px",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  padding: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Slider images={product.images_url} />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  position: "relative",
                  padding: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "35px",
                    paddingBottom: 5,
                    fontWeight: "bold",
                  }}
                >
                  {product.product_name}
                </Typography>

                <SmallDescription desc={product.product_features.split("-")} />
                <Divider />
                <Quantity discount={product.discount} price={product.price} />

                <Box
                  sx={{
                    mt: { xs: 2 },
                  }}
                >
                  <Button
                    disabled={loading}
                    onClick={handleAlertOpen}
                    sx={{
                      paddingLeft: 5,
                      marginRight: "auto",
                      borderRadius: "10px",
                      backgroundColor: "#274060",

                      border: `2px solid ${loading ? "#ccc" : "#1B2845"} `,
                      borderBottom: `4px solid ${loading ? "#999" : "#1B2845"}`,
                    }}
                    size="large"
                    color="secondary"
                    fullWidth
                    variant="contained"
                    startIcon={
                      loading ? "" : <AddShoppingCartIcon sx={{ ml: 2 }} />
                    }
                  >
                    {loading ? (
                      <CircularProgress
                        size={26.3}
                        sx={{
                          color: "#999",
                        }}
                      />
                    ) : (
                      "اضافه کردن به سبد خرید"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <BottomTabs description={product.product_description} />
            </Grid>
          </Paper>
        </Grid>
        {/* <Grid item xs={false} md={2} lg={2.5}></Grid> */}
      </Grid>
    </>
  );
};
export default ProductPage;
