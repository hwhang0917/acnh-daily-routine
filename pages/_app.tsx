import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import GlobalStyle from "../styles/Globalstyle";

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>ACNH: Daily Routine</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="title" content="ACNH: Daily Routine" />
        <meta
          name="description"
          content="Animal Crossing New Horizon Daily routine is a scheduling website that plays calming background music and keep todo list "
        />
        <meta
          name="keywords"
          content="Animal Crossing, New Horizon, Todo list, Scheduler, Nintendo"
        />
        <meta name="author" content="hwhang0917" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default App;
