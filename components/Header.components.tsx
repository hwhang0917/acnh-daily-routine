import dynamic from "next/dynamic";

const DynamicClock = dynamic(
  () => import("./Clock.components").then((mod) => mod.Clock),
  {
    ssr: false,
  }
);

export const Header = () => {
  return (
    <header className="lg:w-1/3 w-full flex justify-center px-2 pt-2">
      <ul className="flex">
        <li>
          <DynamicClock />
        </li>
        <li>
          <i className="fa-solid fa-sun" />
        </li>
        <li>
          <i className="fa-solid fa-wifi" />
        </li>
      </ul>
    </header>
  );
};
