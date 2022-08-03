import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import axios from "axios";
import { DEFAULT_COORDS } from "@constants";

interface HourMinute {
  hh: number;
  mm: number;
}
export interface IWeatherResponse {
  /**
   * Open Weather API Condition ID
   */
  weatherCode: number;
  sunrise?: HourMinute;
  sunset?: HourMinute;
  /**
   * mm of rain per hour
   */
  rain?: number;
  city: string;
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
  const weatherCode = data.weather[0].id ?? 800;
  const sunriseDayjs = dayjs.unix(data.sys.sunrise);
  const sunsetDayjs = dayjs.unix(data.sys.sunset);
  const rain = data.rain ? data.rain["1h"] : undefined;

  res.status(200).json({
    weatherCode,
    sunrise: {
      hh: sunriseDayjs.hour(),
      mm: sunriseDayjs.minute(),
    },
    sunset: {
      hh: sunsetDayjs.hour(),
      mm: sunsetDayjs.minute(),
    },
    rain,
    city: data?.name,
  });
}
