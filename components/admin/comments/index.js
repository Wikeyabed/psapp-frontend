import React from "react";
import AdminLayout from "../layout";
import ToPersianDate from "../../../src/TimestampToPersian";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
  Divider,
  Button,
  Collapse,
} from "@mui/material";
import {
  CheckCircleRounded,
  Comment,
  Reply,
  Article,
  ShoppingBag,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import ConfirmComment from "./ConfirmComment";
import DeleteComment from "./DeleteComment";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "../../../src/Link";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState({});

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
      .then((result) => {
        const sortedComments = result.sort(
          (a, b) => b.comment_date - a.comment_date
        );
        setComments(sortedComments);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // گروه‌بندی نظرات و پاسخ‌ها
  const groupComments = () => {
    const parentComments = comments.filter(
      (comment) =>
        comment.parent_comment_id === null ||
        comment.parent_comment_id === "null"
    );
    const replies = comments.filter(
      (comment) =>
        comment.parent_comment_id !== null &&
        comment.parent_comment_id !== "null"
    );

    return parentComments.map((parent) => ({
      ...parent,
      replies: replies.filter((reply) => reply.parent_comment_id === parent.id),
    }));
  };

  const groupedComments = groupComments();

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress sx={{ color: "#6366f1" }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#6366f1",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Comment sx={{ fontSize: "1.8rem" }} />
          مدیریت نظرات
        </Typography>

        <Grid container spacing={2}>
          {groupedComments.map((parent) => (
            <Grid item xs={12} key={parent.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "0 2px 10px rgba(99, 102, 241, 0.1)",
                  border: `1px solid ${
                    parent.is_active === "true" ? "#06b6d4" : "#e5e7eb"
                  }`,
                }}
              >
                {/* نظر اصلی */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#6366f1",
                      color: "white",
                      width: 36,
                      height: 36,
                    }}
                  >
                    <Comment />
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {parent.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <ToPersianDate timestamp={parent.comment_date} />
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <ConfirmComment
                      isActive={parent.is_active}
                      id={parent.id}
                      fetchComments={fetchComments}
                      size="small"
                    />
                    <DeleteComment
                      id={parent.id}
                      fetchComments={fetchComments}
                      size="small"
                    />
                  </Box>
                </Box>

                {/* محتوای نظر اصلی */}
                <Box
                  sx={{
                    p: 1.5,
                    mb: 1.5,
                    bgcolor: "#f8fafc",
                    borderRadius: 1,
                    borderLeft: "3px solid #6366f1",
                  }}
                >
                  <Typography variant="body2" sx={{ textAlign: "justify" }}>
                    {parent.content}
                  </Typography>
                </Box>

                {/* اطلاعات مطلب */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    bgcolor: "#f1f5f9",
                    borderRadius: 1,
                    mb: 1.5,
                  }}
                >
                  {parent.post_type === "product" ? (
                    <ShoppingBag sx={{ color: "#6366f1", fontSize: "1rem" }} />
                  ) : (
                    <Article sx={{ color: "#6366f1", fontSize: "1rem" }} />
                  )}
                  <Link
                    href={
                      parent.post_type === "product"
                        ? `/products/${parent.post_id}`
                        : `/blog/${parent.post_id}`
                    }
                    target="_blank"
                    style={{
                      color: "#6366f1",
                      fontWeight: 500,
                      textDecoration: "none",
                      fontSize: "0.8rem",
                    }}
                  >
                    مشاهده مطلب
                  </Link>
                </Box>

                {/* پاسخ‌ها */}
                {parent.replies.length > 0 && (
                  <Box>
                    <Button
                      size="small"
                      startIcon={
                        expandedComments[parent.id] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      }
                      onClick={() => toggleReplies(parent.id)}
                      sx={{
                        color: "#06b6d4",
                        fontSize: "0.75rem",
                        mb: 1,
                      }}
                    >
                      {expandedComments[parent.id]
                        ? "بستن پاسخ‌ها"
                        : `نمایش ${parent.replies.length} پاسخ`}
                    </Button>

                    <Collapse in={expandedComments[parent.id]}>
                      <Box sx={{ pl: 3, borderLeft: "2px dashed #e2e8f0" }}>
                        {parent.replies.map((reply) => (
                          <Box
                            key={reply.id}
                            sx={{
                              mb: 2,
                              p: 1.5,
                              bgcolor: "#f9fafb",
                              borderRadius: 1,
                              border: `1px solid ${
                                reply.is_active === "true"
                                  ? "#06b6d4"
                                  : "#e5e7eb"
                              }`,
                            }}
                          >
                            {/* هدر پاسخ */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                mb: 1,
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: "#06b6d4",
                                  color: "white",
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                <Reply />
                              </Avatar>

                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight="bold"
                                >
                                  {reply.username}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  <ToPersianDate
                                    timestamp={reply.comment_date}
                                  />
                                </Typography>
                              </Box>

                              <Box sx={{ display: "flex", gap: 0.5 }}>
                                <ConfirmComment
                                  isActive={reply.is_active}
                                  id={reply.id}
                                  fetchComments={fetchComments}
                                  size="small"
                                />
                                <DeleteComment
                                  id={reply.id}
                                  fetchComments={fetchComments}
                                  size="small"
                                />
                              </Box>
                            </Box>

                            {/* محتوای پاسخ */}
                            <Box
                              sx={{
                                p: 1,
                                bgcolor: "white",
                                borderRadius: 1,
                                borderLeft: "3px solid #06b6d4",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  textAlign: "justify",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {reply.content}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default CommentList;
