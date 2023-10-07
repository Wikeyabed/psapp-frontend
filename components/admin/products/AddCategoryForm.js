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
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { getCookie } from "cookies-next";
import {
  setNotificationOff,
  setNotificationOn,
} from "../../../redux/reducers/notificationSlice";

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

function AddCategoryForm() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    category_name: "",
    parent_category_id: null,
  });

  useEffect(() => {
    return () => {
      fetchCategories();
    };
  }, []);

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
      .then((result) => setCategories(result))
      .catch((error) => console.log("error", error));
  };

  const handleNewCategory = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("category_name", data.category_name);
    urlencoded.append("parent_category_id", data.parent_category_id);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
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
                <Grid item xs={12}>
                  <Button
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
                          {item.category_name}
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
