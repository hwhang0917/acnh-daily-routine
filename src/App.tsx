import useSunriseSunset from "../src/hooks/useSunriseSunset";

function App() {
  const { sunriseAt, sunsetAt } = useSunriseSunset();
  return (
    <div>
      <h1>SUNRISE: {sunriseAt.toLocaleTimeString()}</h1>
      <h1>SUNSET: {sunsetAt.toLocaleTimeString()}</h1>
    </div>
  );
}

export default App;
