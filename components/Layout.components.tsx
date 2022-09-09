import { Header, Footer } from "@components";

/**
 * 전체 화면 레이아웃
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="aspect-auto w-full flex justify-center px-2">
        {children}
      </main>
      <Footer />
    </>
  );
};
