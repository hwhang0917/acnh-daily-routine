import type { GetServerSideProps, NextPage } from "next";
import { Player, Playlist, Todo } from "@components";
import {
  IACNHSongResponse,
  IBackgroundMusicResponse,
  IParsedBGM,
} from "@interfaces";
import { ACNH_API } from "@constants";
import { computeHourString, computeHourTimeplace } from "@utils";
import { useCallback, useState } from "react";

interface IProps {
  songList: IParsedBGM[];
  hourlyBgmList: IBackgroundMusicResponse;
}

const Home: NextPage<IProps> = ({ songList, hourlyBgmList }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<IParsedBGM>();
  const lastSongIndex = songList.length;

  const togglePlay = useCallback(() => {
    setPlaying((s) => !s);
  }, []);
  const toggleSong = useCallback(
    (inputTitle: string) => {
      const currentSong = songList.find(({ title }) => title === inputTitle);
      setCurrentSong(currentSong);
      setPlaying(true);
    },
    [songList]
  );

  return (
    <main className="h-fit lg:grid lg:grid-cols-4 flex flex-col flex-1 gap-6 px-5 pb-60">
      <Player
        currentSong={currentSong}
        playing={playing}
        togglePlay={togglePlay}
      />
      <Todo />
      <Playlist
        songList={songList}
        currentSong={currentSong}
        toggleSong={toggleSong}
      />
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  let songList: IParsedBGM[] = [];
  // Fetch ACNH API Song
  const songResult = await new Promise<IACNHSongResponse>((resolve, reject) => {
    fetch(ACNH_API + "songs")
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
  const parsedSong: IParsedBGM[] = Object.values(songResult).map(
    ({ name, music_uri, image_uri }) => ({
      title: name["name-USen"],
      url: music_uri,
      cover: image_uri,
    })
  );

  // Fetch ACNH API Background Music
  const bgmResult = await new Promise<IBackgroundMusicResponse>(
    (resolve, reject) => {
      fetch(ACNH_API + "backgroundMusic")
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    }
  );
  const parsedBgm: IParsedBGM[] = Object.values(bgmResult).map(
    ({ hour, weather, music_uri }) => {
      const title = `BGM 24 Hours - ${computeHourString(hour)} [${weather}]`;
      const cover = `/covers/${weather}-${computeHourTimeplace(hour)}.jpg`;
      return { title, url: music_uri, cover };
    }
  );

  songList = [...parsedSong, ...parsedBgm];

  return { props: { hourlyBgmList: bgmResult, songList } };
};
