import dynamic from "next/dynamic";
import { WeatherIcon } from "@components";
const DynamicClock = dynamic(
  () => import("./Clock.components").then((mod) => mod.Clock),
  {
    ssr: false,
  }
);

export const Header = () => {
  return (
    <header className="w-full">
      <ul className="flex px-2 py-1">
        <li className="w-1/2 text-start">
          <DynamicClock />
        </li>
        <li className="w-1/2 flex justify-end content-center gap-2">
          <WeatherIcon />
          <i className="fa-solid fa-wifi" />
        </li>
      </ul>
    </header>
  );
};
