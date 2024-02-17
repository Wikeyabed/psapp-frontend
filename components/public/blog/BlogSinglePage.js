import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Divider, Grid } from "@mui/material";
import PublicLayout from "../layout/index";
import BlogNav from "./Breadcrumb";
import parse from "html-react-parser";
import ToPersianDate from "../../../src/TimestampToPersian";

export default function BlogSinglePage({ blog }) {
  return (
    <PublicLayout>
      <Grid display={"flex"} justifyContent={"center"} container>
        <Grid xs={12} md={10} lg={8} xl={6}>
          {" "}
          <BlogNav blogId={15} blogTitle={blog.title} />
          <Card sx={{ mx: "auto", my: 4 }}>
            <CardActionArea>
              <CardMedia
                sx={{
                  aspectRatio: "16/9",
                  objectFit: "contain",
                  maxHeight: 350,
                  minWidth: "100%",
                  mb: 10,
                }}
                component="img"
                image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${blog.images_url[0]}`}
                alt={blog.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {blog.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    justifyItems: "center",
                  }}
                  gutterBottom
                >
                  <Typography lineHeight={3} variant="caption">
                    تاریخ انتشار :
                  </Typography>{" "}
                  <ToPersianDate timestamp={blog.create_time} />
                </Box>

                {/* <Typography gutterBottom variant="h4" component="h4">
                  نویسنده : ادمین
                </Typography> */}
                <Divider />
                <Typography
                  textAlign={"justify"}
                  variant="body1"
                  color="text.primary"
                  component={"div"}
                >
                  {parse(blog.description)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
