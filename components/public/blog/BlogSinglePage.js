import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Divider, Grid, Paper } from "@mui/material";
import PublicLayout from "../layout/index";
import BlogNav from "./Breadcrumb";
import parse from "html-react-parser";
import ToPersianDate from "../../../src/TimestampToPersian";
import Comments from "../comments";

export default function BlogSinglePage({ blog }) {
  return (
    <PublicLayout>
      <Grid display={"flex"} justifyContent={"center"} container>
        <Grid xs={12} md={10} lg={8}>
          <BlogNav blogId={15} blogTitle={blog.title} />
          <Box sx={{ mx: "auto", my: 4 }}>
            <Box
              sx={{
                border: "1px solid #e2e2e2",
                borderRadius: "5px",
                p: 2,
              }}
            >
              {blog.is_video ? (
                <CardMedia
                  sx={{
                    aspectRatio: "16/9",
                    objectFit: "contain",
                    maxHeight: 750,
                    minWidth: "100%",
                    mb: 10,
                  }}
                  alt={blog.title}
                >
                  <div
                    className="h_iframe-aparat_embed_frame"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <iframe
                      src={`https://www.aparat.com/video/video/embed/videohash/${blog.video_url}/vt/frame`}
                      allowFullScreen="true"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                    ></iframe>
                  </div>{" "}
                </CardMedia>
              ) : (
                <CardMedia
                  sx={{
                    aspectRatio: "16/9",
                    objectFit: "contain",
                    maxHeight: 750,
                    minWidth: "100%",
                    mb: 10,
                  }}
                  component="img"
                  image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${blog.images_url[0]}`}
                  alt={blog.title}
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
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
                  variant="body2"
                  color="text.primary"
                  component={"div"}
                >
                  {parse(blog.description)}
                </Typography>

                <Divider
                  sx={{
                    my: 5,
                  }}
                />
                <Typography
                  sx={{
                    my: 2,
                  }}
                  variant="h6"
                >
                  دیدگاه ها
                </Typography>
                <Comments postId={blog.id} postType={"blog"} />
              </CardContent>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
