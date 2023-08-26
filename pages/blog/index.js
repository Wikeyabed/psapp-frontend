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
import PublicLayout from "../../components/public/layout";
import Link from "../../src/Link";
import ToPersianDate from "../../src/TimestampToPersian";
import parse from "html-react-parser";
import Head from "next/head";
import { Pagination } from "@mui/material";
import usePagination from "../../src/usePagination";
import React, { useState } from "react";

export default function BlogSection({ blogPosts = [] }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const _DATA = usePagination(blogPosts, PER_PAGE);
  const count = Math.ceil(blogPosts.length / PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <PublicLayout>
      <Head>
        <title>ایباکس - بلاگ</title>
      </Head>
      <Container>
        <Box sx={{ my: 5, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            وبلاگ
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            آخرین مطالب آموزشی ایباکس
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {blogPosts.length > 0
            ? _DATA.currentData().map((post, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 200, height: 200 }}
                      image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${post.images_url[0]}`}
                      alt={post.title}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <Typography
                          component={Link}
                          href={`/blog/${post.id}`}
                          variant="h5"
                          sx={{
                            textDecoration: "none",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {parse(post.description.slice(0, 30) + "...")}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                        {/* <Avatar alt={post.author} src={post.avatarUrl} /> */}
                        <Box
                          sx={{ ml: 1 }}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Typography variant="subtitle2">
                            {post.author}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            <ToPersianDate timestamp={post.create_time} />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
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

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const blogPosts = await res.json();

  return {
    props: {
      blogPosts,
    },
  };
}
