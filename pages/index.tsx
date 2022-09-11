import type { GetServerSideProps, NextPage } from "next";
import { Cover, Playlist, Todo } from "@components";
import { IBackgroundMusicResponse } from "@interfaces";
import { ACNH_API } from "@constants";

interface IProps {
  bgmList: IBackgroundMusicResponse;
}

const Home: NextPage<IProps> = ({ bgmList }) => {
  return (
    <main className="w-full grid grid-cols-4 place-content-center px-5">
      <Todo />
      <Cover />
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
