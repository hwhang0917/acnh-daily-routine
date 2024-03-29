import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { IOpenWeatherResponse } from "../interfaces/openWeather.interface";

/**
 * Use OpenWeather API realted custom hooks
 */
export const useWeather = () => {
  // Loading state
  const [loading, setLoading] = useState<boolean>(true);
  // Weather result
  const [weather, setWeather] = useState<IOpenWeatherResponse>();
  // Night boolean
  const [isNight, setIsNight] = useState<boolean>(false);

  /**
   * Fetch current weather
   */
  const fetchCurrentWeather = useCallback(async () => {
    // Start loading
    setLoading(true);

    // Get Geolocation
    const {
      coords: { longitude, latitude },
    } = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    // Get current weather
    const currentWeather = await new Promise<IOpenWeatherResponse>(
      (resolve, reject) => {
        fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => resolve(data))
          .catch((err) => reject(err))
          // Finish loading
          .finally(() => setLoading(false));
      }
    );
    setWeather(currentWeather);

    // Compute isNight
    if (currentWeather.sys) {
      const now = dayjs();
      const sunrise = dayjs.unix(currentWeather.sys.sunrise);
      const sunset = dayjs.unix(currentWeather.sys.sunset);
      if (sunrise.isBefore(now) && sunset.isAfter(now)) setIsNight(false);
      else setIsNight(true);
    }
  }, []);

  // Fetch weather once
  useEffect(() => {
    fetchCurrentWeather();
  }, []);

  return {
    loading,
    weather,
    fetchCurrentWeather,
    isNight,
  };
};
