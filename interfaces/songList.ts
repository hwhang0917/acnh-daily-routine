/**
 * 날씨 종류
 */
export type SongWeather = "Rainy" | "Snowy" | "Sunny";
export type HourMusicCode = `BGM_24Hour_${string}_${SongWeather}`;

/**
 * 시간별 음악
 * @description GET /v1/backgroundmusic 리턴값
 */
export interface HourlyMusic {
  /**
   * 음악 고유 ID
   * @example "BGM_24Hour_00_Rainy"
   */
  [key: HourMusicCode]: {
    /**
     * 고유 ID
     */
    id: number;
    /**
     * 파일명
     */
    "file-name": string;
    /**
     * 시간
     * @min 0
     * @max 23
     */
    hour: number;
    /**
     * 날씨
     */
    weather: SongWeather;
    /**
     * 음악 URI
     */
    music_uri: string;
  };
}
