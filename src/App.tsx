import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useSunriseSunset from "@hooks/useSunriseSunset";
import React, { useEffect, useState } from "react";

const COLORS = ["cornflowerblue", "indianred", "black"];

function App() {
  const { sunriseAt, sunsetAt } = useSunriseSunset();
  const [color, setColor] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setColor((idx) => {
  //       if (idx >= COLORS.length - 1) return 0;
  //       return idx + 1;
  //     });
  //   }, 60000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <React.Fragment>
      <Background color={COLORS[color]} />
      <button
        onClick={() => {
          setColor((idx) => {
            if (idx >= COLORS.length - 1) return 0;
            return idx + 1;
          });
        }}
      >
        WOW
      </button>
      <div>
        <h1>{color}</h1>
        <h1>SUNRISE: {sunriseAt.toLocaleTimeString()}</h1>
        <h1>SUNSET: {sunsetAt.toLocaleTimeString()}</h1>
      </div>
    </React.Fragment>
  );
}

export default App;

const Background = styled("div")<{ color: string }>(
  ({ color }) => css`
    position: fixed;
    z-index: -1;
    inset: 0;
    height: 100vh;
    width: 100%;
    background-color: ${color};

    transition: background-color ease-in-out 60s;
  `
);
