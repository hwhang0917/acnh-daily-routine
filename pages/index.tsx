import type { GetServerSideProps } from "next";
import axios from "axios";
import { MusicBox, Sky } from "@components";
import { HourlyMusic } from "@interfaces";
import { getSongCode } from "@utils";

interface IProps {
  songList: HourlyMusic;
}

const Home = ({ songList }: IProps) => {
  return (
    <div>
      <Sky />
      <MusicBox />
      <h1>
        {songList[getSongCode({ hour: 23, weather: "Rainy" })]["file-name"]}
      </h1>
      <h1>Hello World</h1>
    </div>
  );
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
