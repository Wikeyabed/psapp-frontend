import React from "react";
import DropZone from "../products/DropZone";
import { useState, useRef } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import ModalBox from "../layout/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NewBlogCategory from "./NewBlogCategory";
const RtlTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 5,
  minWidth: "100%",
  direction: "rtl",
  textAlign: "center !important",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
  },
}));

function NewBlog() {
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleGetFiles = (getFiles) => {
    setFiles(getFiles);
  };

  const handleEditorsContent = (event) => {
    if (event.target.targetElm.name == "description") {
      console.log(data);
      setData({ ...data, description: descRef.current.getContent() });
    }
  };

  const handleCreateBlog = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var formData = new FormData();
    formData.append("title", data.title);
    formData.append("is_video", data.is_video);
    if (data.is_video) {
      formData.append("video_url", data.video_url);
    }

    formData.append("category", "");
    formData.append("description", data.description);

    for (let i = 0; i < files.length; i++) {
      formData.append("images_url", files[i], files[i].name);
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/add`, requestOptions)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
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
          dispatch(
            setNotificationOn({
              message: "مشکلی پیش آمده",
              color: "error",
            })
          );
        }
      })

      .catch((error) => {
        dispatch(
          setNotificationOn({
            message: "مشکلی پیش آمده",
            color: "error",
          })
        );
      });
  };

  return (
    <>
      {" "}
      <Typography sx={{ mb: 4 }} variant="h5">
        ایجاد بلاگ/ویدیو جدید
      </Typography>
      <FormControlLabel
        sx={{
          mb: 4,
          mr: -1,
        }}
        control={
          <Checkbox
            onChange={(e) => setData({ ...data, is_video: e.target.checked })}
          />
        }
        label="آیا این  یک ویدیو است ؟"
      />
      <Grid container display={"flex"} justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <ModalBox
            open={open}
            buttonVariant={"contained"}
            handleClose={handleClose}
            handleOpen={handleOpen}
            buttonText={"دسته بندی ها"}
          >
            <NewBlogCategory />
          </ModalBox>
        </Grid>
        <Grid xs={12} item md={6}>
          <RtlTextField
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            label="موضوع"
          />

          <Typography
            color={"GrayText"}
            sx={{
              mt: 2,
            }}
            variant="body2"
          >
            - موضوع بلاگ تکراری نباشد.
          </Typography>

          <Typography
            color={"GrayText"}
            sx={{
              mt: 2,
            }}
            variant="body2"
          >
            - طول موضوع بلاگ بیشتر از 50 کاراکتر نباشد
          </Typography>
        </Grid>

        <Grid xs={12} md={6} item>
          {" "}
          {data.is_video ? (
            <>
              <RtlTextField
                value={data.video_url}
                onChange={(e) =>
                  setData({ ...data, video_url: e.target.value })
                }
                label="لینک ویدیو آپارات"
              />
              <Typography
                color={"GrayText"}
                sx={{
                  mt: 2,
                }}
                variant="body2"
              >
                -منظور از لینک ویدیو فقط قسمت هایلایت شده می باشد
              </Typography>

              <Typography
                color={"GrayText"}
                sx={{
                  mt: 2,
                }}
                variant="body2"
                component={"div"}
              >
                https://www.aparat.com/v/
                <span
                  style={{
                    backgroundColor: "lightgreen",
                  }}
                >
                  vaak7uw
                </span>{" "}
              </Typography>
            </>
          ) : (
            <DropZone getFiles={handleGetFiles} />
          )}
        </Grid>

        <Grid xs={12} item>
          <Editor
            onChange={handleEditorsContent}
            initialValue={data.description}
            textareaName="description"
            apiKey="7qyd7k9r3z7f7roupl2xy42gbsmv5k1dx2sbpn9r8irpruh5"
            onInit={(evt, editor) => (descRef.current = editor)}
            init={{
              height: 300,
              menubar: false,
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
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
            }}
          />{" "}
        </Grid>
        <Grid xs={12} md={6} item>
          {data.is_video ? (
            <Button
              disabled={
                data.title == "" ||
                data.description == "" ||
                data.video_url == ""
              }
              sx={{
                my: 10,
              }}
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCreateBlog}
            >
              ایجاد ویدیو جدید
            </Button>
          ) : (
            <Button
              disabled={data.title == "" || data.description == ""}
              sx={{
                my: 10,
              }}
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCreateBlog}
            >
              ایجاد بلاگ جدید
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default NewBlog;
