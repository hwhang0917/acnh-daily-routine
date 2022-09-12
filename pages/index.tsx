import type { GetServerSideProps, NextPage } from "next";
import { Cover, Playlist, Todo } from "@components";
import { IBackgroundMusicResponse } from "@interfaces";
import { ACNH_API } from "@constants";

interface IProps {
  bgmList: IBackgroundMusicResponse;
}

const Home: NextPage<IProps> = ({ bgmList }) => {
  return (
    <main className="w-full lg:h-screen lg:grid lg:grid-cols-4 flex flex-col gap-6 px-5">
      <Cover />
      <Todo />
      <Playlist bgmList={bgmList} />
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  // Fetch ACNH API Background Music
  const result = await new Promise<IBackgroundMusicResponse>(
    (resolve, reject) => {
      fetch(ACNH_API + "backgroundMusic")
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    }
  );
  return { props: { bgmList: result } };
};
