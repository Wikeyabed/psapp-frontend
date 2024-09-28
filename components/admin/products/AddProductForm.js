import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  Typography,
  Divider,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import DropZone from "./DropZone";
import AddIcon from "@mui/icons-material/Add";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setNotificationOn } from "../../../redux/reducers/notificationSlice";
import AddProductVariant from "./AddProductVariant";

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

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "20%",
  margin: "auto",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderRadius: "50%",
  opacity: "0.5",
}));

const EditForm = ({ product, closeAfterUpdate }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const descRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, [category]);

  const fetchCategories = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCategoryList(result))
      .catch((error) => console.log("error", error));
  };

  const [data, setData] = useState({
    name: "",
    product_id: "",
    description: "",
    features: "",
    currentProduct: {},
  });
  const [files, setFiles] = useState([]);

  // all fields data set
  const handleSetValues = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // tinyMCE data handling
  const handleEditorsContent = (event) => {
    if (event.target.targetElm.name == "description") {
      setData({ ...data, description: descRef.current.getContent() });
    }
  };

  // handle images files
  const handleGetFiles = (getFiles) => {
    setFiles(getFiles);
  };

  // send new or existing data for update to api route
  const handleCreateProduct = async () => {
    console.log("submitted");
    var formData = new FormData();
    formData.append("product_name", data.name);
    formData.append("product_id", data.product_id);
    formData.append("product_description", data.description);
    formData.append("category", category);
    formData.append("product_features", data.features);

    for (let i = 0; i < files.length; i++) {
      formData.append("images_url", files[i], files[i].name);
    }

    var requestOptions = {
      method: "POST",
      headers: {
        token: getCookie("x-auth-token"),
      },
      body: formData,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/add`,
      requestOptions
    )
      .then((response) => {
        if (response.status == 201 || response.status == 200) {
          dispatch(
            setNotificationOn({
              message: "محصول با موفقیت ایجاد شد",
              color: "success",
            })
          );

          // close parent modal after a short timeout
          // setTimeout(() => closeAfterUpdate(true), 500);

          return response.json();
        } else {
          dispatch(
            setNotificationOn({
              message: "مشکلی پیش آمده",
              color: "error",
            })
          );
        }
      })
      .then((result) => {
        setData({ ...data, currentProduct: result });
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          p: 1,
          textAlign: "center",
        }}
      >
        اطلاعات محصول
      </Typography>
      <StyledDivider />
      <Grid component={Item} container>
        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="name"
            size="small"
            fullWidth
            label="نام محصول"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            name="product_id"
            onChange={handleSetValues}
            size="small"
            fullWidth
            label="کد محصول"
          />
        </Grid>

        <Grid item xs={12} md={4} sx={{ px: 1 }}>
          {" "}
          <RtlTextField
            select
            onChange={handleCategoryChange}
            size="small"
            value={category}
            fullWidth
            label="دسته بندی محصول"
          >
            {categoryList
              ? categoryList.map((category) => {
                  return (
                    <MenuItem
                      key={category.category_id}
                      value={category.category_name}
                    >
                      {category.category_name}
                    </MenuItem>
                  );
                })
              : ""}
          </RtlTextField>
        </Grid>

        <Grid sx={{ mt: 4, px: 1 }} item xs={12} md={6}>
          <RtlTextField
            onChange={handleSetValues}
            name="features"
            size="small"
            sx={{
              minHeight: 400,
            }}
            multiline
            minRows={11}
            maxRows={11}
            fullWidth
            label="ویژگی های محصول"
          />
        </Grid>

        <Grid sx={{ mt: 4, px: 1 }} item xs={12} md={6}>
          <Editor
            onChange={handleEditorsContent}
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
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{
            p: 1,
            textAlign: "center",
          }}
        >
          عکس و فایل محصولات{" "}
        </Typography>

        <StyledDivider />
        <Grid component={Item} container>
          <Grid sx={{ px: 1, mx: "auto" }} item xs={12} md={8}>
            <DropZone getFiles={handleGetFiles} />
          </Grid>

          <Grid sx={{ px: 1 }} item xs={12} md={12}></Grid>
        </Grid>
      </Grid>

      <Grid sx={{ px: 1, mx: "auto", mb: 12 }} xs={12} item>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Button
            onClick={handleCreateProduct}
            sx={{
              p: "12px 24px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "primary.main",
              borderRadius: "8px",
              transition: ".2s ease-in-out",
              "& .MuiButton-startIcon": {
                marginLeft: "12px",
                fontSize: "148px",
              },
            }}
            endIcon={
              <AddIcon
                sx={{
                  marginRight: 1,
                }}
              />
            }
            variant="contained"
          >
            ایجاد محصول اولیه
          </Button>
        </Box>
      </Grid>
    </>
  );
};

function AddProductForm({ product, closeAfterUpdate }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component={FormControl} container spacing={2}>
        <Grid item xs={12}>
          <EditForm closeAfterUpdate={closeAfterUpdate} product={product} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddProductForm;
