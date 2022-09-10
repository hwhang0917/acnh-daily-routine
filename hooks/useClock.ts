import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

/**
 * Use clock custom hook
 * @param format dayjs format string (refer: https://day.js.org/docs/en/display/format)
 */
export const useClock = (format = "HH:mm:ss") => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const tick = useCallback(() => setCurrentTime(new Date()), []);

  useEffect(() => {
    const tickInterval = setInterval(tick, 1000);
    return () => clearInterval(tickInterval);
  }, []);

  return dayjs(currentTime).format(format);
};
