import { useMemo } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { useGeolocation } from "./useGeolocation";

const DEFAULT_COORDS = {
  longitude: 37.566,
  latitude: 126.977,
};

interface ISunriseSunset {
  sunriseAt: Date;
  sunsetAt: Date;
}

const useSunriseSunset = () => {
  const { coords, error } = useGeolocation();

  const times = useMemo<ISunriseSunset>(() => {
    if (error || !coords)
      return {
        sunriseAt: getSunrise(
          DEFAULT_COORDS.latitude,
          DEFAULT_COORDS.longitude
        ),
        sunsetAt: getSunset(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude),
      };
    return {
      sunriseAt: getSunrise(coords.latitude, coords.longitude),
      sunsetAt: getSunset(coords.latitude, coords.longitude),
    };
  }, [coords]);

  return times;
};

export default useSunriseSunset;
