import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const useClock = (format = "hh:mm:ss A") => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const tick = useCallback(() => setCurrentTime(new Date()), []);

  useEffect(() => {
    const tickInterval = setInterval(tick, 1000);
    return () => clearInterval(tickInterval);
  }, []);

  return dayjs(currentTime).format(format);
};
