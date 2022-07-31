import { DEFAULT_COORDS } from "@constants";
import { Weather } from "@interfaces";
import axios from "axios";
import { IWeatherResponse } from "pages/api/weather";
import { useCallback, useEffect, useState } from "react";

export const useWeather = () => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<Weather>("Sunny");
  const [error, setError] = useState<any>();

  const fetchWeatherData = useCallback(async () => {
    let lat: number = DEFAULT_COORDS.lat;
    let lon: number = DEFAULT_COORDS.lon;

    try {
      // Get current geolocation
      if (navigator.geolocation) {
        const coords = await new Promise<GeolocationCoordinates>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              ({ coords }) => {
                resolve(coords);
              },
              (err) => {
                reject(err);
              }
            );
          }
        );
        lat = coords.latitude;
        lon = coords.longitude;
      }

      // Get current location's weather string
      const { data } = await axios.get<IWeatherResponse>("/api/weather", {
        params: { lat, lon },
      });

      setWeather(data.currentWeather);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return { loading, error, weather, fetchWeatherData };
};
