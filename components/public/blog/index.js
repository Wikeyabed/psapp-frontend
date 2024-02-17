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

export default function AllBlogs({ blogPosts = [] }) {
  const searchValue = useSelector((state) => state.product.search);

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filteredBlogList = blogPosts.filter((blog) =>
    blog.title.includes(searchValue)
  );

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
            وبلاگ
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
            ? _DATA.currentData().map((post, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{ width: "100%", height: 200 }}
                      image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${post.images_url[0]}`}
                      alt={post.title}
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
                      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
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
                    >
                      ادامه خواندن
                    </Button>
                  </Card>
                </Grid>
              ))
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
