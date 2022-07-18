import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";

interface ISkyColor {
  color: `#${string}`;
  in: `${number}s` | `${number}ms`;
  out: `${number}s` | `${number}ms`;
}

/** 하늘 색상 모음 */
const SKY_COLORS: Record<string, ISkyColor> = {
  DAWN: {
    color: "#",
    in: "300s",
    out: "300s",
  },
  SUNRISE: {
    color: "#",
    in: "300s",
    out: "300s",
  },
  MORNING: {
    color: "#",
    in: "300s",
    out: "300s",
  },
  NOON: {
    color: "#",
    in: "300s",
    out: "300s",
  },
  EVENING: {
    color: "#",
    in: "300s",
    out: "300s",
  },
  SUNSET: {
    color: "#",
    in: "300s",
    out: "300s",
  },
  NIGHT: {
    color: "#",
    in: "300s",
    out: "300s",
  },
};

const Sky = () => {
  const [b, setB] = useState(10);
  const [t, setT] = useState(83);
  return (
    <>
      <label htmlFor="top">top</label>
      <input
        type="range"
        id="top"
        defaultValue={t}
        onChange={(e) => setT(+e.target.value)}
      />
      <label htmlFor="bottom">bottom</label>
      <input
        type="range"
        id="bottom"
        defaultValue={b}
        onChange={(e) => setB(+e.target.value)}
      />
      <Background top={t} bottom={b} />
    </>
  );
};

export default Sky;

const Background = styled("div")<{ bottom: number; top: number }>(
  ({ bottom, top }) => css`
    position: fixed;
    z-index: -1;
    inset: 0;
    height: 100vh;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 1) ${bottom}%,
      rgba(253, 187, 45, 1) ${top}%
    );
    transition: background-color ease-in-out 60s;
  `
);
