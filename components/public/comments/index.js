import { useState, useEffect, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationOff } from "../../../redux/reducers/notificationSlice";
import { Typography, Grid, Box, Paper, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NewUserComment from "./NewUserComment";
import ReplyToComment from "./ReplyToComment";
import moment from "moment-jalaali";
import CommentList from "../../admin/comments";
export default function Comments({ postId, postType }) {
  const userData = useSelector((state) => state.auth.userInformation);
  const [commentsList, setCommentsList] = useState(null);

  useEffect(() => {
    getPostComments();
  }, []);

  moment.loadPersian({ usePersianDigits: true });

  const getPostComments = async () => {
    let myHeaders = new Headers();

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post-comment/${postId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCommentsList(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Grid container>
      <Grid item xs={12} md={9} lg={10}>
        {commentsList == "" ? (
          <Typography
            sx={{
              my: 2,
            }}
          >
            هنوز دیدگاهی ثبت نشده است .
          </Typography>
        ) : (
          ""
        )}

        {commentsList != null
          ? commentsList.map((comment) => {
              return comment.is_reply == "false" &&
                comment.is_active == "true" ? (
                <Paper
                  item
                  key={comment.id}
                  elevation={1}
                  component={Grid}
                  sx={{
                    backgroundColor: "#fefefe",
                    position: "relative",
                    pt: 5,
                    px: 2,
                    minHeight: 200,

                    mb: 1,
                    pb: 10,
                  }}
                >
                  {/* options */}
                  <Box
                    id="comment-options"
                    sx={{
                      position: "absolute",
                      left: 20,
                      top: 15,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "primary.main",
                      }}
                    >
                      {moment
                        .unix(comment.comment_date)
                        .format("jYYYY/jMM/jDD HH:mm")}
                    </Typography>
                  </Box>

                  {/* writing reply */}
                  <Box
                    id="comment-reply-box"
                    sx={{
                      position: "absolute",
                      left: 20,
                      bottom: 15,
                    }}
                  >
                    <ReplyToComment
                      postId={postId}
                      userName={`${userData.firstName} ${userData.lastName}`}
                      parentId={comment.id}
                      postType={postType}
                    />

                    {/* <Button
                    sx={{ borderRadius: 20 }}
                    size="small"
                    color="info"
                    variant="outlined"
                  >
                    <BorderColorIcon
                      sx={{
                        ml: 0.5,
                      }}
                      fontSize="small"
                    />
                    ویرایش{" "}
                  </Button> */}
                  </Box>

                  <Typography
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                    }}
                    component={"div"}
                    variant="body1"
                  >
                    <AccountCircleIcon
                      sx={{
                        ml: 1,
                      }}
                      color="secondary"
                      fontSize="large"
                    />
                    {comment.username} گفته:
                  </Typography>
                  <Typography
                    sx={{
                      mb: 3,
                      mr: 2,
                      color: "#666",
                      textAlign: "justify !important",
                    }}
                    variant="caption"
                  >
                    {comment.content}
                  </Typography>

                  {/* answer */}
                  {commentsList.map((reply) => {
                    return reply.is_reply == "true" &&
                      reply.parent_comment_id == comment.id &&
                      reply.is_active == "true" ? (
                      <Paper
                        key={reply.id}
                        elevation={1}
                        sx={{
                          width: "100%",
                          position: "relative",
                          minHeight: 150,
                          backgroundColor: "#fefefe",
                          // borderRadius: 5,
                          // border: "1px solid #efefef",
                          pt: 5,
                          pr: 1,
                          mb: 1,
                          mt: 2,
                          pb: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                          }}
                          component={"div"}
                          variant="body1"
                        >
                          <AccountCircleIcon
                            sx={{
                              ml: 1,
                            }}
                            color="secondary"
                            fontSize="large"
                          />
                          {reply.username} گفته:
                        </Typography>
                        <Box
                          id="comment-options"
                          sx={{
                            position: "absolute",
                            left: 20,
                            top: 15,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10,
                              color: "primary.main",
                            }}
                          >
                            {moment
                              .unix(reply.comment_date)
                              .format("jYYYY/jMM/jDD HH:mm")}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            mb: 3,
                            mr: 2,
                            color: "#666",
                            textAlign: "justify !important",
                          }}
                          variant="caption"
                        >
                          {reply.content}
                        </Typography>{" "}
                      </Paper>
                    ) : (
                      ""
                    );
                  })}
                </Paper>
              ) : (
                ""
              );
            })
          : ""}
      </Grid>
      <Grid
        xs={12}
        md={3}
        lg={2}
        sx={{
          pr: { xs: 0, md: 3 },
        }}
        item
      >
        <NewUserComment
          userName={`${userData.firstName} ${userData.lastName}`}
          postId={postId}
          postType={postType}
        />
      </Grid>
    </Grid>
  );
}
