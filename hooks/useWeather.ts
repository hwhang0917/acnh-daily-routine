import axios from "axios";
import { DEFAULT_COORDS } from "@constants";
import { IWeatherResponse } from "pages/api/weather";
import { useCallback, useEffect, useState } from "react";
import { SunriseSunset } from "@interfaces";

export const useWeather = () => {
  const [loading, setLoading] = useState(true);
  const [weatherCode, setWeatherCode] = useState<number>(800);
  const [rain, setRain] = useState<number>(0);
  const [suntime, setSuntime] = useState<SunriseSunset>({
    sunrise: {
      hh: 8,
      mm: 0,
    },
    sunset: {
      hh: 8,
      mm: 8,
    },
  });
  const [error, setError] = useState<any>();

  const fetchWeatherData = useCallback(async () => {
    let lat: number = DEFAULT_COORDS.lat;
    let lon: number = DEFAULT_COORDS.lon;

    try {
      // Get current geolocation
      if (typeof window !== undefined && navigator.geolocation) {
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

      setWeatherCode(data.weatherCode);
      setRain(data.rain ?? 0);
      setSuntime({
        sunrise: data.sunrise,
        sunset: data.sunrise,
      });
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return { loading, error, weatherCode, suntime, rain, fetchWeatherData };
};
