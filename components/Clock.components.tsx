import { useClock } from "@hooks";

export const Clock = () => {
  const currentTime = useClock();
  return <span>{currentTime}</span>;
};
