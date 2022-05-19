import dayjs from "dayjs";
import { useEffect, useState } from "react";

function useTime() {
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setDate(dayjs(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  return date;
}

export default useTime;
