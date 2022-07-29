import { useMemo } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { useGeolocation } from "./useGeolocation";
import { DEFAULT_COORDS } from "@constants";

interface ISunriseSunset {
  sunriseAt: Date;
  sunsetAt: Date;
}

const useSunriseSunset = () => {
  const { coords, error } = useGeolocation();

  const times = useMemo<ISunriseSunset>(() => {
    if (error || !coords)
      return {
        sunriseAt: getSunrise(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon),
        sunsetAt: getSunset(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon),
      };
    return {
      sunriseAt: getSunrise(coords.latitude, coords.longitude),
      sunsetAt: getSunset(coords.latitude, coords.longitude),
    };
  }, [coords, error]);

  return times;
};

export default useSunriseSunset;
