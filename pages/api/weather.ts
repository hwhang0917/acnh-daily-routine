import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { DEFAULT_COORDS } from "@constants";
import { Weather } from "@interfaces";

/**
 * ACNH Background Music에 맞는 현재 지역 날씨
 * @returns "Sunny" | "Rainy" | "Snowy"
 */
export interface IWeatherResponse {
  currentWeather: Weather;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWeatherResponse>
) {
  const lat = req.query["lat"] ?? DEFAULT_COORDS.lat;
  const lon = req.query["lon"] ?? DEFAULT_COORDS.lon;
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
      },
    }
  );

  /**
   * Open Weather Conditions
   * {@link https://openweathermap.org/weather-conditions}
   */
  const weatherCode = data.weather[0].id;

  let currentWeather: Weather = "Sunny";
  if (weatherCode < 400 || (400 < weatherCode && weatherCode < 600))
    currentWeather = "Rainy";
  if (600 <= weatherCode && weatherCode < 700) currentWeather = "Snowy";

  res.status(200).json({
    currentWeather,
  });
}
