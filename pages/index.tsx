import type { GetServerSideProps } from "next";
import axios from "axios";
import ReactHowler from "react-howler";
import { MusicBox, Sky } from "@components";
import { HourlyMusic } from "@interfaces";
import { getSongCode } from "@utils";
import { useAxios } from "@hooks/useAxios";
import { IWeatherResponse } from "./api/weather";
import { useState } from "react";
import { useWeather } from "@hooks/useWeather";

interface IProps {
  songList: HourlyMusic;
}

const Home = ({ songList }: IProps) => {
  const { weather, loading } = useWeather();
  const [playing, setPlaying] = useState(false);

  if (loading) return <h1>Loading</h1>;
  else {
    const songCode = getSongCode({ hour: new Date().getHours(), weather });
    const song = songList[songCode];
    return (
      <div>
        <Sky />
        <ReactHowler
          src={song.music_uri}
          format={["mp3"]}
          playing={playing}
          loop
        />
        <button onClick={() => setPlaying((s) => !s)}>
          {playing ? "PAUSE" : "PLAY"}
        </button>
        <h1>{song["file-name"]}</h1>
      </div>
    );
  }
};

export default Home;

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const { data: songList } = await axios.get<HourlyMusic>(
    "https://acnhapi.com/v1/backgroundmusic"
  );

  return {
    props: {
      songList,
    },
  };
};
