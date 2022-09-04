import axios from "axios";
import type { GetServerSideProps } from "next";
import { BackgroundMusic, Clock, Phone } from "@components";
import { HourlyMusic } from "@interfaces";
import { useClock, useWeather } from "@hooks";
import { openWeatherCodeToACNHCode } from "@utils";
import styled from "styled-components";

interface IProps {
  songList: HourlyMusic;
}

const Home = ({ songList }: IProps) => {
  const { weatherCode, loading, fetchWeatherData } = useWeather();
  const time = useClock();

  return (
    <Wrapper>
      <Phone>
        <BackgroundMusic
          songList={songList}
          time={time}
          weather={openWeatherCodeToACNHCode(weatherCode)}
          loading={loading}
          refrech={fetchWeatherData}
        />
        <Clock time={time} />
      </Phone>
    </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
