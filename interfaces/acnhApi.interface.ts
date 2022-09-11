export type ACNHWeatherType = "Rainy" | "Snowy" | "Sunny";

/**
 * Background Music for ACNH
 */
export interface IBackgroundMusic {
  id: number;
  ["file-name"]: string;
  hour: number;
  weather: ACNHWeatherType;
  ["music_uri"]: string;
}

/**
 * Response type from 'acnhapi.com/v1/backgroundMusic'
 */
export interface IBackgroundMusicResponse {
  [key: string]: IBackgroundMusic;
}
