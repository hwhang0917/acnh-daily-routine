import dynamic from "next/dynamic";
import { WeatherStats } from "@components";
const DynamicClock = dynamic(
  () => import("./Clock.components").then((mod) => mod.Clock),
  {
    ssr: false,
  }
);

export const Header = () => {
  return (
    <header className="w-full text-xl p-3 backdrop-blur-sm bg-black bg-opacity-50 mb-5 sticky top-0 z-50">
      <ul className="flex">
        <li className="w-1/2 text-start">
          <DynamicClock />
        </li>
        <li className="w-1/2 flex justify-end items-center gap-5 select-none">
          <WeatherStats />
          <i className="fa-solid fa-wifi" />
        </li>
      </ul>
    </header>
  );
};
