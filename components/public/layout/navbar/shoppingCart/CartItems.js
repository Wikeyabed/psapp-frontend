import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { Badge, Divider, Paper } from "@mui/material";

const mapper = [1, 2, 3, 1];
export default function CartItems() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: { xs: "400px", md: "500px" },
        overflow: "hidden",
      }}
    >
      {mapper.map((i) => {
        return (
          <>
            <Card
              elevation={0}
              key={i}
              sx={{
                display: "flex",
                position: "relative",
                borderRadius: 0,
                borderBottom: "1px solid #ccc",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 140 }}
                image="/images/dog.jpg"
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    نام محصول{" "}
                    <Badge
                      sx={{ color: "#fff", padding: "10px" }}
                      badgeContent={`x${1}`}
                      color="info"
                    ></Badge>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                  >
                    تعداد کل : 500
                  </Typography>

                  <Typography
                    variant="body2"
                    color="secondary"
                    component="div"
                    sx={{
                      position: "absolute",
                      left: 10,
                      bottom: 25,
                    }}
                  >
                    مبلغ هر عدد : 4000
                  </Typography>

                  <Typography
                    variant="body2"
                    color="secondary"
                    component="div"
                    sx={{
                      position: "absolute",
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    مبلغ کل : 4000
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </>
        );
      })}

      <Box>
        <Typography
          variant="h5"
          sx={{
            direction: "ltr",
            textAlign: "center",
            mt: 2,
          }}
        >
          120000 : مبلغ نهایی
        </Typography>
      </Box>
    </Box>
  );
}
