import { useEffect } from "react";
import { EVERY_FIFTHTEEN_MINUTES } from "@constants";
import { useWeather } from "@hooks";
import { Spinner } from "@components";

/**
 * Converts Open Weather Weathercode to Fontawesome weather icon classname
 * @param weatherCode OpenWeather API weather code (refer: https://openweathermap.org/weather-conditions)
 * @param isNight weather or not current time is night
 * @returns FontAwesome weather icon class name (refer: https://fontawesome.com/search?q=weather&o=r&m=free)
 */
const getFAWeatherIcon = (weatherCode: number, isNight: boolean): string => {
  // Thunderstorm
  if (200 <= weatherCode && weatherCode <= 232) {
    return "fa-cloud-bolt";
  }
  // Drizzle
  else if (300 <= weatherCode && weatherCode <= 321) {
    return isNight ? "fa-cloud-moon-rain" : "fa-cloud-rain";
  }
  // Rain
  else if (500 <= weatherCode && weatherCode <= 531) {
    return isNight ? "fa-cloud-moon-rain" : "fa-cloud-showers-heavy";
  }
  // Snow
  else if (600 <= weatherCode && weatherCode <= 622) {
    return "fa-snowflake";
  }
  // Clear
  else if (weatherCode === 800) {
    return isNight ? "fa-moon" : "fa-sun";
  }
  // Clouds
  else if (801 <= weatherCode && weatherCode <= 804) {
    return isNight ? "fa-cloud-moon" : "fa-cloud";
  }
  // Others
  else {
    // Mist, Smoke, Haze, Dust, Fog, Sand, Dust
    if (
      weatherCode === 701 ||
      weatherCode === 711 ||
      weatherCode === 721 ||
      weatherCode === 731 ||
      weatherCode === 741 ||
      weatherCode === 751 ||
      weatherCode === 761
    )
      return "fa-smog";
    // Ash
    else if (weatherCode === 762) return "fa-fire-flame-curved";
    // Squall
    else if (weatherCode === 771) return "fa-wind";
    // Tornado
    else if (weatherCode === 781) return "fa-tornado";
    else return "fa-question";
  }
};

/**
 * FontAwesome weather icon
 */
export const WeatherIcon = () => {
  const { loading, weatherCode, isNight, fetchCurrentWeather } = useWeather();

  useEffect(() => {
    // Fetch weather every 15 minutes
    const weatherInterval = setInterval(
      fetchCurrentWeather,
      EVERY_FIFTHTEEN_MINUTES
    );
    return () => clearInterval(weatherInterval);
  }, []);

  // 로딩 아이콘
  if (loading) return <Spinner />;
  return <i className={`fa-solid ${getFAWeatherIcon(weatherCode, isNight)}`} />;
};
