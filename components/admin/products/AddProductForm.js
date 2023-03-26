import React, { useRef, useState } from "react";
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Editor } from "@tinymce/tinymce-react";

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

function AddProductForm() {
  // tinyMCE Editor refrence
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // Logs the value entered in the editor
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component={FormControl} container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              p: 1,
              textAlign: "center",
            }}
          >
            اطلاعات محصول جدید
          </Typography>
          <StyledDivider />
          <Grid component={Item} container>
            <Grid sx={{ px: 1 }} item xs={4}>
              <RtlTextField size="small" fullWidth label="نام محصول" />
            </Grid>

            <Grid item xs={4} sx={{ px: 1 }}>
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
            <Grid sx={{ px: 1 }} item xs={4}>
              <RtlTextField size="small" fullWidth label="کد محصول" />
            </Grid>

            <Grid sx={{ px: 1 }} item xs={4}>
              <RtlTextField
                size="small"
                type="number"
                fullWidth
                label="مقدار عمده فروشی"
              />
            </Grid>

            <Grid sx={{ px: 1 }} item xs={4}>
              <RtlTextField size="small" fullWidth label="تعداد در هر بسته" />
            </Grid>

            <Grid sx={{ my: 4, px: 1 }} item xs={6}>
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

            <Grid sx={{ my: 4, px: 1 }} item xs={6}>
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
              <Grid sx={{ px: 1 }} item xs={4}>
                <RtlTextField size="small" fullWidth label="قیمت محصول" />
              </Grid>

              <Grid sx={{ px: 1 }} item xs={4}>
                <RtlTextField size="small" fullWidth label="قیمت عمده" />
              </Grid>

              <Grid sx={{ px: 1 }} item xs={4}>
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
              <Grid sx={{ px: 1, mx: "auto" }} xs={8}>
                <DropZone />
              </Grid>

              <Grid sx={{ px: 1 }} xs={12}></Grid>

              {/* <StyledDivider /> */}

              <Grid sx={{ px: 1, mx: "auto", mt: 2 }} xs={4} item>
                <Button sx={{ p: 1 }} fullWidth variant="contained">
                  ایجاد محصول جدید
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddProductForm;
