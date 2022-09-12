import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import { IParsedBGM } from "../interfaces/acnhApi.interface";
type cb = () => void;

interface IProps {
  currentSong?: IParsedBGM;
  playing: boolean;
  togglePlay: cb;
}

export const Player = ({ currentSong, playing, togglePlay }: IProps) => {
  const playerRef = useRef<ReactHowler>(null);
  const [mute, setMute] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const toggleLoop = useCallback(() => setLoop((l) => !l), []);
  const toggleMute = useCallback(() => setMute((m) => !m), []);

  return (
    <section className="lg:h-fit border border-slate-400 p-5 rounded">
      <h2 className="text-xl py-3 flex items-center gap-2">
        <i className="fa-solid fa-music" />
        <span>Music Player</span>
      </h2>
      <aside className="flex flex-col gap-5 items-center py-5">
        {currentSong && (
          <ReactHowler
            src={currentSong.url}
            format={["mp3"]}
            playing={playing}
            ref={playerRef}
            loop={loop}
            mute={mute}
          />
        )}

        <div className="relative w-64 h-64">
          <Image
            src={currentSong?.cover ?? "/covers/placeholder-album.jpeg"}
            alt="placeholder album cover"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <span>{currentSong?.title ?? "Unknown"}</span>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div
            className="flex justify-center cursor-pointer dark:hover:text-violet-300 hover:text-violet-500 text-5xl"
            onClick={togglePlay}
          >
            <i className={`fa-solid ${playing ? "fa-pause" : "fa-play"}`} />
          </div>
          <div className="flex justify-between">
            <div
              className="flex justify-center cursor-pointer dark:hover:text-violet-300 hover:text-violet-500"
              onClick={toggleMute}
            >
              <i
                className={`fa-solid ${
                  mute ? "fa-volume-xmark" : "fa-volume-high"
                }`}
              />
            </div>
            <div
              className="flex justify-center cursor-pointer dark:hover:text-violet-300 hover:text-violet-500"
              onClick={toggleLoop}
            >
              <i
                className={`fa-solid fa-repeat ${loop ? "text-blue-500" : ""}`}
              />
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};
