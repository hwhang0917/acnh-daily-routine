import type { NextPage } from "next";
import { MusicBox, Sky } from "@components";

const Home: NextPage = () => {
  return (
    <div>
      <Sky />
      <MusicBox />
      <h1>Hello World</h1>
    </div>
  );
};

export default Home;
