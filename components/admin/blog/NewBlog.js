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
  minWidth: "100%",
  direction: "rtl",
  textAlign: "right",
  "& label": {
    transformOrigin: "right",
    textAlign: "right",
    left: "inherit",
    right: "1.5rem",
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
      elevation={3}
      sx={{
        p: isMobile ? 2 : 4,
        mt: 3,
        borderRadius: 4,
        backgroundColor: "#f9fafb",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={4}
        textAlign="center"
        color="primary"
      >
        ایجاد بلاگ/ویدیو جدید
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            gap={2}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.is_video}
                  onChange={(e) =>
                    setData({ ...data, is_video: e.target.checked })
                  }
                />
              }
              label="آیا این یک ویدیو است؟"
            />
            <ModalBox
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
              buttonText="دسته‌بندی‌ها"
              buttonVariant="outlined"
            >
              <NewBlogCategory />
            </ModalBox>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <RtlTextField
            label="موضوع"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <Typography variant="body2" color="textSecondary" mt={1}>
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
              />
              <Typography variant="body2" color="textSecondary" mt={1}>
                - فقط قسمت آخر لینک (هایلایت شده) را وارد کنید:
              </Typography>
              <Box mt={1} fontWeight="bold" color="green">
                https://www.aparat.com/v/
                <span style={{ backgroundColor: "#bbf7d0" }}>vaak7uw</span>
              </Box>
            </>
          ) : (
            <DropZone getFiles={handleGetFiles} />
          )}
        </Grid>

        <Grid item xs={12}>
          <Editor
            onChange={handleEditorsContent}
            initialValue={data.description}
            textareaName="description"
            apiKey="your-api-key"
            onInit={(evt, editor) => (descRef.current = editor)}
            init={{
              height: 300,
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
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} mx="auto">
          <Button
            disabled={
              data.title === "" ||
              data.description === "" ||
              (data.is_video && data.video_url === "")
            }
            onClick={handleCreateBlog}
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.5, mt: 5 }}
          >
            {data.is_video ? "ایجاد ویدیو جدید" : "ایجاد بلاگ جدید"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NewBlog;
