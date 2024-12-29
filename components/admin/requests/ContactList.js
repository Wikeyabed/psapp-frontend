import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Link from "../../../src/Link";
import ToPersianDate from "../../../src/TimestampToPersian";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
// import DeleteBlog from "./DeleteBlog";
import { getCookie, setCookie } from "cookies-next";

function ContactList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    let myHeaders = new Headers();

    myHeaders.append("token", getCookie("x-auth-token"));

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setRequests(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <Grid container spacing={2}>
      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        lg={4}
        item
      >
        {" "}
        <Typography variant="h6" color={"#000"}>
          موضوع
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        lg={4}
        item
      >
        <Typography variant="h6" color={"#000"}>
          توضیحات
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        lg={4}
        item
      >
        <Typography variant="h6" color={"#000"}>
          تاریخ ایجاد
        </Typography>
      </Grid>

      {/* <Grid
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        lg={4}
        item
      >
        <Typography variant="h6" color={"#000"}>
          عملیات
        </Typography>
      </Grid> */}

      <Grid
        sx={{
          display: { xs: "none", md: "block" },
        }}
        item
        xs={12}
      >
        {" "}
        <Divider
          sx={{
            backgroundColor: "#444",
            height: 3,
          }}
        />
      </Grid>

      {requests
        .sort((a, b) => b.create_time - a.create_time)
        .filter((request) => request.request_type == "3").length > 0 ? (
        requests
          .filter((request) => request.request_type == "3")
          .map((request) => {
            return (
              <Box
                sx={{
                  borderBottom: "1px solid #e2e2e2",
                  backgroundColor: `${
                    (request.id * 1) % 2 == 0 ? "#fff" : "#fff"
                  }`,
                  p: 1,
                }}
                container
                component={Grid}
                item
                xs={12}
                key={request.id}
              >
                <Grid xs={12} md={6} lg={4} item>
                  {" "}
                  <Link
                    sx={{
                      textDecoration: "none",
                    }}
                    href={`/admin/requests/${request.id}`}
                  >
                    <Typography>{request.request_title}</Typography>
                  </Link>
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  <Box
                    sx={{
                      fontSize: 14,
                    }}
                    variant="body2"
                    color={"GrayText"}
                  >
                    {parse(request.request_description.slice(0, 10) + " ... ")}
                  </Box>
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  {" "}
                  <ToPersianDate timestamp={request.create_time} />
                </Grid>

                {/* <Grid xs={12} md={6} lg={4} item>
                {" "}
                <DeleteBlog blog={blog} fetchRequests={fetchRequests} />
              </Grid> */}
              </Box>
            );
          })
      ) : (
        <Typography
          sx={{
            mt: 12,
            width: "100%",
            textAlign: "center",
          }}
          color="Highlight"
          variant="h5"
        >
          {" "}
          درخواستی وجود ندارد
        </Typography>
      )}
    </Grid>
  );
}

export default ContactList;
