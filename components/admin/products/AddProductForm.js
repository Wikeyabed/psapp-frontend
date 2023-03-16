import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
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
        <Card item xs={12}>
          <Grid component={Item} container>
            <Grid sx={{ px: 1 }} item xs={6}>
              <RtlTextField fullWidth label="نام محصول" />
              <RtlTextField
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

            <Grid sx={{ px: 1 }} item xs={6}>
              <RtlTextField fullWidth label="کد محصول" />
              <RtlTextField
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

            <Grid sx={{ px: 1, mb: 6 }} item xs={6}>
              <RtlTextField type="number" fullWidth label="مقدار عمده فروشی" />
            </Grid>

            <Grid sx={{ px: 1, mb: 6 }} item xs={6}>
              <RtlTextField fullWidth label="تعداد در هر بسته" />
            </Grid>

            <Grid sx={{ px: 1, mb: 6 }} item xs={12}>
              <RtlTextField fullWidth label="قیمت محصول" />
            </Grid>

            <Grid sx={{ px: 1, mb: 6 }} item xs={12}>
              <RtlTextField fullWidth label="درصد تخفیف" />
            </Grid>

            <Grid sx={{ px: 1, mb: 6 }} item xs={12}>
              {/* <RtlTextField multiline rows={7} fullWidth label="توضیحات..." /> */}

              <Editor
                apiKey="7qyd7k9r3z7f7roupl2xy42gbsmv5k1dx2sbpn9r8irpruh5"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 200,
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
              <button onClick={log}>Log editor content</button>
            </Grid>

            <Grid sx={{ mb: 6, mt: 0.5, px: 1 }} item xs={6}>
              <DropZone />
            </Grid>

            <Grid xs={6} item>
              <Button sx={{ p: 1 }} fullWidth variant="outlined">
                ایجاد محصول جدید
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}

export default AddProductForm;
