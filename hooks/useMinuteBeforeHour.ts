import { useState } from "react";
import useTime from "./useTime";

/**
 * 주어진 분마다 다음 시간을 리턴함
 * @param minutes - N분 (0~59)
 * @returns next hours
 */
function useMinuteBeforeHour(minutes: number) {
  /**
   * Validation
   * @description minutes should be between 0~59
   */
  if (minutes < 0 || 60 <= minutes)
    throw new Error("Minutes should be between 0~59");

  const [adjacentHour, setAdjacentHour] = useState<number>(0);
  const date = useTime();

  return adjacentHour;
}

export default useMinuteBeforeHour;
