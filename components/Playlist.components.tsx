import { IBackgroundMusicResponse } from "../interfaces/acnhApi.interface";

interface IProps {
  bgmList: IBackgroundMusicResponse;
}

export const Playlist = ({ bgmList }: IProps) => {
  return (
    <section className="lg:h-fit border border-slate-400 p-5 rounded">
      <h2 className="text-xl py-3">Playlist</h2>
      <ul className="h-96 overflow-y-scroll divide-y dark:divide-slate-800 divide-stone-300 dark:text-neutral-300 text-neutral-700 text-sm">
        {Object.values(bgmList).map((bgm, idx) => (
          <li
            key={idx}
            className={`py-2 cursor-pointer dark:hover:text-purple-300 hover:text-purple-500`}
          >
            <span>{bgm["file-name"]}.mp3</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
