import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

/**
 * Convert hour number to hour string
 * @example 0 --> "00"
 */
export const computeHourString = (hour: number): string => {
  if (hour < 0 || hour > 23) throw Error("Invalid hour");
  return dayjs({ hour }).format("HH");
};

type TimePlaceString = "Morning" | "Day" | "Evening" | "Night";

/**
 * Covnert hour number to timepalce ("Morning", "Day", "Evening", "Night")
 */
export const computeHourTimeplace = (hour: number): TimePlaceString => {
  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return "Night";
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return "Morning";
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      return "Day";
    case 17:
    case 18:
    case 19:
    case 20:
      return "Evening";
    case 21:
    case 22:
    case 23:
      return "Night";
    default:
      throw new Error("Invalid Hour");
  }
};
