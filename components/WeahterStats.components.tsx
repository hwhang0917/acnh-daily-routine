import { useCallback, useEffect, useState } from "react";
import { EVERY_FIFTHTEEN_MINUTES } from "@constants";
import { useGeolocation, useWeather } from "@hooks";
import { Spinner } from "@components";
import { IOpenWeatherResponse } from "../interfaces/openWeather.interface";

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
 * Weather Detail Dropdown
 */
const WeatherDetail = ({
  detail,
  refetch,
}: {
  detail?: IOpenWeatherResponse;
  refetch: () => void;
}) => {
  return (
    <div className="absolute dark:bg-slate-800 bg-stone-200 shadow-xl w-48 right-0 rounded">
      <ul className="divide-y divide-neutral-500 text-xs">
        <li className="flex p-2 justify-between">
          <span>City</span>
          <span>{detail?.name}</span>
        </li>
        <li className="flex p-2 justify-between">
          <span>Status</span>
          <span>{detail?.weather[0].main}</span>
        </li>
        <li className="flex p-2 justify-between">
          <span>Temperature</span>
          <span>{detail?.main.temp} &#8451;</span>
        </li>
        <li className="flex p-2 justify-between">
          <span>Feels Like</span>
          <span>{detail?.main.feels_like} &#8451;</span>
        </li>
        <li className="flex p-2 justify-between">
          <span>Humidity</span>
          <span>{detail?.main.humidity} %</span>
        </li>
        <li
          className="flex p-2 justify-between cursor-pointer"
          onClick={refetch}
        >
          <span>Refetch</span>
          <span>
            <i className="fa-solid fa-rotate-right" />
          </span>
        </li>
      </ul>
    </div>
  );
};

/**
 * Weather Stats
 */
export const WeatherStats = () => {
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const { loading, weatherCode, isNight, fetchCurrentWeather, weather } =
    useWeather();

  useEffect(() => {
    // Fetch weather every 15 minutes
    const weatherInterval = setInterval(
      fetchCurrentWeather,
      EVERY_FIFTHTEEN_MINUTES
    );
    return () => clearInterval(weatherInterval);
  }, []);

  const toggleDetail = useCallback(() => setDetailOpen((state) => !state), []);

  // 로딩 아이콘
  if (loading) return <Spinner />;
  return (
    <span className="relative">
      <i
        className={`cursor-pointer hover:text-violet-300 fa-solid ${getFAWeatherIcon(
          weatherCode,
          isNight
        )}`}
        onClick={toggleDetail}
      />
      {detailOpen && (
        <WeatherDetail detail={weather} refetch={fetchCurrentWeather} />
      )}
    </span>
  );
};
