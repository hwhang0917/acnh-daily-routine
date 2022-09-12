import Image from "next/image";
import { useDeferredValue, useEffect, useState } from "react";
import { IParsedBGM } from "../interfaces/acnhApi.interface";

interface IProps {
  songList: IParsedBGM[];
  currentSong?: IParsedBGM;
  toggleSong: (songTitle: string) => void;
}

export const Playlist = ({ songList, currentSong, toggleSong }: IProps) => {
  const [expandlist, setExpandlist] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);
  const [filteredSongList, setFilteredSongList] =
    useState<IParsedBGM[]>(songList);

  useEffect(() => {
    const newFilteredList = songList.filter((song) =>
      song.title.toLowerCase().includes(deferredQuery.toLowerCase())
    );
    setFilteredSongList(newFilteredList);
  }, [deferredQuery, songList]);

  return (
    <section className="lg:h-fit border border-slate-400 p-5 rounded">
      <h2 className="text-xl py-3 flex items-center gap-2">
        <i className="fa-solid fa-list" />
        <span>Song Playlist</span>
      </h2>
      <div className="relative mb-2">
        <label
          htmlFor="song-filter"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Filter by song title
        </label>
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <i className="fa-solid fa-search w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="song-filter"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Song Title Filter"
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
          required
        />
      </div>

      <ul
        className={`${
          expandlist ? "max-h-fit" : "max-h-96 overflow-y-scroll"
        } divide-y dark:divide-slate-800 divide-stone-300 dark:text-neutral-300 text-neutral-700 text-sm flex flex-col`}
      >
        {filteredSongList.map((song, idx) => (
          <li
            key={idx}
            className={`flex justify-between items-center py-2 cursor-pointer dark:hover:text-purple-300 hover:text-purple-500 ${
              song.title === currentSong?.title ? "text-blue-500" : ""
            }`}
            onClick={() => {
              toggleSong(song.title);
            }}
          >
            <div className="flex items-center gap-5">
              <Image
                src={song.cover ?? ""}
                width={50}
                height={50}
                alt={"Album cover for " + song.title}
              />
              <span>{song.title}</span>
            </div>
            {song.title === currentSong?.title && (
              <div className="text-xs flex gap-2">
                <i className="fa-solid fa-play" />
                <span>Now Playing</span>
              </div>
            )}
          </li>
        ))}
      </ul>
      {filteredSongList.length > 10 && (
        <div className="flex justify-center flex-col items-center text-slate-500">
          <i
            className={`fa-solid fa-angle-${
              expandlist ? "up" : "down"
            } cursor-pointer`}
            onClick={() => {
              setExpandlist((s) => !s);
            }}
          />
        </div>
      )}
    </section>
  );
};
