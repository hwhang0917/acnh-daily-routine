import type { GetServerSideProps } from "next";
import axios from "axios";
import ReactHowler from "react-howler";
import { Sky } from "@components";
import { HourlyMusic } from "@interfaces";
import { getSongCode } from "@utils";
import { useState } from "react";
import { useWeather } from "@hooks/useWeather";
import { useSpring, animated, config } from "@react-spring/web";
import { useClock } from "@hooks/useClock";
import BackgroundMusic from "components/BackgroundMusic.components";

interface IProps {
  songList: HourlyMusic;
}

const Home = ({ songList }: IProps) => {
  const [toggle, setToggle] = useState(false);
  const number = useSpring({
    test: toggle ? 100 : 0,
    config: config.molasses,
  });
  const time = useClock();

  return (
    <div>
      <Sky />
      <BackgroundMusic songList={songList} time={time} />
      <h1>{time.toLocaleTimeString()}</h1>
      <animated.h2>{number.test.to((n) => n.toFixed(0))}</animated.h2>
      <button onClick={() => setToggle((s) => !s)}>TOGGLE</button>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  // Fetch song list from ACNH API
  const { data: songList } = await axios.get<HourlyMusic>(
    "https://acnhapi.com/v1/backgroundmusic"
  );

  return {
    props: {
      songList,
    },
  };
};
