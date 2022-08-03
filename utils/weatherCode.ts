import { SongWeather } from "@interfaces";

/**
 * Convert open weather condition code to ACNH song weather code
 * @param weatherCode Open Weather API conditions {@link https://openweathermap.org/weather-conditions}
 */
export const openWeatherCodeToACNHCode = (weatherCode: number): SongWeather => {
  let currentWeather: SongWeather = "Sunny";
  if (weatherCode < 400 || (400 < weatherCode && weatherCode < 600))
    currentWeather = "Rainy";
  if (600 <= weatherCode && weatherCode < 700) currentWeather = "Snowy";
  return currentWeather;
};
