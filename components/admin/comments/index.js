import React from "react";
import AdminLayout from "../layout";
import ToPersianDate from "../../../src/TimestampToPersian";
import { Grid, Box, Typography, Paper } from "@mui/material";
import { CheckCircleRounded } from "@mui/icons-material";
import ConfirmComment from "./ConfirmComment";
import DeleteComment from "./DeleteComment";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "../../../src/Link";

function CommentList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setComments(result))
      .catch((error) => console.log("error", error));
  };

  console.log(comments);
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
              }}
            >
              نظرات
            </Typography>
            <Grid container>
              {comments.map((comment) => {
                return (
                  <Grid
                    key={comment.id}
                    item
                    sx={{
                      p: 1,
                    }}
                    xs={12}
                    md={6}
                  >
                    {" "}
                    <Paper
                      item
                      sx={{
                        bgcolor: "#f1f1f1",
                        position: "relative",
                        p: 2,
                      }}
                      key={comment.id}
                    >
                      <Typography
                        sx={{
                          mb: 2,
                        }}
                        variant="body2"
                      >
                        نوع کامنت:{" "}
                        {comment.is_reply == "true" ? "پاسخ" : "کامنت جدید"}
                      </Typography>
                      <Typography
                        sx={{
                          mb: 2,
                        }}
                        variant="body2"
                      >
                        کامنت مادر : {comment.parent_comment_id}
                      </Typography>

                      <Typography variant="body2">
                        نام کاربری : {comment.username}
                      </Typography>
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            mt: 0.5,
                          }}
                          variant="body2"
                        >
                          تاریخ صدور:
                        </Typography>
                        <ToPersianDate timestamp={comment.comment_date} />
                      </Box>
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            mt: 0.5,
                          }}
                          variant="body2"
                        >
                          تاریخ بروزرسانی:
                        </Typography>
                        <ToPersianDate timestamp={comment.update_date} />
                      </Box>
                      <Typography
                        sx={{
                          mb: 2,
                        }}
                        variant="body2"
                      >
                        شناسه : {comment.id}
                      </Typography>
                      <Box>
                        {" "}
                        <Typography
                          sx={{
                            mt: 0.5,
                            mb: 2,
                          }}
                          variant="body2"
                        >
                          محتویات :
                        </Typography>
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor: "#fff",
                            minHeight: 250,
                            MaxWidth: "100%",
                            borderRadius: 1,
                            border: "1px solid #ccc",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: "100%",
                              textAlign: "justify",
                            }}
                          >
                            {" "}
                            {comment.content}
                          </Typography>
                        </Box>
                        {comment.post_type == "product" ? (
                          <Link
                            style={{
                              MarginTop: 2,
                            }}
                            target="_blank"
                            href={`/products/${comment.post_id}`}
                          >
                            لینک صفحه
                          </Link>
                        ) : (
                          <Link
                            style={{
                              MarginTop: 2,
                            }}
                            target="_blank"
                            href={`/blog/${comment.post_id}`}
                          >
                            لینک صفحه
                          </Link>
                        )}
                      </Box>

                      <Box
                        sx={{
                          position: "absolute",
                          top: 3,
                          left: 3,
                        }}
                      >
                        <ConfirmComment
                          isActive={comment.is_active}
                          id={comment.id}
                          fetchComments={fetchComments}
                        />
                        <DeleteComment
                          id={comment.id}
                          fetchComments={fetchComments}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default CommentList;
