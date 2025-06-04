import React, { useState, useRef } from "react";
import DropZone from "../products/DropZone";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import styled from "@emotion/styled";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import ModalBox from "../layout/Modal";
import NewBlogCategory from "./NewBlogCategory";

const RtlTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
  direction: "rtl",
  textAlign: "right",
  "& label": {
    transformOrigin: "right",
    textAlign: "right",
    left: "inherit",
    right: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputBase-root": {
      fontSize: "0.875rem",
    },
    "& label": {
      fontSize: "0.875rem",
      right: "1rem",
    },
  },
}));

function NewBlog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const descRef = useRef(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    video_url: "",
    is_video: false,
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleGetFiles = (getFiles) => setFiles(getFiles);

  const handleEditorsContent = () => {
    setData({ ...data, description: descRef.current.getContent() });
  };

  const handleCreateBlog = () => {
    const myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("is_video", data.is_video);
    if (data.is_video) formData.append("video_url", data.video_url);
    formData.append("category", "");
    formData.append("description", data.description);
    files.forEach((file) => formData.append("images_url", file, file.name));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/add`, {
      method: "POST",
      headers: myHeaders,
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          dispatch(
            setNotificationOn({
              message: "بلاگ با موفقیت ایجاد شد",
              color: "success",
            })
          );
          setData({
            title: "",
            description: "",
            video_url: "",
            is_video: false,
          });
          setFiles([]);
        } else {
          throw new Error();
        }
      })
      .catch(() =>
        dispatch(
          setNotificationOn({ message: "مشکلی پیش آمده", color: "error" })
        )
      );
  };

  return (
    <Paper
      elevation={isMobile ? 0 : 3}
      sx={{
        p: isMobile ? 1.5 : 4,
        mt: isMobile ? 1 : 3,
        borderRadius: isMobile ? 0 : 4,
        backgroundColor: "#f9fafb",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h5"}
        fontWeight={700}
        mb={isMobile ? 2 : 4}
        textAlign="center"
        color="primary"
      >
        ایجاد بلاگ/ویدیو جدید
      </Typography>

      <Grid container spacing={isMobile ? 1 : 3}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            gap={1}
          >
            <FormControlLabel
              control={
                <Checkbox
                  size={isMobile ? "small" : "medium"}
                  checked={data.is_video}
                  onChange={(e) =>
                    setData({ ...data, is_video: e.target.checked })
                  }
                />
              }
              label={
                <Typography variant={isMobile ? "body2" : "body1"}>
                  آیا این یک ویدیو است؟
                </Typography>
              }
            />
            <Box width={isMobile ? "100%" : "auto"} mt={isMobile ? 1 : 0}>
              <ModalBox
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
                buttonText="دسته‌بندی‌ها"
                buttonVariant="outlined"
                buttonSize={isMobile ? "small" : "medium"}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <RtlTextField
            label="موضوع"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            size={isMobile ? "small" : "medium"}
          />
          <Typography variant="caption" color="textSecondary" mt={0.5}>
            - موضوع نباید تکراری باشد و حداکثر ۵۰ کاراکتر داشته باشد.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          {data.is_video ? (
            <>
              <RtlTextField
                label="لینک ویدیو آپارات"
                value={data.video_url}
                onChange={(e) =>
                  setData({ ...data, video_url: e.target.value })
                }
                size={isMobile ? "small" : "medium"}
              />
              <Typography variant="caption" color="textSecondary" mt={0.5}>
                - فقط قسمت آخر لینک (هایلایت شده) را وارد کنید:
              </Typography>
              <Box
                mt={0.5}
                fontSize={isMobile ? "0.75rem" : "0.875rem"}
                fontWeight="bold"
                color="green"
              >
                https://www.aparat.com/v/
                <span style={{ backgroundColor: "#bbf7d0" }}>vaak7uw</span>
              </Box>
            </>
          ) : (
            <DropZone getFiles={handleGetFiles} isMobile={isMobile} />
          )}
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              "& .tox-tinymce": {
                height: isMobile ? "250px !important" : "300px !important",
              },
            }}
          >
            <Editor
              onChange={handleEditorsContent}
              initialValue={data.description}
              textareaName="description"
              apiKey="your-api-key"
              onInit={(evt, editor) => (descRef.current = editor)}
              init={{
                height: isMobile ? 250 : 300,
                menubar: false,
                directionality: "rtl",
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family: 'Vazir', sans-serif; font-size: 14px; }",
                mobile: {
                  toolbar: "undo redo | bold italic | bullist numlist",
                  plugins: "autolink lists",
                },
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button
            disabled={
              data.title === "" ||
              data.description === "" ||
              (data.is_video && data.video_url === "")
            }
            onClick={handleCreateBlog}
            variant="contained"
            size={isMobile ? "medium" : "large"}
            fullWidth
            sx={{
              py: isMobile ? 1 : 1.5,
              mt: isMobile ? 3 : 5,
              fontSize: isMobile ? "0.875rem" : "1rem",
            }}
          >
            {data.is_video ? "ایجاد ویدیو جدید" : "ایجاد بلاگ جدید"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NewBlog;
