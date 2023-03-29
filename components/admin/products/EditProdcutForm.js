import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import DropZone from "./DropZone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { Editor } from "@tinymce/tinymce-react";

const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: 10,
  padding: 20,
}));

const Card = styled(Grid)(({ theme }) => ({
  margin: "auto",
  backgroundColor: theme.palette.primary.lightBg,
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

const SelectIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  position: "absolute",
  right: "90% !important",
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "20%",
  margin: "auto",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderRadius: "50%",
  opacity: "0.5",
}));

const EnterProductId = ({ handleProductId }) => {
  return (
    <>
      <Grid sx={{ px: 1, mb: 6, mx: "auto" }} item xs={7}>
        <Typography
          variant="h6"
          sx={{
            p: 1,
            textAlign: "center",
          }}
        >
          کد محصول مورد نظر
        </Typography>
        <RtlTextField size="small" fullWidth label="کد محصول" />
      </Grid>
      <Grid sx={{ px: 1, mx: "auto" }} item xs={3}>
        <Button
          onClick={handleProductId}
          sx={{ p: 1 }}
          fullWidth
          variant="outlined"
        >
          تایید
        </Button>
      </Grid>
    </>
  );
};

const EditForm = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // Logs the value entered in the editor
      console.log(editorRef.current.getContent());
    }
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
          <RtlTextField size="small" fullWidth label="نام محصول" />
        </Grid>

        <Grid item xs={12} md={4} sx={{ px: 1 }}>
          {" "}
          <RtlTextField
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
          </RtlTextField>
        </Grid>
        <Grid sx={{ px: 1 }} item xs={12} md={4}>
          <RtlTextField size="small" fullWidth label="کد محصول" />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={6} md={4}>
          <RtlTextField
            size="small"
            type="number"
            fullWidth
            label="مقدار عمده فروشی"
          />
        </Grid>

        <Grid sx={{ px: 1 }} item xs={6} md={4}>
          <RtlTextField size="small" fullWidth label="تعداد در هر بسته" />
        </Grid>

        <Grid sx={{ my: 4, px: 1 }} item xs={12} md={6}>
          <Editor
            apiKey="7qyd7k9r3z7f7roupl2xy42gbsmv5k1dx2sbpn9r8irpruh5"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="مشخصات محصول"
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
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Grid>

        <Grid sx={{ my: 4, px: 1 }} item xs={12} md={6}>
          <Editor
            apiKey="7qyd7k9r3z7f7roupl2xy42gbsmv5k1dx2sbpn9r8irpruh5"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="توضیحات محصول"
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
            <RtlTextField size="small" fullWidth label="قیمت محصول" />
          </Grid>

          <Grid sx={{ px: 1 }} item xs={12} md={4}>
            <RtlTextField size="small" fullWidth label="قیمت عمده" />
          </Grid>

          <Grid sx={{ px: 1 }} item xs={12} md={4}>
            <RtlTextField size="small" fullWidth label="درصد تخفیف" />
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
          <Grid sx={{ px: 1, mx: "auto" }} xs={12} md={8}>
            <DropZone />
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
                sx={{
                  p: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#fff",
                  backgroundColor: "#1e88e5",
                  borderRadius: "8px",
                  transition: ".2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#0d47a1",
                  },
                  "& .MuiButton-startIcon": {
                    marginLeft: "12px",
                    fontSize: "148px",
                  },
                }}
                startIcon={<AddIcon />}
                variant="contained"
              >
                ایجاد محصول جدید
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

function EditProductForm() {
  const [productId, setProductId] = useState(false);

  const handleProductId = () => {
    setProductId(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component={FormControl} container spacing={2}>
        <Grid item xs={12}>
          {productId ? (
            <EditForm />
          ) : (
            <EnterProductId handleProductId={handleProductId} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditProductForm;
