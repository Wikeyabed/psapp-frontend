import {
  Box,
  Grid,
  FormControl,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";

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
  border: `1px solid ${theme.palette.primary.borderColor}`,
  color: theme.palette.text.secondary,
  borderRadius: theme.palette.primary.borderRadius,
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

function AddCategoryForm() {
  const [categories, setCategories] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [editItem, setEditItem] = useState("");

  const handleCategories = () => {
    if (textValue) {
      setCategories([...categories, textValue]);
      setTextValue("");
    }
  };

  const handleDelete = (item) => {
    setCategories(categories.filter((selected) => selected !== item));
  };

  const handleClick = (item) => {
    setEditItem(item);
  };

  const handleUpdate = (e, index) => {
    categories[index] = e.target.value;
    setCategories([...categories]);
    setEditItem("");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid component={FormControl} container spacing={2}>
          <Grid xs={12} item>
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
                xs={10}
                lg={6}
                item
              >
                <RtlTextField
                  onChange={(e) => {
                    setTextValue(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        sx={{
                          position: "absolute",
                          left: 0,
                        }}
                      >
                        <Button
                          onClick={handleCategories}
                          color="success"
                          size="medium"
                          variant="contained"
                        >
                          اضافه کردن
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  fullWidth
                  value={textValue}
                  label="نام دسته بندی"
                />
              </Grid>
            </Grid>
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
                      <Grid key={i} sx={{ padding: 1 }} item xs={4}>
                        <ListItem
                          sx={{
                            position: "relative",
                          }}
                        >
                          {editItem === item ? (
                            <RtlTextField
                              size="small"
                              fullWidth
                              autoFocus
                              defaultValue={item}
                              onBlur={() => setEditItem("")}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleUpdate(e, i)
                              }
                              sx={{
                                border: "none",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    border: "none",
                                  },
                                },
                              }}
                            />
                          ) : (
                            <RtlTextField
                              size="small"
                              disabled
                              value={item}
                              sx={{
                                border: "none",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    border: "none",
                                  },
                                },
                              }}
                            />
                          )}

                          <Box
                            sx={{
                              position: "absolute",
                              left: 5,
                              top: 5,
                            }}
                          >
                            {editItem === item ? (
                              <IconButton onClick={() => setEditItem("")}>
                                <CreateOutlined
                                  sx={{
                                    color: "black",
                                  }}
                                />
                              </IconButton>
                            ) : (
                              <IconButton onClick={() => handleClick(item)}>
                                <CreateOutlined
                                  sx={{
                                    color: "blue",
                                  }}
                                />
                              </IconButton>
                            )}

                            <IconButton onClick={() => handleDelete(item)}>
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
                : "no items"}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AddCategoryForm;
