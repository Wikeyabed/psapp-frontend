"use client";
import {
  Box,
  Grid,
  FormControl,
  Typography,
  Divider,
  TextField,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  setNotificationOff,
  setNotificationOn,
} from "../../../redux/reducers/notificationSlice";
import DropZone from "./DropZone";

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "20%",
  margin: "auto",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderRadius: "50%",
  opacity: "0.5",
}));
const ListItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: 12,
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.text.secondary,
  borderRadius: "10px",
}));

const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: 10,
  padding: 20,
}));

const RtlTextField = styled(TextField)(({ theme }) => ({
  padding: 2,
  marginTop: 2,
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

function AddCategoryForm({ cats }) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState(null);
  const [categories, setCategories] = useState(cats);
  const [data, setData] = useState({
    category_name: "",
    parent_category_id: null,
    sort_order: 0,
  });

  useEffect(() => {
    return async () => {
      await fetchCategories();
    };
  }, [categories]);

  const fetchCategories = async () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCategories(result))
      .catch((error) => console.log("error", error));

    console.log("category", categories);
  };

  const handleNewCategory = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    var formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("parent_category_id", data.parent_category_id);
    formData.append("sort_order", data.sort_order);
    formData.append("category_description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("images_url", files[i], files[i].name);
    }

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchCategories();
        dispatch(
          setNotificationOn({
            message: "دسته بندی جدید اضافه شد",
            color: "success",
          })
        );
      })
      .catch((error) => console.log("error", error));
  };

  const handleDeleteCategory = (id) => {
    let myHeaders = new Headers();

    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        fetchCategories();
        dispatch(
          setNotificationOn({
            message: "دسته بندی مورد نظر حذف شد",
            color: "warning",
          })
        );
      })
      .catch((error) => console.log("error", error));
  };

  const handleGetFiles = (getFiles) => {
    setFiles(getFiles);
    console.log("filessss", files);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid component={FormControl} container spacing={2}>
          <Grid container display={"flex"} justifyContent={"center"} xs={12}>
            <Grid xs={12} lg={6} item>
              <Typography
                variant="h6"
                sx={{
                  p: 1,
                  textAlign: "center",
                }}
              >
                دسته بندی جدید
              </Typography>
              <StyledDivider />
              <Grid container component={Item}>
                <Grid
                  sx={{
                    margin: "auto",
                  }}
                  xs={12}
                  item
                >
                  <RtlTextField
                    name="category_name"
                    onChange={(e) => {
                      setData({ ...data, [e.target.name]: e.target.value });
                    }}
                    size="small"
                    fullWidth
                    label="نام دسته بندی"
                  />
                </Grid>

                <Grid
                  sx={{
                    margin: "auto",
                  }}
                  xs={12}
                  item
                >
                  <RtlTextField
                    name="sort_order"
                    onChange={(e) => {
                      setData({ ...data, [e.target.name]: e.target.value });
                    }}
                    size="small"
                    fullWidth
                    label="ترتیب دسته بندی"
                  />
                </Grid>
                <Grid
                  sx={{
                    margin: "auto",
                  }}
                  xs={12}
                  item
                >
                  {" "}
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    style={{
                      minHeight: 300,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <DropZone getFiles={handleGetFiles} />
                  <Button
                    sx={{
                      my: 2,
                    }}
                    disabled={data.category_name.length <= 0}
                    onClick={handleNewCategory}
                    color="success"
                    size="medium"
                    variant="contained"
                    fullWidth
                  >
                    اضافه کردن دسته بندی جدید
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} item>
            {" "}
            <Divider />
          </Grid>

          <Grid xs={12} item>
            <Typography
              variant="h6"
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              دسته بندی ها
            </Typography>
            <StyledDivider />
            <Grid container component={Item}>
              {categories.length > 0
                ? categories.map((item, i) => {
                    return (
                      <Grid key={i} sx={{ padding: 1 }} item xs={6} md={3}>
                        <ListItem
                          sx={{
                            position: "relative",
                          }}
                        >
                          {item.category_name} <br />
                          <br />
                          ترتیب دسته بندی :{" "}
                          <span
                            style={{
                              color: "orange",
                            }}
                          >
                            {item.sort_order}
                          </span>
                          <Box
                            sx={{
                              position: "absolute",
                              left: 5,
                              top: 5,
                            }}
                          >
                            <IconButton
                              onClick={() =>
                                handleDeleteCategory(item.category_id)
                              }
                            >
                              <DeleteOutline
                                sx={{
                                  color: "red",
                                }}
                              />
                            </IconButton>
                          </Box>
                        </ListItem>
                      </Grid>
                    );
                  })
                : "دسته بندی وجود ندارد"}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AddCategoryForm;
