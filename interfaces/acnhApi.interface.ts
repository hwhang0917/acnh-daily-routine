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

/**
 * KK Song for ACNH
 */
export interface IACNHSong {
  id: number;
  ["file-name"]: string;
  name: {
    ["name-USen"]: string;
    ["name-KRko"]: string;
  };
  ["buy-price"]: number;
  ["sell-price"]: number;
  isOrderable: boolean;
  ["music_uri"]: string;
  ["image_uri"]: string;
}

/**
 * Response type from 'acnhapi.com/v1/songs
 */
export interface IACNHSongResponse {
  [key: string]: IACNHSong;
}

export interface IParsedBGM {
  title: string;
  url: string;
  cover?: string;
}
