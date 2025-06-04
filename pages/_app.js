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
import Loading from "../components/HOC/Loading";

// Client-side cache
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>ایباکس | فروشگاه تخصصی بسته بندی</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
          />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="کارتن پستی, خرید کارتن پستی, چسب پهن, سلفون, نایلون حبابدار, پاکت پستی, ملزومات بسته بندی"
          />
          <meta
            name="description"
            content="فروشگاه اینترنتی ایباکس - عرضه مستقیم کارتن پستی، نایلون حبابدار، پاکت پستی و سایر ملزومات بسته بندی با بهترین قیمت و کیفیت"
          />
          <link rel="canonical" href="https://eebox.ir/" />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />

          {/* Preload fonts */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap"
            as="style"
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap"
              rel="stylesheet"
            />
          </noscript>

          {/* Open Graph / Social */}
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="ایباکس | فروشگاه تخصصی بسته بندی"
          />
          <meta
            property="og:description"
            content="فروشگاه اینترنتی ایباکس - عرضه مستقیم کارتن پستی، نایلون حبابدار، پاکت پستی و سایر ملزومات بسته بندی"
          />
          <meta property="og:url" content="https://eebox.ir/" />
          <meta property="og:site_name" content="ایباکس" />
          <meta property="og:locale" content="fa_IR" />
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loading />
          <AuthCheck>
            <Component {...pageProps} />
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
