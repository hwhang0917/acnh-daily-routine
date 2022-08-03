import { useState } from "react";
import { useInterval } from "usehooks-ts";

export enum Interval {
  EVERY_SECOND = 1_000,
  EVERY_TEN_MINUTES = 600_000,
  EVERY_HOUR = 3_600_000,
}

export const useClock = (interval: Interval = Interval.EVERY_SECOND) => {
  const [time, setTime] = useState(new Date());
  useInterval(() => {
    setTime(new Date());
  }, interval);
  return time;
};
