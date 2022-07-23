import { useAxios } from "@hooks/useAxios";
import React, { useRef, useState } from "react";
import ReactHowler from "react-howler";

type Weather = "Rainy" | "Snowy" | "Sunny";

interface IMusic {
  id: number;
  file_name: string;
  hour: number;
  weather: Weather;
  music_uri: string;
}

interface IBackgroundMusic {
  [key: `BGM_24Hour_${number}_${Weather}`]: IMusic;
}

const Music = () => {
  const [playing, setPlaying] = useState(false);
  const { loading, data, httpStatus } = useAxios<IBackgroundMusic>(
    "GET",
    "https://acnhapi.com/v1/backgroundmusic"
  );

  if (data) {
    // const { music_uri } = data["BGM_24Hour_00_Snowy"];
    const music_uri = "https://acnhapi.com/v1/hourly/2";
    return (
      <React.Fragment>
        <h1>{music_uri}</h1>
        <ReactHowler
          src={music_uri}
          playing={playing}
          preload
          volume={1}
          mute={false}
        />
        <button onClick={() => setPlaying((p) => !p)}>
          {playing ? "STOP" : "PLAY"}
        </button>
      </React.Fragment>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default Music;
