"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { persianNumber } from "../../../src/PersianDigits";

import { useEffect, useState } from "react";
import font from "./Iranyekan.ttf";
import moment from "moment-jalaali";
import dynamic from "next/dynamic";
import { clippingParents } from "@popperjs/core";
import { Height } from "@mui/icons-material";
Font.register({
  family: "iranyekan",
  format: "truetype",
  src: font,
});

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    direction: "rtl",
    textAlign: "right !important",
    fontFamily: "iranyekan",
    padding: 20,
  },
  section: {
    padding: 10,
    flexGrow: 1,
    direction: "rtl",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: "12px",
  },
});

function AdminOrderPdf({ order }) {
  const [rows, setRows] = useState([]);
  const [min, setMin] = useState(800);

  const [SlicedRows, setSlicedRows] = useState([]);

  const sum = rows.reduce((accumulator, row) => {
    return accumulator + row.product_quantity * 1;
  }, 0);

  useEffect(() => {
    let strings = [];
    for (let i = 0; i < order.products.length; i++) {
      strings.push(JSON.parse(order.products[i]));
    }
    console.log("rows", rows);
    console.log("order", order);

    const withNumberedRows = strings.map((row, i) => {
      return { row_number: i + 1, ...row };
    });
    setRows(withNumberedRows);
    console.log("object", withNumberedRows);
    sliceTheArray(rows);

    console.log("slice", SlicedRows);
  }, [SlicedRows]);

  const sliceTheArray = async (mainArray) => {
    let numberOfSlice = Math.ceil(mainArray.length / 8);
    let bigArray = [];

    let numberArray = [...Array(numberOfSlice).keys()].map((num) => num * 8);

    console.log(numberArray);
    numberArray.map((num, i) => {
      bigArray = [...bigArray, mainArray.slice(num, num + 8)];
      setSlicedRows(bigArray);
    });
  };

  return (
    <PDFViewer
      className="main"
      style={{
        width: "100%",
        minHeight: 800,
      }}
    >
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              minHeight: 800,
              width: "100%",
            }}
          >
            {/* Header start */}

            <View style={styles.section}>
              {/* <Text style={styles.title}>خدایا شکرت</Text> */}

              {SlicedRows.map((row, i) => {
                return (
                  <View
                    style={{
                      height: 790,
                      padding: 10,
                    }}
                    key={i}
                  >
                    <Text
                      style={{
                        fontSize: "10px",

                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      صفحه {persianNumber(i + 1)}
                    </Text>
                    <View
                      style={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        fontSize: "10px",
                      }}
                    >
                      <Image
                        style={{
                          width: 120,
                          // backgroundColor: "red",
                        }}
                        alt="ایباکس"
                        src={{
                          uri: "https://i.postimg.cc/xdyG3XTg/logo.png",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: 15,
                        left: 25,
                        fontSize: "10px",
                        fontWeight: "bold",
                        textAlign: "right",
                        width: 120,
                      }}
                    >
                      <Text>
                        {" "}
                        تاریخ ثبت :{" "}
                        {persianNumber(
                          moment
                            .unix(order.delivery_date)
                            .format("jYYYY/jMM/jDD")
                        )}
                      </Text>

                      <br />
                      <Text>
                        {" "}
                        شماره فاکتور : {persianNumber(order.order_number)}
                      </Text>
                      <Text> شماره پیگیری :{order.track_id}</Text>
                    </View>

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                      }}
                    >
                      فاکتور فروش ایباکس
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    >
                      www.eebox.ir
                    </Text>
                    <View
                      style={{
                        direction: "rtl !important",
                        marginTop: 15,
                        paddingTop: 5,
                        borderTop: "1px solid #000",
                        flexDirection: "row-reverse",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "flex-end",
                          flexGrow: 1,
                        }}
                      >
                        {" "}
                        <Text
                          style={{
                            fontSize: "8px",
                          }}
                        >
                          شرکت/خانم/آقای : {order.customer_name}
                        </Text>
                      </View>{" "}
                      <View
                        style={{
                          alignItems: "flex-end",
                          flexGrow: 1,
                        }}
                      >
                        {" "}
                        <Text
                          style={{
                            fontSize: "8px",
                          }}
                        >
                          {order.customer_phone}: شماره تماس
                        </Text>
                      </View>{" "}
                    </View>

                    <Text
                      style={{
                        fontSize: "10px",
                        textAlign: "right",
                        minHeight: 30,
                      }}
                    >
                      آدرس : {order.delivery_address}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row-reverse",
                        marginTop: "20px",
                        textAlign: "center !important",
                        fontSize: "12px",
                        border: "2px solid #444",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                      }}
                    >
                      <View
                        style={{
                          flexGrow: 1,
                          alignItems: "flex-end",
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: "10px",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            marginRight: 10,
                          }}
                        >
                          ردیف
                        </Text>
                      </View>

                      <View
                        style={{
                          flexGrow: 1,
                          alignItems: "flex-end",
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: "130px",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            marginRight: 10,
                          }}
                        >
                          نام محصول
                        </Text>
                      </View>

                      <View
                        style={{
                          flexGrow: 1,
                          alignItems: "flex-end",
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: "30px",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          تعداد
                        </Text>
                      </View>

                      <View
                        style={{
                          flexGrow: 1,
                          alignItems: "flex-end",
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          (ریال) قیمت هر عدد
                        </Text>
                      </View>
                      <View
                        style={{
                          flexGrow: 1,
                          alignItems: "flex-end",
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          (ریال) قیمت کل
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        textAlign: "center !important",
                        fontSize: "12px",
                      }}
                    >
                      {row
                        .sort((a, b) => a.row_number - b.row_number)
                        .map((row, i) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row-reverse",
                                border: "1px solid #444",
                                height: 80,
                              }}
                              key={i}
                            >
                              <View
                                style={{
                                  alignItems: "flex-end",
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  paddingLeft: 10,
                                  borderLeft: "1px solid #444",
                                  width: "30px",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    width: "25px",
                                  }}
                                >
                                  {persianNumber(row.row_number)}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexGrow: 1,
                                  alignItems: "flex-end",
                                  paddingTop: 10,
                                  marginRight: 5,
                                  width: "100px",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "9px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    width: "80%",
                                    direction: "rtl !important",
                                    lineHeight: 2,
                                  }}
                                >
                                  {row.product_name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexGrow: 1,
                                  alignItems: "flex-end",
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  width: "30px",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {persianNumber(row.product_quantity)}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexGrow: 1,
                                  alignItems: "flex-end",
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  width: "30px",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                >
                                  {persianNumber(row.unit_price)}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexGrow: 1,
                                  alignItems: "flex-end",
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  width: "30px",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                >
                                  {persianNumber(row.total_price)}
                                </Text>
                              </View>
                            </View>
                          );
                        })}

                      {i + 1 == SlicedRows.length ? (
                        <View>
                          <View
                            style={{
                              alignItems: "flex-start",
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 20,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            >
                              {`${persianNumber(sum)} : تعداد کل  `}
                              {/* {rows.reduce((accumulator, row) => {
                      return accumulator + row.product_quantity * 1;
                    }, 0)} */}
                            </Text>
                          </View>
                          <View
                            style={{
                              alignItems: "flex-start",

                              paddingBottom: 10,
                              paddingLeft: 20,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            >
                              جمع کل فاکتور: ریال{" "}
                              {persianNumber(order.finished_price)}
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: "12px",
                              marginTop: 20,
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            "با ایباکس به صرفه و با کیفیت بسته بندی کنید"
                          </Text>
                        </View>
                      ) : (
                        ""
                      )}
                    </View>
                  </View>
                );
              })}

              {/* Header Ends */}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default AdminOrderPdf;
