import type { GetServerSideProps, NextPage } from "next";
import { css } from "@emotion/react";
import { IMusic, IRawMusic } from "@interfaces";
import { ACNH_API } from "@constants";
import Blob from "@components/Blob.component";

interface IProps {
  hourMusic: IMusic[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const hourMusic: IMusic[] = await new Promise((resolve, reject) => {
    fetch(ACNH_API + "/backgroundmusic")
      .then((res) => res.json())
      .then((data: { [key: string]: IRawMusic }) => {
        resolve(
          Object.values(data).map((rawData) => ({
            id: rawData.id,
            fileName: rawData["file-name"],
            hour: rawData.hour,
            weather: rawData.weather,
            musicUri: rawData.music_uri,
          }))
        );
      })
      .catch((err) => reject(err));
  });

  return {
    props: {
      hourMusic,
    },
  };
};

const Home: NextPage<IProps> = ({ hourMusic }) => {
  return (
    <main
      css={css`
        display: grid;
        place-content: center;
        width: 100%;
        height: 100vh;
        background-color: #3498db;
      `}
    >
      <Blob />
    </main>
  );
};

export default Home;
