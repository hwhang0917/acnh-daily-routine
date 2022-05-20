export interface IRawMusic {
  id: number;
  "file-name": string;
  hour: number;
  weather: "Rainy" | "Sunny" | "Snowy";
  music_uri: string;
}
export interface IMusic {
  id: number;
  fileName: string;
  hour: number;
  weather: "Rainy" | "Sunny" | "Snowy";
  musicUri: string;
}
