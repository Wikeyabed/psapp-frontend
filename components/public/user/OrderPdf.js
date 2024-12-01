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

function OrderPdf({ order }) {
  const [rows, setRows] = useState([]);
  const [min, setMin] = useState(800);

  useEffect(() => {
    let strings = [];
    for (let i = 0; i < order.products.length; i++) {
      strings.push(JSON.parse(order.products[i]));
    }
    setRows(strings);
  }, []);

  return (
    <PDFViewer
      className="main"
      style={{
        width: "100%",
        minHeight: 800,
      }}
    >
      {" "}
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              border: "2px solid #000",
              padding: 15,
              margin: 20,
              minHeight: 800,
            }}
          >
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
                {moment.unix(order.delivery_date).format("jYYYY/jMM/jDD")}
              </Text>
              <br />
              <Text> شماره فاکتور : {order.order_number}</Text>
              <Text> شماره پیگیری :{order.track_id}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>خدایا شکرت</Text>
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
                  fontSize: "10px",
                }}
              >
                www.eebox.ir
              </Text>

              <View
                style={{
                  flexDirection: "row-reverse",
                  marginTop: "30px",
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
                {/* <View
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
                    درصد تخفیف
                  </Text>
                </View> */}
              </View>

              <View
                style={{
                  textAlign: "center !important",
                  fontSize: "12px",
                  border: "1px solid #444",
                }}
              >
                {rows
                  .sort((a, b) => a.total_price - b.total_price)
                  .map((row, i) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          borderBottom: "1px soild #000",
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
                            {i + 1}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexGrow: 1,
                            alignItems: "flex-end",
                            paddingTop: 10,
                            paddingBottom: 10,
                            marginRight: 10,
                            width: "100px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "10px",
                              fontWeight: "bold",
                              textAlign: "center",
                              width: "70%",
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
                            {row.product_quantity}
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

                        {/* <View
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
                            {row.product_discount}{" "}
                          </Text>
                        </View> */}
                      </View>
                    );
                  })}

                <View></View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default OrderPdf;
