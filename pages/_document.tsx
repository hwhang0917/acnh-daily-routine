import Footer from "@components/Footer.component";
import Header from "@components/Header.component";
import Document, {
  DocumentContext,
  Html,
  Main,
  Head,
  NextScript,
} from "next/document";

export default class LayoutDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="ko">
        <Head></Head>
        <body>
          <Header />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
