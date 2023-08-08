import React from "react";
import DropZone from "../products/DropZone";
import { useState, useRef } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";

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
  });

  const handleGetFiles = (getFiles) => {
    setFiles(getFiles);
  };

  const handleEditorsContent = (event) => {
    if (event.target.targetElm.name == "description") {
      setData({ ...data, description: descRef.current.getContent() });
    }
  };

  const handleCreateBlog = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var formData = new FormData();
    formData.append("title", data.title);
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

          setData({ title: "", description: "" });
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
    <Grid container display={"flex"} justifyContent={"center"} spacing={2}>
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
        <DropZone getFiles={handleGetFiles} />
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
        <Button
          disabled={
            data.title == "" || data.description == "" || files.length == 0
          }
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
      </Grid>
    </Grid>
  );
}

export default NewBlog;
