import React, { useState } from "react";
import styled from "styled-components";
import ReactHowler from "react-howler";
import { faVolumeMute, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeather } from "@hooks/useWeather";
import { getSongCode } from "@utils";
import { HourlyMusic } from "@interfaces";
import { RingLoading } from "@components";

const RAIN_ASSET_PATH = "/assets/mixkit-rain-loop-1250.wav";

interface IProps {
  time: Date;
  songList: HourlyMusic;
}

const BackgroundMusic = ({ time, songList }: IProps) => {
  const { weather, loading, fetchWeatherData } = useWeather();
  const [soundOn, setSoundOn] = useState(false);

  // Wheter `weather` is raining (😜 Getit? )
  const isRaining = weather === "Rainy";

  // Refetch weather data every 15 minutes
  if (time.getMinutes() % 15 && time.getSeconds() === 0) fetchWeatherData();

  // Get songCode for current hour
  const songCode = getSongCode({
    hour: time.getHours(),
    weather,
  });
  const currentSong = songList[songCode];

  if (loading) return <RingLoading />;
  return (
    <div aria-label="background music">
      {/* Rain Sound */}
      <ReactHowler
        src={RAIN_ASSET_PATH}
        playing={soundOn && isRaining}
        volume={0.25}
        format={["wav"]}
        preload
        loop
      />
      {/* Hourly Music */}
      <ReactHowler
        src={currentSong["music_uri"]}
        playing={soundOn}
        format={["mp3"]}
        html5
        loop
      />
      {/* Volume Button */}
      <VolumeButton
        onClick={() => setSoundOn(!soundOn)}
        aria-label="play / mute button"
      >
        <FontAwesomeIcon icon={soundOn ? faVolumeHigh : faVolumeMute} />
      </VolumeButton>
    </div>
  );
};

export default BackgroundMusic;

const VolumeButton = styled.button`
  all: unset;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;
