import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <title>ACNH:Daily Routine</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
