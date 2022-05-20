import React from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { IMusic, IRawMusic } from "@interfaces";
import useTime from "hooks/useTime";
import { css } from "@emotion/react";
import { ACNH_API } from "@constants";

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
  const date = useTime();

  return (
    <main
      css={css`
        display: grid;
        place-content: center;
        width: 100%;
        height: 100vh;
      `}
    >
      {hourMusic.map(({ id, fileName }) => (
        <h1 key={id}>{fileName}</h1>
      ))}
    </main>
  );
};

export default Home;
