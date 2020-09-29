import { getMinutesRoundedDown5 } from "./timeUtils";

export const parseJSONDate = (str: string) => new Date(JSON.parse(str));

/** Pads a single digit number with a leading zero to make it two digits.
 * @example
 * 1 -> 01
*/
const padNumber = (num: number) => num.toString().padStart(2, "0");

export const displayStartDate = (startDate: string) => {
  const date = parseJSONDate(startDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const displayHours = hours % 12 ? hours % 12 : 12; // if hour is 0, display 12 instead
  return displayHours + ":" + padNumber(minutes);
};

/** Convert startDate to a string that can be passed as a value to an input element. */
export const startDateToInputValue = (startDate: string) =>
  padNumber(parseJSONDate(startDate).getHours()) +
  ":" +
  padNumber(parseJSONDate(startDate).getMinutes());

export const generateStartDate = () => {
  const now = new Date();
  const startDate = now.setMinutes(getMinutesRoundedDown5(now), 0);
  return JSON.stringify(new Date(startDate));
};

export const createStartDate = (hours: number, minutes: number) => {
  const now = new Date();
  const startDate = now.setHours(hours, minutes, 0);
  return JSON.stringify(new Date(startDate));
};

export const compareDates = (a: string, b: string) =>
  parseJSONDate(a).getTime() - parseJSONDate(b).getTime();

export const startDateIsToday = (startDate: string) => {
  const date = parseJSONDate(startDate)
  return isToday(date)
}

const isToday = (someDate: Date) => {
  const today = new Date()
  return sameDay(today, someDate)
}

export const startDateIsSameDay = (startDate: string, targetDate: Date) => {
  const date = parseJSONDate(startDate)
  return sameDay(date, targetDate)
}

export const sameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}