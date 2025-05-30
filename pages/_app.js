import * as React from "react";
import "./globals.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { store } from "../redux/store.js";
import { Provider } from "react-redux";
import AuthCheck from "../components/HOC/AuthCheck";
import Notification from "../components/public/notification";
import Loading from "../components/HOC/Loading";
import { useState } from "react";
import { SocketProvider } from "../context/SocketContext";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>ایباکس</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta
            name="keywords"
            content="چسب, کارتن, بسته بندی, پستی, سلفون, حبابدار"
          />
          <meta
            name="description"
            content="فروشگاه اینترنتی محصولات بسته‌بندی"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="manifest" href="manifest.webmanifest" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap"
            rel="stylesheet"
          />
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loading />
          <Notification />
          <AuthCheck>
            <SocketProvider>
              {" "}
              {/* 👈 این بخش رو اضافه کردیم */}
              <Component {...pageProps} />
            </SocketProvider>
          </AuthCheck>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
