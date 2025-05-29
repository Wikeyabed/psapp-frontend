import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import PublicLayout from "../layout";
import Link from "../../../src/Link";
import ToPersianDate from "../../../src/TimestampToPersian";
import parse from "html-react-parser";
import { Pagination } from "@mui/material";
import usePagination from "../../../src/usePagination";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../layout/navbar/SearchBar";
import Image from "next/image";

export default function AllBlogs({ blogPosts = [], video }) {
  const searchValue = useSelector((state) => state.product.search);

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  let [videos, setVideos] = useState([]);

  let filteredBlogList = [];

  if (video) {
    filteredBlogList = blogPosts.filter(
      (blog) => blog.is_video == true && blog.title.includes(searchValue)
    );
  } else {
    filteredBlogList = blogPosts.filter(
      (blog) => blog.is_video == false && blog.title.includes(searchValue)
    );
  }

  const _DATA = usePagination(filteredBlogList, PER_PAGE);
  const count = Math.ceil(filteredBlogList.length / PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <PublicLayout>
      <Container>
        <Box flexGrow={1}>
          <Typography variant="h4" component="h2" gutterBottom>
            {video ? "ویدیو ها " : " وبلاگ "}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            آخرین مطالب آموزشی ایباکس
          </Typography>
        </Box>
        <Box
          sx={{
            my: 5,
            maxWidth: "340px",
            mx: "auto",
          }}
        >
          <SearchBar />
        </Box>
        <Grid container spacing={6}>
          {filteredBlogList.length > 0
            ? _DATA.currentData().map((post, index) =>
                video ? (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card>
                      <CardMedia
                        sx={{ width: "100%", height: 200 }}
                        alt={post.title}
                      >
                        {" "}
                        <div
                          className="h_iframe-aparat_embed_frame"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <iframe
                            src={`https://www.aparat.com/video/video/embed/videohash/${post.video_url}/vt/frame`}
                            allowFullScreen="true"
                            style={{
                              width: "100%",
                              height: "100%",
                              border: 0,
                            }}
                          ></iframe>
                        </div>{" "}
                      </CardMedia>
                      {/*            
                        <CardMedia
                          component="img"
                          sx={{ width: "100%", height: 200 }}
                          image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${post.images_url[0]}`}
                          alt={post.title}
                        /> */}

                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent
                          sx={{
                            height: "70px !important",
                          }}
                        >
                          <Typography
                            component={Link}
                            href={`/blog/${post.id}`}
                            variant="h5"
                            sx={{
                              textDecoration: "none",

                              fontSize: 18,
                            }}
                          >
                            {post.title}
                          </Typography>
                          {/* <Typography variant="subtitle1" color="text.secondary">
                          {parse(post.description.slice(0, 30) + "...")}
                        </Typography> */}
                        </CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", p: 1 }}
                        >
                          {/* <Avatar alt={post.author} src={post.avatarUrl} /> */}
                          <Box
                            sx={{ ml: 1 }}
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            {/* <Typography variant="subtitle2">
                            {post.author}
                          </Typography> */}
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              <ToPersianDate timestamp={post.create_time} />
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Button
  component={Link}
  href={`/blog/${post.id}`}
  fullWidth
  variant="contained"
  sx={{
    height: 45,
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "1rem",
    bgcolor: "#6366f1",
    color: "#fff",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#4f46e5",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  }}
>
  ادامه خواندن
</Button>

                    </Card>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card>
                      {/* <CardMedia
                        sx={{ width: "100%", height: 200 }}
                        alt={post.title}
                      >
                        {" "}
                        <div
                          className="h_iframe-aparat_embed_frame"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <iframe
                            src={`https://www.aparat.com/video/video/embed/videohash/${post.video_url}/vt/frame`}
                            allowFullScreen="true"
                            style={{
                              width: "100%",
                              height: "100%",
                              border: 0,
                            }}
                          ></iframe>
                        </div>{" "}
                      </CardMedia> */}

                      {/* <CardMedia
                        component={Image}
                        width={500}
                        height={400}
                        sx={{ width: "100%", height: 200 }}
                        image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${post.images_url[0]}`}
                        alt={post.title}
                      /> */}

                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${post.images_url[0]}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt={post.title}
                        style={{ width: "100%", height: "auto" }} // optional
                      />

                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent
                          sx={{
                            height: "70px !important",
                          }}
                        >
                          <Typography
                            component={Link}
                            href={`/blog/${post.id}`}
                            variant="h5"
                            sx={{
                              textDecoration: "none",

                              fontSize: 18,
                            }}
                          >
                            {post.title}
                          </Typography>
                          {/* <Typography variant="subtitle1" color="text.secondary">
                          {parse(post.description.slice(0, 30) + "...")}
                        </Typography> */}
                        </CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", p: 1 }}
                        >
                          {/* <Avatar alt={post.author} src={post.avatarUrl} /> */}
                          <Box
                            sx={{ ml: 1 }}
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            {/* <Typography variant="subtitle2">
                            {post.author}
                          </Typography> */}
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              <ToPersianDate timestamp={post.create_time} />
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Button
                        component={Link}
                        href={`/blog/${post.id}`}
                        fullWidth
                        variant="contained"
                        sx={{
                          height: 45,
                          borderRadius: "12px",
                          fontWeight: 700,
                          fontSize: "1rem",
                          bgcolor: "#6366f1",
                          color: "#fff",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "#4f46e5",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        ادامه خواندن
                      </Button>
                    </Card>
                  </Grid>
                )
              )
            : "هیچ پستی وجود ندارد"}

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            item
            xs={12}
          >
            <Pagination
              color="standard"
              count={count}
              size="large"
              page={page}
              shape="rounded"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
}
