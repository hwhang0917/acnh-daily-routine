import { Interval, useClock } from "@hooks/useClock";

export const Clock = () => {
  const time = useClock(Interval.EVERY_SECOND);
  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  );
};
