import { HourMusicCode, Weather } from "@interfaces";

/**
 * 시간별 음악 코드
 */
interface SongCodeInput {
  /**
   * 시간
   */
  hour: number;
  /**
   * 날씨
   */
  weather: Weather;
}

/**
 * 시간과 날씨로 음악 코드 생성
 * @param input 시간별 음악 코드 입력
 */
export const getSongCode = (input: SongCodeInput): HourMusicCode => {
  // 시간 검증
  if (23 < input.hour || input.hour < 0)
    throw new Error("Invalid hour (range: 0~23)");
  // 시간 스트링 생성
  const hourString = input.hour < 10 ? `0${input.hour}` : `${input.hour}`;
  return `BGM_24Hour_${hourString}_${input.weather}`;
};
