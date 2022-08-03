interface IProps {
  /**
   * Open Weather Conditions
   * {@link https://openweathermap.org/weather-conditions}
   */
  weatherCode: number;
}

export const Sky = ({ weatherCode }: IProps) => {
  return <h1>{weatherCode}</h1>;
};
