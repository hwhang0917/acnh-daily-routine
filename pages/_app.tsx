import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "@components";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <title>ACNH:Daily Routine</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
