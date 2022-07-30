import type { GetServerSideProps } from "next";
import axios from "axios";
import ReactHowler from "react-howler";
import { Clock, Sky } from "@components";
import { HourlyMusic } from "@interfaces";
import { getSongCode } from "@utils";
import { useState } from "react";
import { useWeather } from "@hooks/useWeather";
import { useSpring, animated, config } from "@react-spring/web";

interface IProps {
  songList: HourlyMusic;
}

const Home = ({ songList }: IProps) => {
  const { weather, loading } = useWeather();
  const [playing, setPlaying] = useState(false);

  const [toggle, setToggle] = useState(false);
  const number = useSpring({
    test: toggle ? 100 : 0,
    config: config.molasses,
  });

  const [hour, setHour] = useState(2);

  if (loading) return <h1>Loading</h1>;
  else {
    const songCode = getSongCode({ hour, weather });
    const song = songList[songCode];
    return (
      <div>
        <Sky />
        <Clock />
        <ReactHowler
          src="/assets/mixkit-rain-loop-1250.wav"
          playing={playing && weather === "Rainy"}
          volume={0.3}
          loop
        />
        <ReactHowler
          src={song.music_uri}
          format={["mp3"]}
          playing={playing}
          loop
        />
        <input
          type="range"
          min={0}
          max={23}
          step={1}
          value={hour}
          onChange={(event) => {
            setHour(+event.target.value);
          }}
        />
        <button onClick={() => setPlaying((s) => !s)}>
          {playing ? "PAUSE" : "PLAY"}
        </button>
        <h1>{song["file-name"]}</h1>
        <animated.h2>{number.test.to((n) => n.toFixed(0))}</animated.h2>
        <button onClick={() => setToggle((s) => !s)}>TOGGLE</button>
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
