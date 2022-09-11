import { Header, Footer } from "@components";

/**
 * 전체 화면 레이아웃
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
