import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Link from "../../../src/Link";
import ToPersianDate from "../../../src/TimestampToPersian";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [blogs]);

  const fetchBlogs = () => {
    let myHeaders = new Headers();

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setBlogs(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <Grid container spacing={2}>
      <Grid
        sx={{
          px: 1,
          display: { xs: "none", md: "flex" },
        }}
        xs={12}
        item
        justifyContent={"space-between"}
      >
        <Typography variant="h6" color={"ActiveCaption"}>
          موضوع
        </Typography>
        <Typography variant="h6" color={"ActiveCaption"}>
          توضیحات
        </Typography>
        <Typography variant="h6" color={"ActiveCaption"}>
          تاریخ ایجاد
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: { xs: "none", md: "block" },
        }}
        item
        xs={12}
      >
        {" "}
        <Divider
          sx={{
            backgroundColor: "#444",
            height: 3,
          }}
        />
      </Grid>

      {blogs.map((blog) => {
        return (
          <Box component={Grid} item xs={12} key={blog.id}>
            <Grid
              sx={{
                display: { xs: "block", md: "flex" },
              }}
              item
              justifyContent={"space-between"}
            >
              <Link
                sx={{
                  textDecoration: "none",
                }}
                href={`/admin/blog/${blog.id}`}
              >
                <Typography>{blog.title}</Typography>
              </Link>
              <Typography variant="body2" color={"GrayText"}>
                {parse(blog.description.slice(0, 10) + " ... ")}
              </Typography>

              <ToPersianDate timestamp={blog.create_time} />
            </Grid>
            <Divider />
          </Box>
        );
      })}
    </Grid>
  );
}

export default BlogList;
