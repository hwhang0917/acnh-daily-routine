import useSunriseSunset from "@hooks/useSunriseSunset";
import React, { useState } from "react";
import Music from "./components/Music.component";
import Sky from "./components/Sky.component";

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
      <Sky />
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
      <Music />
    </React.Fragment>
  );
}

export default App;
