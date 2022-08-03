interface Time {
  /**
   * hour 0~23
   */
  hh: number;
  /**
   * minutes 0~59
   */
  mm: number;
}

export interface SunriseSunset {
  sunrise?: Time;
  sunset?: Time;
}
