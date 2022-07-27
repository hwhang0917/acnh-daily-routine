import type { AppProps } from "next/app";
import React from "react";
import GlobalStyle from "../styles/Globalstyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
