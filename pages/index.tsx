import type { NextPage } from "next";
import { Layout } from "@components";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Hello!</h1>
    </Layout>
  );
};

export default Home;
