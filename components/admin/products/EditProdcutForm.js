import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  Typography,
  Divider,
} from "@mui/material";
import DropZone from "./DropZone";
import AddIcon from "@mui/icons-material/Add";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";

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

const EditForm = ({ product }) => {
  const editorRef = useRef(null);
  const [data, setData] = useState({
    name: product.product_name,
    description: product.product_description,
    price: product.price,
    quantity: product.product_quantity,
    stack: product.stack,
    discount: product.discount,
    features: product.product_features,
  });
  const [files, setFiles] = useState([]);

  const handleSetValues = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleGetFiles = (getFiles) => {
    setFiles(getFiles);
  };

  const handleEditForm = async () => {
    console.log("submitted");
    var formData = new FormData();
    formData.append("product_name", data.name);
    formData.append("product_description", data.description);
    formData.append("price", data.price);
    formData.append("product_quantity", data.quantity);
    formData.append("stack", data.stack);
    formData.append("discount", data.discount);
    formData.append("product_features", data.features);

    for (let i = 0; i < files.length; i++) {
      formData.append("images_url", files[i], files[i].name);
    }

    var requestOptions = {
      method: "PUT",
      headers: {
        token: getCookie("x-auth-token"),
      },
      body: formData,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${product.product_id}`,
      requestOptions
    )
      .then((response) => {
        console.log("inside response");
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
            defaultValue={product.product_name}
            fullWidth
            label="نام محصول"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            disabled
            size="small"
            defaultValue={product.product_id}
            fullWidth
            label="کد محصول"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={6} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="quantity"
            size="small"
            type="number"
            defaultValue={product.product_quantity}
            fullWidth
            label="مقدار موجود"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={6} md={4}>
          <RtlTextField
            onChange={handleSetValues}
            name="stack"
            size="small"
            defaultValue={product.stack}
            fullWidth
            label="تعداد در هر بسته"
          />
        </Grid>

        <Grid item xs={12} sx={{ px: 1 }}>
          {" "}
          {/* <RtlTextField
            size="small"
            SelectProps={{
              IconComponent: SelectIcon,
            }}
            select
            fullWidth
            label="دسته بندی محصول"
          >
            <MenuItem value={"1"}>item 1</MenuItem>
            <MenuItem value={"2"}>item 2</MenuItem>
            <MenuItem value={"3"}>item 3</MenuItem>
          </RtlTextField> */}
        </Grid>

        <Grid sx={{ my: 4, px: 1 }} item xs={12} md={6}>
          <Editor
            onChange={handleSetValues}
            name="features"
            apiKey="7qyd7k9r3z7f7roupl2xy42gbsmv5k1dx2sbpn9r8irpruh5"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={product.product_features}
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
              content_style: "body { font-family:'iranyekan'; font-size:14px }",
            }}
          />
        </Grid>

        <Grid sx={{ my: 4, px: 1 }} item xs={12} md={6}>
          <Editor
            onChange={handleSetValues}
            name="description"
            apiKey="7qyd7k9r3z7f7roupl2xy42gbsmv5k1dx2sbpn9r8irpruh5"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={product.product_description}
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
          قیمت و تخفیفات{" "}
        </Typography>

        <StyledDivider />
        <Grid component={Item} container>
          <Grid sx={{ px: 1 }} item xs={12} md={4}>
            <RtlTextField
              onChange={handleSetValues}
              name="price"
              defaultValue={product.price}
              size="small"
              fullWidth
              label=" قیمت محصول به ریال"
            />
          </Grid>

          {/* <Grid sx={{ px: 1 }} item xs={12} md={4}>
            <RtlTextField size="small" fullWidth label="قیمت عمده" />
          </Grid> */}

          <Grid sx={{ px: 1 }} item xs={12} md={4}>
            <RtlTextField
              onChange={handleSetValues}
              name="discount"
              defaultValue={product.discount}
              size="small"
              fullWidth
              label="درصد تخفیف"
            />
          </Grid>
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

          {/* <StyledDivider /> */}

          <Grid sx={{ px: 1, mx: "auto", mt: 2 }} xs={12} md={4} item>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Button
                onClick={handleEditForm}
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
                startIcon={<AddIcon />}
                variant="contained"
              >
                اعمال تغییرات
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

function EditProductForm({ product }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component={FormControl} container spacing={2}>
        <Grid item xs={12}>
          <EditForm product={product} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditProductForm;
