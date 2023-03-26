import { Box, ClickAwayListener, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { DownloadDoneOutlined } from "@mui/icons-material";

const thumbStyle = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const fileTypes = ["jpg", "png", "jpeg"];

function DropZone() {
  const [files, setFiles] = useState([]);

  const objToArray = (obj) => {
    const arr = Object.values(obj);
    console.log("first", arr);
    return arr;
  };

  const handlePreview = (uploadedFiles) => {
    setFiles(
      uploadedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleChange = (files) => {
    setFiles(files);
    const convertedToArray = handlePreview(objToArray(files));
    console.log("dropped");
    return convertedToArray;
  };

  const thumbnails = files.map((file) => (
    <div style={thumbStyle} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const boxArea = (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <FileUploader
        children={
          <Box
            sx={{
              minWidth: "100%",
              minHeight: 50,
              border: "2px dashed #999",
              padding: "20px 20px",
              borderRadius: "4px",
              marginBottom: 4,
              position: "relative",
            }}
          >
            <Typography
              variant="button"
              sx={{
                color: "#999",
              }}
            >
              فایل های خود را بارگذاری کنید ...
            </Typography>
          </Box>
        }
        handleChange={handleChange}
        name="file"
        multiple={true}
        types={fileTypes}
        classes={"hello"}
        maxSize={1000}
        minSize={0}
      />
      <Box
        sx={{
          mb: 1,
        }}
      >
        {thumbnails ? thumbnails : ""}
      </Box>
    </Box>
  );
  return <>{boxArea}</>;
}

export default DropZone;
